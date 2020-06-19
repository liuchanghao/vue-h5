/** 
 * 【商户Controller】
*/
module.exports = {
    async getMerchantInfoByAppid(ctx) {
		const { appid } = ctx.query;
		if (!appid) return ctx.body = { errCode: 224, errMsg: '参数appId必须填写' };
		const params = {
			sourceKey: ctx.framework.paramsTrim(appid),
			sourceType: ctx.framework.jsToJava('enums', 'WeChat', ctx.order.enums['GAS_MERCHANT_SOURCETYPE']),
			gid: ctx.framework.getGid(),
		};
		const { res } = await ctx.dubbo.service.partnerProvider.findUnique(params);
		ctx.body = res ? res : { errCode: 500, errMsg: 'dubbo数据请求异常' };
	}
}