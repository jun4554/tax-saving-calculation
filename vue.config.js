const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './',
  pages: {
    index: {
      entry: "src/main.js",
      title: "簡易所得税計算",
    }
  }
})
