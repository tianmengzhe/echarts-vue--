# echarts-vue--电商平台数据可视化实时监控系统-示例

使用 kao + echarts + vue

## 目标
- 计算服务器处理请求的总耗时
- 在响应头加上响应内容的mime类型  mime返回的数据类型
- 根据URL读取指定目录下的文件内容
- 允许跨域

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
        - 
    + 细节处理
        - 主题切换