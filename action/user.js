/** 
 * 【会员Controller】
*/
module.exports = {
	async getUserByKey(ctx) {
		const { userId } = ctx.query;
		// 412: 参数校验错误；500: 系统内部错误
		if (!userId) ctx.throw(412, '缺少参数userId');
		const params = {
			// userId: ctx.framework.jsToJava('long', ctx.framework.paramsTrim(userId)),
			userId: ctx.framework.paramsTrim(userId),
			gid: ctx.framework.getGid(),
		};
		const { res } = await ctx.dubbo.service.userProvider.getUserByKey(params);
		ctx.body = res ? res : ctx.throw(500, 'dubbo响应异常');
	},
	async getReportData(ctx) {
		ctx.framework.log.info(ctx.query);
		ctx.body = {
			status: 200,
			message: '数据上报成功',
		}
	}
}