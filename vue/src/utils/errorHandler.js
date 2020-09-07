import Vue from 'vue';
import axios from "axios";

//格式化参数
const formatParams = function(data = {}) {
    const arr = [];
    for (const name in data) {
        arr.push(
            encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
        );
    }
    return arr.join("&");
};

class ErrorHandler {
    constructor(params) {
        this.key = params.key; // 客户端接入key
        this.token = ''; // token令牌
        this.login();
        this.reportUrl = 'http://127.0.0.1:7001/api/sendReportData'; //上报Error地址
        this.delayTime = 3000; //延时上报Error时间
        this.options = {
            msg: "", // 错误的具体信息,
            pageUrl: window.location.href, //上报页面地址
            category: "", // 类别
            stack: "", // 错误堆栈信息
            data: {}, //更多错误信息
        };
        this.reqDataList = []; //待发送的数据
        this.init();
        this.asyncReport();
    }

    // jwt授权登录
    async login() {
        const loginResult = await axios.get(`http://127.0.0.1:7001/api/login?key=${this.key}`);
        this.token = loginResult.data.token;
    }

    init() {
        //Vue 异常监控
        Vue.config.errorHandler = (error, vm, info) => {
            const componentName = this.formatComponentName(vm);
            const propsData = vm.$options && vm.$options.propsData;
            this.options.msg = error.message;
            this.options.stack = this.processStackMsg(error);
            this.options.category = "Vue";
            this.options.data = JSON.stringify({
                componentName,
                propsData,
                info
            });
            // 合并上报的数据，包括默认上报的数据和自定义上报的数据
            const reportData = Object.assign({}, this.options);
            this.saveReport(reportData);
        };
        /**
         * 监控资源加载错误(img,script,css,以及jsonp)
         * 其中包括行列号，Error对象中存在错误的堆栈信息等。
         */
        window.addEventListener("error", e => {
            const target = e.target ? e.target : e.srcElement;
            this.options.msg = e.target.localName + " is load error";
            this.options.stack = "resource is not found";
            this.options.category = "Resource";
            this.options.data = JSON.stringify({
                tagName: e.target.localName,
                html: target.outerHTML,
                type: e.type,
                fileName: e.target.currentSrc
            });
            if (e.target !== window) {
                // 抛去js语法错误
                // 合并上报的数据，包括默认上报的数据和自定义上报的数据
                const reportData = Object.assign({}, this.options);
                this.saveReport(reportData);
            }
        }, true);
        /**
         * 监控 JS 错误，加载第三方JS出现
         * 其中包括行列号，Error对象中存在错误的堆栈信息等。
         */
        window.onerror = (msg, url, line, col, error) => {
            if (msg === "Script error." && !url) return false;
            // 采用异步的方式,避免阻塞
            setTimeout(() => {
                // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
                const newCol = col || (window.event && window.event.errorCharacter) || 0;
                if (error && error.stack) {
                    // msg信息较少,如果浏览器有追溯栈信息,使用追溯栈信息
                    this.options.msg = msg;
                    this.options.stack = error.stack;
                } else {
                    this.options.msg = msg;
                    this.options.stack = "";
                }
                this.options.category = "JavaScript";
                this.options.data = JSON.stringify({
                    pageUrl: this.ajaxUrl,
                    fileName: url,
                    line: line,
                    col: newCol
                });
                // 合并上报的数据，包括默认上报的数据和自定义上报的数据
                const reportData = Object.assign({}, this.options);
                // 把错误信息发送给后台
                this.saveReport(reportData);
            }, 0);
            // 错误不会console浏览器上,如需要，可将这样注释
            return true;
        };

        // Axios 异常监控
        axios.interceptors.response.use(null, error => {
            this.options.msg = error.message;
            this.options.stack = this.processStackMsg(error);
            this.options.category = "Axios";
            this.options.data = JSON.stringify({});
            // 合并上报的数据，包括默认上报的数据和自定义上报的数据
            const reportData = Object.assign({}, this.options);
            this.saveReport(reportData);
            return Promise.reject(error);
        });
    }

    //异步上报数据
    async asyncReport() {
        if (this.reqDataList.length > 0) {
            while (this.reqDataList.length > 0) {
                const img = new Image();
                const reqData = this.reqDataList.shift();
                const srcUrl = `${this.reportUrl}?token=${this.token}&${formatParams(reqData)}`;
                // console.log('---60---', srcUrl);
                // 延时处理
                setTimeout(() => {
                    img.src = srcUrl;
                });
            }
        }
        this.executeDelayFunction();
    }

    //保存异常错误信息
    saveReport(data) {
        const reqData = Object.assign({}, data, {
            reportTime: Date.now(),
            pageUrl: window.location.href,
        });
        this.reqDataList.push(reqData);
    }

    // 延时执行
    executeDelayFunction() {
        setTimeout(() => {
            this.asyncReport();
        }, this.delayTime);
    }

    formatComponentName(vm) {
        if (vm.$root === vm) {
            return "root";
        }
        const name = vm._isVue ?
            (vm.$options && vm.$options.name) ||
            (vm.$options && vm.$options._componentTag) :
            vm.name;
        return (
            (name ? "component <" + name + ">" : "anonymous component") +
            (vm._isVue && vm.$options && vm.$options.__file ?
                " at " + (vm.$options && vm.$options.__file) :
                "")
        );
    }

    processStackMsg(error) {
        let stack = error.stack
            .replace(/\n/gi, "") // 去掉换行，节省传输内容大小
            .replace(/\bat\b/gi, "@") // chrome中是at，ff中是@
            .split("@") // 以@分割信息
            .slice(0, 9) // 最大堆栈长度（Error.stackTraceLimit = 10），所以只取前10条
            .map(v => v.replace(/^\s*|\s*$/g, "")) // 去除多余空格
            .join("~") // 手动添加分隔符，便于后期展示
            .replace(/\?[^:]+/gi, ""); // 去除js文件链接的多余参数(?x=1之类)
        const msg = error.toString();
        if (stack.indexOf(msg) < 0) {
            stack = msg + "@" + stack;
        }
        return stack;
    }

}

export default {
    install(Vue, options) {
        new ErrorHandler(options);
    }
};