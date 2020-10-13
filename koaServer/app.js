const Koa = require('koa')
// 创建实例
const app = new Koa()

// app.use((ctx, next)=>{
//     ctx.response.body = {msg:'连接成功'}
// })

const duration = require('./middleware/koa_response_duration')

// 使用中间件
app.use(duration)

// 监听端口
app.listen(3000,()=>console.log('服务器启动成功 http://localhost:3000'))