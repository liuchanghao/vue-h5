/** 
 * 【会员Controller】
*/
module.exports = {
	async getUserByKey(ctx) {
		const { userId } = ctx.query;
		if (!userId) return ctx.body = { errCode: 224, errMsg: '缺少参数userId' };
		const params = {
			userId: ctx.framework.paramsTrim(userId),
			gid: ctx.framework.getGid(),
		};
		const { res } = await ctx.dubbo.service.userProvider.getUserByKey(params);
		ctx.body = res ? res : { errCode: 500, errMsg: 'dubbo数据请求异常' };
	},

	async getReportData(ctx) {
		ctx.framework.log.info(ctx.query);
		ctx.body = {
			status: 200,
			message: '数据上报成功',
		}
	}
}