# &lt;MemoryRouter>

A [`<Router>`](Router.md) that keeps the history of your "URL" in memory (does not read or write to the address bar). Useful in tests and non-browser environments like [React Native](https://facebook.github.io/react-native/).  
[`<Router>`](Router.md) 能在内存中保存你的 “URL” 的历史记录(并没有对地址栏进行读写)。在测试环境和非浏览器环境中使用，例如[React Native](https://facebook.github.io/react-native/)。

```jsx
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```

## initialEntries: array

An array of `location`s in the history stack. These may be full-blown location objects with `{ pathname, search, hash, state }` or simple string URLs.  
历史堆栈中的一个 `location` 数组。这些可能是具有 `{ pathname, search, hash, state }` 或简单的 URL 字符串的完整地址对象。

```jsx
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

## initialIndex: number

The initial location's index in the array of `initialEntries`.  
在 `initialEntries` 数组中的初始化地址索引。

## getUserConfirmation: func

A function to use to confirm navigation. You must use this option when using `<MemoryRouter>` directly with a `<Prompt>`.  
用于确认导航的功能。在使用 `<MemoryRouter>` 时，直接使用 `<Prompt>`，您必须使用这个选项。

## keyLength: number
 
The length of `location.key`. Defaults to 6.  
`location.key` 的长度默认为 6。

```jsx
<MemoryRouter keyLength={12}/>
```

## children: node

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.  
呈现一个 [单独子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。
