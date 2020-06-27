const { Dubbo, setting } = require('dubbo2.js/es6');
const { service_info_gas } = require("./config.js");
const { app_name, dubbo_config } = require('../config/local');
const service = require('./service');
const { log } = require('../utils/framework');

//初始化dubbo配置
module.exports = async function dubboInit(ctx) {
    const dubboSetting = setting
    .match(service_info_gas.list, { version: service_info_gas.version });
    const dubbo = new Dubbo({
        application: { name: app_name },
        register: dubbo_config.register,
        dubboInvokeTimeout: dubbo_config.invoke_timeout,
        service,
        dubboSetting
    });
    await dubbo.ready();
    dubbo.subscribe({
        onTrace: msg => {
            log.info(JSON.stringify(msg));
        },
    });
    dubbo.use(async function costTime(ctx, next) {
        const startTime = Date.now();
        await next();
        const endTime = Date.now();
        const body = ctx.body;
        const methodName = `${ctx.dubboInterface}#${ctx.methodName}`;
		let params = ctx.methodArgs[0];
        let result = null;
        //dubbo接口调用异常
        if (!body.res && body.err) {
            log.error('dubbo接口调用报错', body.err);
        } else {
            result = JSON.stringify( Object.assign(body.res) );
        }
        if (body.res.status.name === 'FAIL') {
            log.error(`【pid】: ${process.pid} 【请求服务】: ${methodName} 【请求入参】: ${JSON.stringify(params)} 【请求出参】: ${result} 【dubbo耗时】: ${endTime - startTime}ms`);
        } else {
            log.info(`【pid】: ${process.pid} 【gid】: ${ctx.methodArgs[0].$.gid} 【请求服务】: ${methodName} 【请求入参】: ${JSON.stringify(params)} 【请求出参】: ${result} 【dubbo耗时】: ${endTime - startTime}ms`);
        }
    });
    return dubbo;
}