# 安装

React Router 在多种环境中运行：浏览器， 服务器， 本地，甚至是VR（开发预览环境！）虽然许多组件是共享的（比如 `Route` ），但其他组件则是特定于环境的（比如 `NativeRouter` ）。您不需要安装两个软件包，只需要为目标环境安装软件包。环境之间的任何共享组件都会从环境特定的包中重新导出。

## Web

```bash
npm install react-router-dom
# 或者
yarn add react-router-dom
```

所有 package modules 都可以在头部引入：

```js
import {
  BrowserRouter as Router,
  StaticRouter, // 用于服务器渲染
  Route,
  Link
  // 等等
} from "react-router-dom";
```

如果你想获得一个非常轻量的打包文件用于网络,你可以直接引入模块。理论上像 Webpack 这样的 “tree shaking” 打包工具使这个行为变得不那么必要，但我们还没测试过。我们很欢迎你去测试！

```js
import Router from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
// 等等
```

## Native

我们仍在为 React Router 的本地功能编写更完善的文档。目前我们推荐你[查看源码](https://github.com/ReactTraining/react-router/tree/v4/packages/react-router-native)。

```bash
yarn add react-router-native
# 或者如果不使用 react-native cli
npm install react-router-native
```

所有的 package modules 都可以在头部引入：

```js
import {
  NativeRouter as Router,
  DeepLinking,
  BackButton,
  Link,
  Route
  // 等等
} from "react-router-native";
```

## Who-knows-where

```bash
yarn add react-router
# 或者如果不使用 react-native cli
npm install react-router
```

所有 package modules 都可以在头部引入：

```js
import {
  MemoryRouter as Router,
  Route
  // 等等
} from "react-router";
```

当您在任何位置运行 React 的时候，都可以使用React Router的 navigation，navigation 的状态保存在内存路由器中。您可以查看 NativeRouter 的实现以了解如何进行整合的方法。
