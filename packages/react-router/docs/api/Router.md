# &lt;Router>

The common low-level interface for all router components. Typically apps will use one of the high-level routers instead:

Router是所有路由组件共用的底层接口，通常，我们的应用程序将使用其中一个高级路由器代替：

- [`<BrowserRouter>`](../../../react-router-dom/docs/api/BrowserRouter.md)
- [`<HashRouter>`](../../../react-router-dom/docs/api/HashRouter.md)
- [`<MemoryRouter>`](./MemoryRouter.md)
- [`<NativeRouter>`](../../../react-router-native/docs/api/NativeRouter.md)
- [`<StaticRouter>`](./StaticRouter.md)

The most common use-case for using the low-level `<Router>` is to
synchronize a custom history with a state management lib like Redux or Mobx. Note that this is not required to use state management libs alongside React Router, it's only for deep integration.

最常见的使用底层的`<Router>`的情形就是用来与Redux或者Mobx之类的状态管理库的定制的 history 保持同步。注意不是说使用状态管理库就必须使用React Router，它仅用作于深度集成。

```jsx
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

## history: object

A [`history`](https://github.com/ReactTraining/history) object to use for navigation.

用来导航的[`history`](https://github.com/ReactTraining/history)对象.

```jsx
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```

## children: node

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.

需要渲染的[单一组件](https://facebook.github.io/react/docs/react-api.html#react.children.only)。

```jsx
<Router>
  <App/>
</Router>
```
