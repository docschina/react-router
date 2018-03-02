# &lt;NavLink>

一个特殊版本的 [`Link`](https://github.com/docschina/react-router.cn/blob/cn/packages/react-router-dom/docs/api/Link.md)，当它与当前 URL 匹配时，为其渲染元素添加样式属性。

```jsx
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```

## activeClassName: string

要给出的元素的类处于活动状态时。默认的给定类是 `active`。它将与 `className` 属性一起使用。

```jsx
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

## activeStyle: object

当元素处于 `active` 时应用于元素的样式。

```jsx
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```

## exact: bool

如果为 `true`，则仅在位置完全匹配时才应用 `active` 的类/样式。

```jsx
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```

## strict: bool

当情况为 `true`，要考虑位置是否匹配当前的URL时，`pathname` 尾部的斜线要考虑在内。有关更多信息，请参见      [`<Route strict>`](https://github.com/docschina/react-router.cn/blob/cn/packages/react-router/docs/api/Route.md#strict-bool) 文档。

```jsx
<NavLink
  strict
  to="/events/"
>Events</NavLink>
```

## isActive: func

一个为了确定链接是否处于活动状态而添加额外逻辑的函数，如果你想做的不仅仅是验证链接的路径名与当前 URL 的 `pathname` 是否匹配，那么应该使用它

```jsx
// only consider an event active if its event id is an odd number
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```

## location: object

[`isActive`](https://github.com/docschina/react-router.cn/blob/cn/packages/react-router-dom/docs/api/NavLink.md#isactive-func) 比较当前的历史 location（通常是当前的浏览器 URL ）。为了与不同的位置进行比较，可以传递一个 [`location`](https://github.com/docschina/react-router.cn/blob/cn/packages/react-router/docs/api/location.md)。