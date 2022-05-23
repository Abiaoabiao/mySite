// vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
      },
      "/static/": {
        target: "http://localhost:7001",
      },
    },
  },
  configureWebpack: require("./webpack.config"),
  publicPath: '/',
}