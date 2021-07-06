const webpack = require("webpack");

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8081', // 端口号
        https: false, // https: {type:Bollean}
        open: true, // 配置自动启动浏览器
        // 配置代理
        proxy: {
            '/api': {
                target: 'http://localhost:3003', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    // '^/api': '/api'
                }
            }
        }
    },
}