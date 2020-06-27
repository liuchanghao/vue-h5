import WechatJSSDK from 'wechat-jssdk/dist/client.umd';
import request from '@/utils/request';
import { wechat_debug } from '../../../config/local';

//加载微信jssdk配置
const wechatConfig = async (params = {}) => {
	return new Promise((resolve, reject) => {
		request.get(`/wxapi/getWechatSignature?url=${encodeURIComponent(location.href)}`, {
            credentials: "same-origin",
        }).then(async(data) => {
            const config = {
                appId: data.appId,
                nonceStr: data.nonceStr,
                signature: data.signature,
                timestamp: data.timestamp,
                debug: wechat_debug,
                jsApiList: ['updateAppMessageShareData']
            };
            const wechatObj = new WechatJSSDK(config);
            wechatObj.initialize().then(w => {
                console.log('wechat jssdk init successfully...');
                //set up your share info, "w" is the same instance as "wechatObj"
                resolve(w);
            }).catch(err => {
                console.error(err);
                reject();
            });
		}, (err) => {
			console.log('err---', err);
			reject();
		})
	})
}

//微信自定义分享
const wechatCustomShare = async (options = {}) => {
    return new Promise((resolve, reject) => {
        const rootUrl = window.location.href.split("//")[0] + "//" + window.location.host;
		//默认自定义分享
		const param = {
			title: options.title,
			desc: options.desc,
			link: options.link || rootUrl,
			imgUrl: options.imgUrl
        };
        //分享给好友
		wx.updateAppMessageShareData({
			title: param.title, // 分享标题
			desc: param.desc, // 分享描述
			link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: param.imgUrl, // 分享图标
			success: function () {
				resolve('envelope');
				console.log('分享成功');
			},
			cancel: function() {
				console.log('取消分享');
			}
		});
    })
}

export default {
    install(Vue) {
        Vue.prototype.$wechatConfig = wechatConfig;
        Vue.prototype.$wechatCustomShare = wechatCustomShare;
    },
    wechatConfig
}