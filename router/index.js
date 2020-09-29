const router = require('koa-router')(); //引入路由函数

const wechat = require('../action/wechat'); //微信
const user = require('../action/user'); //会员

//业务接口相关
router.get('/api/getUserByKey', user.getUserByKey);

//微信相关
router.get('/wxapi/test', wechat.test);
router.get('/wxapi/getOauthUrl', wechat.getOauthUrl);
router.get('/wxapi/getWechatMemberInfo', wechat.getWechatMemberInfo);
router.get('/wxapi/getWechatSignature', wechat.getWechatSignature);

module.exports = router;