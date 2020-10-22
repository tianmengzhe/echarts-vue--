const Koa = require('koa')
// 创建实例
const app = new Koa()
// app.use((ctx, next)=>{
//     ctx.response.body = {msg:'连接成功'}
// })

const duration = require('./middleware/koa_response_duration')
const header = require('./middleware/koa_response_header')
const mdata = require('./middleware/koa_response_data')
app.use(duration)
app.use(header)
app.use(mdata) // 业务处理


// 监听端口
app.listen(3000,()=>console.log('服务器启动成功 http://localhost:3000'))





// // 使用websocket
// // 1 导入WebSocket模块
// const WebSocket = require('ws')
// // 2 创建websocket 服务对象 绑定端口8889
// const wss = new WebSocket.Server({port:8889})
// // 3 事件监听 连接事件
// wss.on('connection', client=>{

//     // 监听客户端发送的数据
//     client.on('message', msg=>{
//         console.log('msg',msg)

//         // 由服务端发送数据到服务端
//         client.send(JSON.stringify({name:'fff',age:18}))
//     })
// })
const wssServer = require('./webSocket_server')
wssServer.wss() // 开启监听客户端的连接

// 接收客户端数据字段约定
/**
 * {
 *  action:'getData',  // 代表某项行为  
 *  socketType:"trendData", // 代表业务模块类型 代表前端响应函数的标识
 *  chartName:'trend', // 图表名称 主题切换 可不传此值
 *  value:'' // 代表具体的数据 
 * }
 * 
 * action：取值范围
 *      getData 获取图表数据 
 *      fullScreen 全屏事件 
 *      themeChange 主题切换
 * socketType：取值范围
 *      trendData sellerData mapData rankData hotData stockData fullScreen themeChange
 * chartName：取值范围
 *      trend seller map rank hot stock
 * value：
 *      如果是全屏事件 true/false 全屏/不全屏
 *      主题切换事件 chalk/vintage
 */


// 发送数据到客户端数约定
/**
 * 
 * 接收到action为getData时  获取图表数据 
 *  取出 chartName字段 读取对应json文件内容 返回data
 * {
 *  action:'getData', 
 *  socketType:"trendData", 
 *  chartName:'trend', 
 *  value:'',
 *  data: 数据
 * }
 * 
 * 接收值action不为getData时  全屏事件/主题切换
 *  原封不动将客户端接收的数据转发给每一个处于连接状态的客户端
 * 
 */