
// 使用websocket
// 1 导入WebSocket模块
const WebSocket = require('ws')
// 2 创建websocket 服务对象 绑定端口8889
const wss = new WebSocket.Server({port:8889})

let clientObj = {}

// 服务端开起监听
module.exports.wss = ()=>{
    // 3 事件监听 连接事件
    wss.on('connection', client=>{
  
        // 监听客户端发送的数据
        client.on('message', msg=>{
            console.log('msg',msg)

            // 由服务端发送数据到服务端
            client.send(JSON.stringify({name:'fff',age:18}))
        })
    })
}
