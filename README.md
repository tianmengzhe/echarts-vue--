# echarts-vue--电商平台数据可视化实时监控系统-示例

使用 kao + echarts + vue

## 目标
- 计算服务器处理请求的总耗时
- 在响应头加上响应内容的mime类型  mime返回的数据类型
- 根据URL读取指定目录下的文件内容
- 允许跨域
- 多屏联动

目录设计

koaServer  服务端
    app.js 入口文件
    data 数据文件夹
    middleware 中间件文件夹
        koa_response_data.js  读取文件内容 返回数据处理
        koa_response_duration.js 计算服务器处理请求的总耗时
        koa_response_header.js 设置响应头
    utils/
        file_utils.js 读取文件封装

- 项目地图
    + 前端项目准备
        - vue-cli搭建项目
        - 静态资源引入 在public 放入static静态资源
        - 项目基本配置 vue.config.js 配置端口 和自动打开浏览器
        - 全局echarts对象的挂载 在public index.html引入echarts
        - axios封装与挂载

    + 单独图表组件的开发
        - 商家销售统计（横向柱状图）
            + 图表基本实现
            + 动态刷新
            + 拆分option
            + 分辨率适配
                - 初始配置
                - 数据配置
                - 分辨率配置
        - 销量趋势图表（折线图）
        - 商家发布模块（地图+散点图）
        - 销量排行模块（柱状图）
            - 平移动画
        - 热销商品占比模块（饼图）
        - 库存与销量模块（圆环饼图）

    + webSocket的引入
        - 后端
            + 安装 npm i ws
            + 导入创建websocket对象 const wss = new require('ws').Server({port:8899})
            + 监听事件
                - 连接事件 wss.on('connention', client=>{})
                - 客户端发送事件 client.on('message', msg=>{})
            + 发送数据给前端 client.send('xxx')
        - 前端
            + 创建ws对象 const ws = new WebSocket('ws://localhost:8899')
            + 监听事件
                - 连接成功事件 ws.oonopen = function(){}
                - 接收数据事件 ws.onmesssage = function(){}
                - 关闭连接事件 ws.onclose = function(){}
            + 发送数据 wx.send('xxx')
        - 改造项目
            + 后端 
                - 创建webSocket.js
                - 接收/发送数据约定
            + 前端
                - 创建 socket_server.js 
                    + 定义类SocketServer 定义为单例模式
                    + 定义连接服务器方法connect
                        - 创建webSocket对象 连接服务器
                        - 在main.js中调用
                    + 监听事件
                        - onopen
                        - onmessage
                        - onclose
                    + 存储回调函数
                    + 接收数据处理
                    + 定义发送数据的方法
                    + 挂载到Vue原型
                - 组件的改造
                    + created 添加回调
                    + destroyed 移除回调
                    + 获取数据改为发送数据
                - 优化
                    + 刷新页面时 websocket还没有连接成功 页面就在请求数据了 报错
                    + 重发数据机制
                    + 端开连接机制

        
    + 细节处理
        - Home.vue 首页
        - 全屏切换
            + 多屏联动 
                - 发送全屏给服务器 然后转发其它连接的浏览器 控制切换
                - 在home.vue 注册回调
        - 主题切换
            + 使用混入 抽离公共代码 mixin
            + 通过vuex统一管理 主题状态
                - 各个组件监听 theme的变化 qi
                - 部分html样式
                    - home.vue
                    - trend.vue
                    - hot.vue
            + 多屏联动 
                - 发送全屏给服务器 然后转发其它连接的浏览器

