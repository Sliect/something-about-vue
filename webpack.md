() => import(variable)

路由懒加载如果传一个变量,webpack就会把 (整个电脑的包都打包进来[不闹]),并抛出警告
> WARNING: Critical dependency: the request of a dependency is an expression

import('./pages/'+ComponentName)不会有警告

结论: webpack import 尽可能静态化表达包所处的路径，最小化变量控制的区域

[原文链接](https://segmentfault.com/a/1190000015648036)