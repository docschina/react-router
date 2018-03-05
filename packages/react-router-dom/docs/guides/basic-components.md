# Basic Components

React Router 中有三种类型的组件： router components, route matching components，和 navigation components。

你在 Web 应用程序中使用的所有组件都应该从 react-router-dom 中导入。

```js
import { BrowserRouter, Route, Link } from "react-router-dom";
```

## 路由

每个 React Router 应用程序的核心应该是一个 router 组件。对于 Web 项目，`react-router-dom` 提供了 `<BrowserRouter>` 和 `<HashRouter>` 路由。这两个路由都会为你创建一个专门的 `history` 对象。一般来说，如果你有一个响应请求的服务器，则你应该使用 `<BrowserRouter>` ，如果你使用的是静态文件的服务器，则应该使用 `<HashRouter>` 。

```jsx
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  holder
);
```

## Route 匹配

有两个路由匹配组件： `<Route>` 和 `<Switch>` 。

```js
import { Route, Switch } from "react-router-dom";
```

路由匹配是通过比较 `<Route>` 的 `path` 属性和当前地址的 `pathname` 来实现的。当一个 `<Route>` 匹配成功时，它将渲染其内容，当它不匹配时就会渲染 `null`。没有路径的 `<Route>` 将始终被匹配。

```jsx
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```

你可以在任何你希望根据地址渲染内容的地方添加 `<Route>` 。列出多个可能的 `<Route>` 并排列出来往往很有意义。 `<Switch>` 用于将 `<Route>` 分组。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```

`<Switch>` 不是分组 `<Route>` 所必须的，但他通常很有用。 一个 `<Switch>` 会遍历其所有的子 `<Route>` 元素，并仅渲染与当前地址匹配的第一个元素。这有助于多个路由的路径匹配相同的路径名，当动画在路由之间过渡，且没有路由与当前地址匹配（所以你可以渲染一个 "404" 组件）。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* when none of the above match, <NoMatch> will be rendered */}
  <Route component={NoMatch} />
</Switch>
```

## 路由渲染属性

你有三个属性来给 `<Route>` 渲染组件: `component` ，`render`，和 `children` 。你可以查看 [`<Route>` 文档](../api/Route.md) 来了解它们的更多信息，但在这我们将重点关注`component` 和 `render` 因为这几乎是你总会用到的两个。

`component` 应该在你想渲染现存组件时使用 （ `React.Component` 或一个无状态组件）。`render`，只有在必须将范围内的变量传递给要渲染的组件时才能使用。你不应该使用具有内联函数的 `component` 属性来传递范围内的变量，因为你将要不必要的卸载/重载组件。

```jsx
const Home = () => <div>Home</div>;

const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

## 导航

React Router 提供了一个 `<Link>` 组件来在你的应用程序中创建链接。无论你在何处渲染一个 `<Link>` ，都会在应用程序的 HTML 中渲染锚 （`<a>`）。

```jsx
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```

`<NavLink>` 是一种特殊类型的 `<Link>` 当它的 `to` 属性与当前地址匹配时，可以将其定义为“活跃的”。

```jsx
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```

当你想强制导航时，你可以渲染一个 `<Redirect>`。当一个 `<Redirect>` 渲染时，它将使用它的 `to` 属性进行定向。

```jsx
<Redirect to="/login" />
```
