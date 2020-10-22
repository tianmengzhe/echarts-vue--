
// 使用websocket
// 1 导入WebSocket模块
const WebSocket = require('ws')
// 2 创建websocket 服务对象 绑定端口8889
const wss = new WebSocket.Server({port:8889})

const path = require('path')
const {getFileJson} = require('../utils/file_utils')


// 服务端开起监听
module.exports.wss = ()=>{
    // 3 事件监听 连接事件
    wss.on('connection', client=>{
  
        // 监听客户端发送的数据
        client.on('message',async msg=>{
            const playload = JSON.parse(msg)
            let {action, socketType, chartName, value} = playload

            // 获取数据
            if(action === 'getData'){
                let filePath = path.join(__dirname, '../data', chartName+'.json')
                let ret = await getFileJson(filePath)
                playload.data = JSON.parse(ret)
                // 发送给客户端
                client.send(JSON.stringify(playload))
                
            }else{
                // 原封不动将客户端接收的数据转发给每一个处于连接状态的客户端
                // wss.clients // 所有客户端的连接
                wss.clients.forEach(clientItm=>{
                    clientItm.send(msg)
                })
            }
        })
    })
}
