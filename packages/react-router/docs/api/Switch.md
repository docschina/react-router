# &lt;Switch>

呈现第一个子级 <Route>   或  <Redirect> 与位置匹配的.

**呈现第一个子级 <Route>   或  <Redirect> 与位置匹配的?**

`<Switch>` 的独特之处在于它专门呈现路由，相比之下，与位置匹配的每个 `<Route>` 都已包含方式呈现，请考虑以下代码`的独特之处在于它专门呈现路由，相比之下，与位置匹配的每个 `<Route >`都已包含方式呈现,请考虑以下代码

```jsx
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

I如果网址是 `/about`, then `<About>`, `<User>`,并且 `<NoMatch>`会将他们全部渲染，因为他们都与路径匹配
这是通过设计实现的，允许我们以多种方式将 `<Route>`组合到应用程序中,类似`sidebars`和`breadcrumbs`，`bootstrap`标签等等, 但是，有时我们只想选择一条 `<Route >` 进行渲染,如果我们在 `/about`,我们又不想匹配/:`user` (显示404).下面是如何实现它

```jsx
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

现在,如果我们在，`<Switch>`将开始查找匹配的  `<Route>` ,`<Route path="/about”/><Switch>`将停止查找匹配项并渲染 `<About>`,
同样，如果是 `/Michael`, 则` < User >` 将渲染

这对于动画过渡也很有用，因为匹配的 <Route > 将呈现在上一个相同的位置.

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

## 位置：对象

用于匹配子元素而不是当前历史位置( 通常是当前浏览器URL)的位置对象 

## 子节点:

`< Switch >` 的所有子级都应该是 `<Route >` 或 `<Redirect>` 元素.将呈现当前位置匹配的第一个子级

`<Route >` 元素使用期路径进行匹配，`<Redirect>`元素使用其from进行匹配,不带路径的 `<Route >`或
不带from的 `<Redirect>`将始终与当前路径匹配.

在 `<Redirect >` 包含 `<Switch>`时，它可以使用 `<Route >` 的任何位置匹配路径，准确的来说，from只是路径属性的别名
如果为 `<Switch>`提供了位置支持,它将覆盖匹配子元素上的位置

```jsx
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```
