/**
 * 业务处理中间件
 * 
 * 读取json文件
 *      请求路径处理
 *      读取内容
 * 设置响应体 
 *  ctx.response.body
 * */ 
const path = require('path')
const {getFileJson} = require('../utils/file_utils') 
module.exports = async (ctx, next)=>{
    try{
        // 获取请求路径
        const url = ctx.request.url // api/seller

        // 请求数据相关路径处理 http://127.0.0.1:3000/api/seller
        // 获取数据处理 
        // 预算开销 /api/budget
        // 热销商品 /api/hotproduct 
        // 商家分布 /api/map 
        // 销量排行 /api/rank 
        // 商家开销 /api/seller 
        // 库存信息 /api/stock 
        // 销量趋势 /api/trend
        let failPath = url.replace('/api', '') // seller
        const fileArr = ['/budget','/hotproduct', '/map', '/rank', '/seller', '/stock', '/trend']
        if(fileArr.indexOf(failPath) != -1){
            failPath = path.join(__dirname, '../data', failPath+'.json')
            console.log(failPath)
            let data = await getFileJson(failPath)
            ctx.response.body = data
            return 
        }

        // 其它路径处理
        
        await next()
    }catch(e){
        ctx.response.body = {errmsg:e}
    }
}