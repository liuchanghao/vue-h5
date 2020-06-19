module.exports = async (ctx, next) => {
    ctx.framework.log.info('请求入参中间件...', ctx.query);
    return await next();
}