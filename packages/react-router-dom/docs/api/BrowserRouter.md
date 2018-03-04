# &lt;BrowserRouter>

使用 HTML5 历史 API 记录（ `pushState `，`replaceState` 和 `popstate` 事件）的 [`<Router>`](../../../react-router/docs/api/Router.md) 使您的UI与URL保持同步。

```jsx
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

## basename: string

所有地址的基本网址。 如果您的应用程序是从服务器上的子目录提供的，则需要将其设置为子目录。 格式正确的基本名应该有一个前导斜线，但是结尾不能有斜线。

```jsx
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="/calendar/today">
```

## getUserConfirmation: func

用于确认导航的功能。 默认使用 [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。

```jsx
// this is the default behavior
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```

## forceRefresh: bool

如果为 `true`，则路由器将在页面导航中使用整页刷新。 您可能只希望在 [browsers that don't support the HTML5 history API](http://caniuse.com/#feat=history)。

```jsx
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```

## keyLength: number

`location.key` 的长度。 默认为 6。

```jsx
<BrowserRouter keyLength={12}/>
```

## children: node

一个用于渲染的 [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) 
