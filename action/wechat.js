const sha1 = require('sha1');
const { Wechat } = require('wechat-jssdk');
const { wechat_config } = require('../config/local');

//实例化wechat-jssdk
const wx = new Wechat(wechat_config);

module.exports = {
    //微信服务器token验证
    async test(ctx) {
        const { signature, echostr, timestamp, nonce } = ctx.query;
        let reqArray = [nonce, timestamp, 'liuchanghao'];
        reqArray.sort(); //对数组进行字典排序
        let sortStr = reqArray.join(''); //连接数组
        let sha1Str = sha1(sortStr.toString().replace(/,/g,""));
        if (signature === sha1Str) {
            ctx.body = echostr;
        } else {
            ctx.body = 'false';
        }
    },
    //获取微信网页授权地址
    async getOauthUrl(ctx) {
        ctx.body = {
            status: {
                name: 'SUCCESS',
            },
            info: {
                url: wx.oauth.snsUserInfoUrl
            }
        };
    },
    //根据code换取微信用户信息
    async getWechatMemberInfo(ctx) {
        const userProfile = await wx.oauth.getUserInfo(ctx.query.code);
        ctx.framework.log.info('---微信用户信息---', userProfile);
        ctx.body = {
            status: {
                name: 'SUCCESS',
            },
            info: userProfile
        };
    },
    //获取微信公众号jssdk签名
    async getWechatSignature(ctx) {
        const result = await wx.jssdk.getSignature(ctx.query.url);
        ctx.body = {
            status: {
                name: 'SUCCESS'
            },
            info: result
        }
    }
}