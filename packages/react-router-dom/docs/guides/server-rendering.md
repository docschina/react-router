# Server Rendering

在服务器上渲染有点儿不同，因为他们都是无状态的。基本思想是我们将 app 包装在一个无状态的 `<StaticRouter>` 中而不是 `<BrowserRouter>` 中。我们通过服务器传入请求的 URL，以便路由可以匹配，然后我们将在下面讨论 `<context>` 属性。


```jsx
// 用户端
<BrowserRouter>
  <App/>
</BrowserRouter>

// 服务器端 (不是完整的代码)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
```

当你在客户端上渲染 `<Redirect>` 时，浏览器历史记录会更改状态，我们会看到新的页面。在静态服务器环境中，我们无法更改 app 的状态。相反，我们使用 `context` 属性来找出渲染的结果。如果我们找到 `context.url`，那么我们知道 app 已重定向。这使我们能够通过服务器发送正确的重定向地址。

```jsx
const context = {}
const markup = ReactDOMServer.renderToString(
  <StaticRouter
    location={req.url}
    context={context}
  >
    <App/>
  </StaticRouter>
)

if (context.url) {
  // 某处渲染了一个“<Redirect>”
  redirect(301, context.url)
} else {
  // 完成后, 发送 response
}
```

## app 中添加特定的 context 信息

路由器只添加 `context.url`。但是你可能需要一些重定向是 301 和 302 的。或者，也许你想发送一个 404 响应，如果一些特定的 UI 分支被渲染，或者 401 响应如果他们没有被授权。那么 context 属性是你的，所以你可以改变它。以下是区分 301 和 302 重定向的方法：

```jsx
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)

// somewhere in your app
const App = () => (
  <Switch>
    {/* some other routes */}
    <RedirectWithStatus
      status={301}
      from="/users"
      to="/profiles"
    />
    <RedirectWithStatus
      status={302}
      from="/courses"
      to="/dashboard"
    />
  </Switch>
)

// on the server
const context = {}

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App/>
  </StaticRouter>
)

if (context.url) {
  // 这里你可以使用 `context.status` 
  // 我们添加了RedirectWithStatus
  redirect(context.status, context.url)
}
```

## 404, 401, 或任何其他 status

我们可以做同样的事情，如上所述。 创建一个组件，添加一些 context 并将其渲染在 app 的任何位置以获取不同 status 代码。

```jsx
const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)
```

现在，你可以在 app 中的任何位置渲染 `Status`，以便将代码添加到静态 `staticContext`。

```jsx
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

// somewhere else
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/dashboard" component={Dashboard}/>
  <Route component={NotFound}/>
</Switch>
```

## 整合到一起

这不是一个真正的 app，但它显示了所通常应用的代码，你需要把它放在一起的。

```jsx
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000)
```

这里是客户端：

```jsx
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'))
```

## 数据加载

有许多不同的方法来解决这个问题，但目前还没有明确最佳做法，所以我们试图用任何方法组合，而不是规定或倾向于某一方面。 我们确信路由可以适应你的应用程序的要求。

主要的限制是你想在渲染之前加载数据。 React Router 导出内部使用的 `matchPath` 静态函数，以便将地址匹配到路由。你可以在服务器上使用此功能来帮助确定渲染前你的数据依赖关系。

这种方法的要点是依赖于静态路由配置，该配置用于渲染路由 ，并且在渲染前匹配，以确定数据依赖关系。

```jsx
const routes = [
  { path: '/',
    component: Root,
    loadData: () => getSomeData(),
  },
  // etc.
]
```

然后使用此配置在应用程序中渲染出你的路由：

```jsx
import { routes } from './routes'

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route}/>
    ))}
  </Switch>
)
```

然后在服务器上你会有像这样的代码：

```js
import { matchPath } from 'react-router-dom'

// inside a request
const promises = []
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.path, route)
  if (match)
    promises.push(route.loadData(match))
  return match
})

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
})
```

最后，客户需要提取数据。同样，我们并没有为你的 app 规定数据加载模式，但这些是你需要实现的点。

你可能会对我们的 [React Router Config][RRC] 软件包感兴趣，以协助用静态路由配置来加载数据和服务器渲染。


[StaticRouter]: ../api/StaticRouter.md
[BrowserRouter]: ../api/BrowserRouter.md
[Redirect]: ../api/Redirect.md
[RRC]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
