# Code Splitting
  
Web 的一大特点是我们不必让访问者在使用它之前下载整个应用程序。你可以将代码拆分看做增量下载应用程序。我们将使用 [webpack]，[`babel-plugin-syntax-dynamic-import`]，[`react-loadable`] 来完成这个操作。

[webpack] 内置了 [dynamic imports][import]；然而，如果你正使用 [Babel] (例如：将 JSX 编译成 JavaScript) 那么你将需要使用 [`babel-plugin-syntax-dynamic-import`] 插件。它仅仅是一个语法插件，也就是说 Babel 不会做任何额外的转换。它仅仅允许 Babel 从语法上分析动态导入，所以 webpack 可以将它们拆分打包。你的 `.babelrc` 应该为：

```json
{
  "presets": [
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import"
  ]
}
```
 
[`react-loadable`] 对于有动态导入的组件来说是一个高阶组件。它可以自动处理各种边缘情况，并且使代码拆分变得简单！下面是一个如何使用 [`react-loadable`] 的例子：

```jsx
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```
 
以上就是对于它的全部介绍！当仅仅使用 `LoadableDashboard` （或任何你指定的组件）时，它会在使用应用程序的时候自动被加载和渲染。 `loader` 的选项是一个实际加载组件的函数，而 `loading` 是在实际组件加载时显示的占位符组件。

## Code Splitting and Server-Side Rendering

[`react-loadable`] 包括[服务器端渲染指南][ssr]。你所需要做的就是在你的 `.babelrc` 中加入 [`babel-plugin-import-inspector`] 并且你的服务器端可以正常工作。下面是一个 `.babelrc` 文件的例子：

```json
{
  "presets": [
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    ["import-inspector", {
      "serverSideRequirePath": true
    }]
  ]
}
```

  [Babel]: https://babeljs.io/
  [`babel-plugin-syntax-dynamic-import`]: https://babeljs.io/docs/plugins/syntax-dynamic-import/
  [`babel-plugin-import-inspector`]: https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#babel-plugin-import-inspector
  [`react-loadable`]: https://github.com/thejameskyle/react-loadable
  [import]: https://github.com/tc39/proposal-dynamic-import
  [webpack]: https://webpack.js.org/
  [ssr]: https://github.com/thejameskyle/react-loadable/tree/6902cc87f618446c54daa85d8fecec6836c9461a#server-side-rendering
