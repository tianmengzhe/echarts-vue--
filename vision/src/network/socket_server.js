export default class SocketServer {
    /**
     *  单例模式
     */
    static instance = null
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketServer()
        }
        console.log(this.instance)
        return this.instance
    }

    // socket对象
    ws = null

    // 存储回调函数
    callBackMapping = {}

    // 连接服务器方法
    connect() {
        // 连接服务器
        // 判断是否支持websocket
        if (!window.WebSocket) {
            return console.log('你的浏览器不支持 WebSocket')
        }

        this.ws = new WebSocket('ws://localhost:8889')
        this.ws.onopen = () => { console.log('WebSocket 连接成功') }
        this.ws.onclose = () => { console.log('WebSocket 断开连接') }
        this.ws.onmessage = msg => {
            // msg.data 服务端发送的数据
            const res = JSON.parse(msg.data)
            let { socketType, action, data } = res
            if (this.callBackMapping[socketType]) {

                // 获取数据
                if (action === 'getData') {
                    this.callBackMapping[socketType].call(this,data)
                }

                // 全屏 fullScreen
                if (action === 'fullScreen') {
                    
                }

                // 切换主题 themeChange
                if (action === 'themeChange') {
                   
                }
            }
        }
    }

    // 添加回调函数
    addCallback(socketType, callback) {
        this.callBackMapping[socketType] = callback
    }
    // 移除回调
    unCallBack(socketType) {
        this.callBackMapping[socketType] = null
    }

    // 发送数据
    send(data){
        this.ws.send(JSON.stringify(data))
    }
}












