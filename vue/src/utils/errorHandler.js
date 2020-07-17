import Vue from 'vue';

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
    constructor() {
        this.reportUrl = 'http://127.0.0.1:8080/api/getReportData';//上报Error地址
		this.delayTime = 3000;//延时上报Error时间
        this.reqDataList = [];//待发送的数据
        this.init();
        // this.asyncReport();
    }

    init() {
        //Vue 异常监控
		Vue.config.errorHandler = (error, vm, info) => {
            console.log('---vue error handler---', error.message);
            console.log('---27---', error.stack.toString());
            console.log('---28---', vm);
            console.log('---29---', info);
            console.log('---30---', error.line);
            console.log('---31---', error.column);
            const reportData = Object.assign({}, {
                category: 'Vue',
                msg: error.message,
                componentName: this.formatComponentName(vm),
            });
            console.log('---31---', reportData);
            // this.saveReport(reportData);
		};
        /**
		 * 监控资源加载错误(img,script,css,以及jsonp)
		 * 其中包括行列号，Error对象中存在错误的堆栈信息等。
		 */
        window.addEventListener("error", e => {
			console.log(e.target.localName + " is load error");
        });
        /**
		 * 监控 JS 错误，加载第三方JS出现
		 * 其中包括行列号，Error对象中存在错误的堆栈信息等。
		 */
		window.onerror = (msg, url, line, col, error) => {
            console.log('---msg---', msg);
            console.log('---url---', url);
            console.log('---line---', line);
            console.log('---col---', col);
            console.log('---error---', error);
        };
    }

    //异步上报数据
    asyncReport() {
        console.log('----56----', this.reqDataList);
        if (this.reqDataList.length > 0) {
            while (this.reqDataList.length > 0) {
                const img = new Image();
                const reqData = this.reqDataList.shift();
                const srcUrl = `${this.reportUrl}?${formatParams(reqData)}`;
                console.log('---60---', srcUrl);
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
        console.log('---78---', this.reqDataList);
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
		const name = vm._isVue
			? (vm.$options && vm.$options.name) ||
			(vm.$options && vm.$options._componentTag)
			: vm.name;
		return (
			(name ? "component <" + name + ">" : "anonymous component") +
			(vm._isVue && vm.$options && vm.$options.__file
				? " at " + (vm.$options && vm.$options.__file)
				: "")
		);
	}

}

export default {
	install(Vue, options) {
		new ErrorHandler(options);
	}
};