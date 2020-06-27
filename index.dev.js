const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaWebpack = require('koa-webpack');
const history = require('koa2-history-api-fallback');
const webpackConfig = require('./vue/webpack.config.js');
const dubboInit = require('./dubbo/init');//初始化dubbo服务
const framework = require('./utils/framework');
const { port } = require('./config/local');
const apiUrl = require("./router/index");
const order = require('./dubbo/order');

// const { systemLogger } = require('./utils/logger');
// const requestMiddleware = require('./middleware/request');//请求入参中间件

//实例化koa
const app = new Koa();
const router = new Router();

registerApp();

async function registerApp() {
    try {
        app.use(bodyParser());
        // app.use(requestMiddleware);//注入请求参数中间件
        app.use(apiUrl.routes());
        // koa-router 以中间件的形式注册给 koa
		// 加载路由中间件
		app.use(router.routes());
        app.use(router.allowedMethods());
        app.context.dubbo = await dubboInit();//初始化dubbo服务
        app.context.framework = framework;//挂载framework工具对象
        app.context.order = order;//挂载order对象
        // 前端(vue)路由
        // 所有 navigate 请求重定向到 '/'，因为 webpack-dev-server 只服务这个路由
        app.use(history({
            htmlAcceptHeaders: ['text/html'],
            index: '/',
            verbose: true
        }));
        app.on('error', err => {
            framework.log.error('系统内部错误~', err);
            // systemLogger.error(err);
		});
        await registerWebpack();
        app.listen(port);
        framework.log.info('开发环境服务器启动于端口号', port, '等待 webpack 编译中，请稍候。\n\n');
    } catch(e) {
        framework.log.error('注册应用失败', e);
    }
}

async function registerWebpack() {
    return new Promise(resolve => {
        koaWebpack({
            config: webpackConfig,
			devMiddleware: {
				stats: 'minimal'
			}
        }).then(middleware => {
            app.use(middleware);
			resolve();
        })
    })
}