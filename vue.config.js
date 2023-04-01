const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
module.exports = defineConfig({
  transpileDependencies: true,//设置为true 高级语法向下兼容，false 不会
  productionSourceMap: false,//设置为false,减少包大小，压缩处理等，但不利于调试
  devServer: {
    open: true,
    port: 8088,
    host: 'localhost',
    // proxy:{}
  },
  //配置webpack
  configureWebpack: {
    // externals: {//{key:value}  排除三方包
    //   'vue': 'Vue',
    //   "element-ui": 'ELEMENT'
    // },
    plugins: [
      new CompressionWebpackPlugin({ //压缩插件
        algorithm: 'gzip',   //压缩方式 gizp
        test: /\.js$|\.css$/, //匹配文件名 
        threshold: 10240  //压缩阈值 代表大于设置值生成压缩文件
      }),
      new HtmlWebpackExternalsPlugin({ //内网打包
        externals: [
          {
            module: 'vue',
            entry: {
              path: 'dist/vue.min.js',
              type: 'js',
            },
            global: 'Vue',
          },
          {
            module: 'element-ui',
            entry: ['lib/index.js', 'lib/theme-chalk/index.css'],
            supplements: ['lib/theme-chalk/fonts/'],
            global: 'ELEMENT',
          },
          {
            module: 'axios',
            entry: {
              path: 'dist/axios.min.js',
            },
            global: 'axios',
          },
          {
            module: 'echarts',
            entry: {
              path: 'dist/echarts.min.js',
              attributes: {
                async: '',
              },
            },
            global: 'echarts',
          }
        ]
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
        args[0].title = '权限管理流程审批系统'
        return args
      })
    config.when(process.env.NODE_ENV === 'production',
      config => {
        config.optimization.splitChunks({ //代码拆分
          chunks: 'all',  //同步异步同时执行
          minSize: 2000,  //大于2kb需要拆分
          cacheGroups: {
            // 提取三方包
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,  //值越大，优先级越高
              chunks: 'initial'
            },
            // 提取组件包
            commons: {
              name: 'chunk-commons',
              test: path.resolve('src/components'),
              priority: -20,
              reuseExistingChunk: true
            },
            // views: {
            //   name: 'chunk-views',
            //   test: path.resolve('src/views'),
            //   priority: -30,
            //   reuseExistingChunk: true
            // }
          }
        })
      })
  }
  // css:{ //scss样式全局配置
  //   loaderOptions:{
  //     scss:{
  //       additionalData:`@import "~@/styles/index.scss";`
  //     }
  //   }
  // }
})
