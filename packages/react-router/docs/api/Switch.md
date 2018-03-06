# &lt;Switch>
渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。

**这与仅使用一堆 `<Route>` 有什么区别？**

`<Switch>` 的独特之处在于它专门呈现路由。相比之下，与位置匹配的每个 `<Route>` 都已包含方式呈现。请考虑以下代码

```jsx
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

如果 URL 是 `/about` ， 那么 `<About>` ， `<User>` ， `<NoMatch>`将全部渲染，因为他们都与路径匹配。这是通过设计实现的，允许我们以多种方式将 `<Route>` 组合到应用程序中，类似侧边栏（sidebars）和面包屑导航（breadcrumbs）， bootstrap 标签等等，但是有时候我们只想选择一条 `<Route>` 进行渲染，如果我们在 `/about` ，我们又不想匹配 `/:user` （或者显示404）。以下是如何使用 `Switch` 执行此操作:

```jsx
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

现在，如果我们在 `/about` ，`<Switch>` 将开始查找匹配的  `<Route>` ，`<Route path="/about”/><Switch>` 将停止查找匹配项并渲染 `<About>` ，同样，如果是 `/Michael` ，则 `< User >` 将渲染。

这对于动画过渡效果也很有用，因为匹配的 `<Route>` 被渲染到与前一个位置相同的位置。

```jsx
<Fade>
  <Switch>
    {/* there will only ever be one child here */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* there will always be two children here,
      one might render null though, making transitions
      a bit more cumbersome to work out */}
</Fade>
```

## location: object

用于匹配子元素而不是当前历史位置（通常是当前浏览器 URL ）的 [`location`](./location.md)。

## children: node

`<Switch>` 的所有子级都应该是 `<Route>` 或 `<Redirect>` 元素。将渲染当前位置匹配的第一个子级。

`<Route>` 元素使用其 `path` 属性进行匹配， `<Redirect>` 元素使用其 `from` 属性进行匹配，不带 `path` 属性的 `<Route>` 或不带 `from` 属性的 `<Redirect>` 将始终与当前路径匹配。

当 `<Redirect>` 包含 `<Switch>` 时，它可以使用 `<Route>` 的任何位置匹配属性：`path`， `exact` 和 `strict`， `from` 只是路径属性的别名。

如果为 `<Switch>` 提供了 `location` 属性，它将覆盖匹配子元素上的 `location` 属性。

```jsx
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```

