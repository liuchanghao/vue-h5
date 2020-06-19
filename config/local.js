/**
 * 配置【 开发环境 】
 */
module.exports = {
	//应用名称
	app_name: 'vue-h5',
	//微信调试模式
	wechat_debug: true,
	//环境变量
	env: 'local',
	//服务端口
	port: 8080,
	//dubbo配置
	dubbo_config: {
		register: '192.168.2.236:2181',//zk注册地址
		invoke_timeout: 60,//zk超时时间
	},
	//微信公众号配置
	wechat_config: {
		appId: 'appid',//自行更换
    	appSecret: 'appSecret',//自行更换
    	wechatToken: 'wechatToken',//自行更换
    	wechatRedirectUrl: "wechatRedirectUrl",//自行更换
	}
};
