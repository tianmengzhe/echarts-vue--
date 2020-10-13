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