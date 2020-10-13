/**
 * 设置响应头
 * 
 * 获取mime类型 响应数据类型 
 * application/json
 * */ 
module.exports = async (ctx, next)=>{
    const contentType = 'application/json; charset=UTF-8'
    ctx.set('Content-Type', contentType)

    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', "*")
    ctx.set('Access-Control-Allow-Methods', "OPTIONS, GET, POST, PUT, DELETE")
    
    // OPTIONS 请求直接结束 method 
    ctx.request.method === 'OPTIONS'? ctx.response.body = null : await next()
    // await next()
    
}