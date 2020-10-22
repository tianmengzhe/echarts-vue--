export default class SocketServer {
    /**
     *  单例模式
     */
    static instance = null
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketServer()
        }
        return this.instance
    }

    // socket对象
    ws = null

    // 存储回调函数
    callBackMapping = {}

    // 是否连接成功
    connected = false

    // 没有连接成功状态下的发送 收集
    sendPadding = []

    // 重连次数
    connecteRetryCount = 0

    // 连接服务器方法
    connect(IS_WEBSCOKET) {

        if (!IS_WEBSCOKET) return;

        // 连接服务器
        // 判断是否支持websocket
        if (!window.WebSocket) {
            return console.log('你的浏览器不支持 WebSocket')
        }

        this.ws = new WebSocket('ws://localhost:8889')
        this.ws.onopen = () => {
            console.log('--WebSocket 连接成功--')
            this.connected = true
            this.connecteRetryCount = 0
            // 是否有等待发送
            this.sendPadding.forEach(data => { this.send(data) })
            this.sendPadding = []
        }

        // 连接失败/断开连接
        this.ws.onclose = () => {
            console.log('WebSocket 断开连接')
            this.connected = false
            // 断开重连
            this.connecteRetryCount++
            setTimeout(() => {
                console.log('---重连中--')
                this.connect()
            }, this.connecteRetryCount * 500)
        }
        this.ws.onmessage = msg => {
            // msg.data 服务端发送的数据
            const res = JSON.parse(msg.data)
            let { socketType, action, data } = res
            if (this.callBackMapping[socketType]) {

                // 获取数据
                if (action === 'getData') {
                    this.callBackMapping[socketType].call(this, data)
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
    remove(socketType) {
        this.callBackMapping[socketType] = null
    }
    // 发送数据
    send(data) {
        console.log(this.connected)
        if (this.connected) {
            this.ws.send(JSON.stringify(data))
        } else {
            // 如果没有连接成功 等待发送 //一个发送只添加一次
            this.sendPadding.push(data)
        }
    }
}












