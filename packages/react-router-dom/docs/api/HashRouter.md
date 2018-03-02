# &lt;HashRouter>

使用 URL 的 hash 部分（即 window.location.hash ）的 `<Router>` 使您的 UI 与 URL 保持同步。

**重要提示：**Hash 历史记录不支持 `location.key` 或 `location.state`。 在以前的版本中，我们试图填补行为，但存在我们无法解决的边缘案例。 任何需要此行为的代码或插件都将无法使用。 由于此技术仅用于支持传统浏览器，因此我们鼓励您配置服务器以便与 `<BrowserHistory>` 配合使用。

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```

## basename: string

所有位置的基本 URL，格式正确的基本名应该有一个前导斜线，但结尾不能有斜线。

```jsx
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
```

## getUserConfirmation: func

用于确认导航的功能。 默认使用 [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。

```jsx
// this is the default behavior
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<HashRouter getUserConfirmation={getConfirmation}/>
```

## hashType: string

用于 `window.location.hash` 的编码类型。 可用的值是：

- `"slash"` - 创建像 `#/` 和的 `#/sunshine/lollipops` hash 表
- `"noslash"` - 创建像 `#` 和的 `#sunshine/lollipops` hash 表
- `"hashbang"` - 创建  ["ajax crawlable"](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more)  （由Google弃用）hash，如 `#！/` 和 `#！/sunshine/lollipops`

默认为`"slash"`。

## children: node

一个用于渲染的 [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) 
