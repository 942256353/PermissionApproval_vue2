## 1、为什么要打包？

减少了http请求数量，让页面加载和显示更快在开发后完成的这个合并的过程就是打包。webpack在打包过程中，会分析各个文件之间的依赖关系，然后生成一个依赖图并用文件的形式保存下来，未来浏览器运行代码的时候就可以读取这个文件，就知道了各个代码块之间的关联以及如何调用了。



## 2、怎么打包

**打包命令**

```
npm run build
```

 **webpack与vue-cli的关系**

vue-cli是基于nodejs+webpack封装的命令行工具。

可以理解为汇集了各种命令的 bash，或者bat。用vue-cli执行build，实际上是webpack做的。原本需要自己配置webpack的相关配置，被cli简化了。

并且按照vue的用户习惯整理了一套构建和目录规范。

**什么是Webpack**

WebPack可以看做是**模块打包机——**一款打包工具，负责项目打包：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。



## 3、如何测试dist包

Serve是一个小型的基于机架的web服务器和用于web应用程序(特别是Rails应用程序)的快速原型框架。Serve是Rails MVC视图部分的轻量级版本。

**安装**

```
npm i serve -g
```

**查看版本**

```
serve -v
```

**启动本地服务**

```
serve dist
```



## 4、排除三方包

打包不需要将三方包打入，需要排除掉，这样打包的文件就小了，比如vue,elementui

```
configureWebpack: {
    externals: {
        'vue': 'Vue',  
        "element-ui": 'ELEMENT' 
    },
}
```

在html中引入cdn地址

```
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.runtime.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.js"></script>
<link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.css" rel="stylesheet">
```



## 5、gzip压缩

**gzip压缩**
HTTP协议上的gzip编码是一种用来改进web应用程序性能的技术，web服务器和客户端（浏览器）必须共同支持gzip。目前主流的浏览器，Chrome,firefox,IE等都支持该协议。
简单来说，gzip是一种压缩技术。

**为何要使用gzip压缩?**
打包的时候开启gzip可以很大程度减少包的大小，页面大小可以变为原来的30%甚至更小，非常适合于上线部署。
更小的体积对于用户体验来说就意味着更快的加载速度以及更好的用户体验

**为什么gzip压缩后页面加载速度提升**
浏览器向服务器发出请求，并且在请求头中声明可以使用gzip的编码格式，服务器接受到请求之后，读取压缩后的文件，服务器直接返回给浏览器gzip格式的文件，浏览器进行解压缩，这样以来就节省了服务器压缩的时间

```
plugins: [
      new CompressionWebpackPlugin({
          algorithm: 'gzip',   
          test: /\.js$|\.css$/,  
          threshold: 10240  
      }),
    ]
```



## 6、代码拆分

需要将大的代码模块拆分成多个小的，便于压缩传输

```
代码拆分
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production',  
    config => {
        config.optimization.splitChunks({ 
            chunks: 'all',  
            minSize: 2000,  
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
                }
            }
        })
    })
  }
```



## 7、CDN不稳定，如何内网打包

用于内网打包使用，比如无法外网访问cdn，免费cdn不稳定等因素

```
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

    plugins: [
        new HtmlWebpackExternalsPlugin({  
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
  }
```



## 8、生成打包分析报告

```
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

plugins: [
        new BundleAnalyzerPlugin(),   // 生成打包分析报告
]
```

重新打包会自动访问

<img src=".\img\6.jpg"  />





