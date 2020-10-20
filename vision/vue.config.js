module.exports = {
    devServer:{
        port: 8888, // 端口配置
        open: true, // 自动打开浏览器
    },
    lintOnSave: false,// 关闭eslint
    configureWebpack:{
        resolve:{
            alias:{
                'common':'@/common',
                'assets':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
                'store':'@/store'
            }
        }
    }
}