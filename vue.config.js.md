## vue-cli3 常用配置属性

```
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  // Default: '/'
  // 部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  publicPath: process.env.NODE_ENV === 'production' ? '/static' : '/',
  // Default: 'dist'
  outputDir: 'dist',
  // Default: ''
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: '',
  // Default: 'index.html'
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html',
  // Default: true
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // Default: undefined
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  },
  // Default: true
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  // eslint-loader 在开发和生产构建下都会被启用
  lintOnSave: true,
  // Default: false
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: false,
  // Default: true
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: true,
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('pages', resolve('src/pages'))
      .set('assets', resolve('src/assets'))

    config
      .plugin('ProvidePlugin')
      .use(require('webpack/lib/ProvidePlugin'), [{
        '$': 'jquery'
      }])
  },
  css: {
    // Default: false
    // 默认情况下在js中引入CSS或其它预处理文件, 该文件应该以 .module.(css|less|sass|scss|styl) 结尾 , 如 import styles from './foo.module.css'
    // 设为true 即可通过 import styles from './foo.css' 引入css模块
    modules: false,
    // Default: 生产环境下是 true，开发环境下是 false
    extract: process.NODE_ENV === 'production',
    // Default: false
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    // Default: {}
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/variables.scss";`
      },
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  // 所有 webpack-dev-server 的选项都支持
  // 有些值像 host、port 和 https 可能会被命令行参数覆写。
  // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
  devServer: {
    proxy: 'http://localhost:80'
  },
  // 第三方插件配置
  pluginOptions: {}
}
```