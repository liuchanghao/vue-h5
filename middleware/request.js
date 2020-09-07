module.exports = async(ctx, next) => {
    ctx.framework.log.info('请求入参中间件...', JSON.stringify(ctx.query));
    return await next();
}