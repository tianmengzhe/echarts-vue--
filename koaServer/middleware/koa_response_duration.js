/**
 * 计算服务器消耗时长
 * 
 * 位于第一层中间件
 * 
 * 开始记录时间 其它中间件执行完成记录时间
 * 
 * 设置响应头 响应时间 X-Response-Time: 5ms
 * */ 

module.exports = async (ctx, next)=>{
    const start = Date.now()
    // 执行中间件
    await next()
    const end = Date.now()
    const duration = end - start

    // 设置响应头 ctx.set
    ctx.set('X-Response-Time', duration+'ms')
}