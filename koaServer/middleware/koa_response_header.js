/**
 * 设置响应头
 * 
 * 获取mime类型 响应数据类型 
 * application/json
 * */ 
module.exports = async (ctx, next)=>{
    const contentType = 'application/json; charset=UTF-8'
    ctx.set('Content-Type', contentType)
    await next()
}