# history

The term "history" and "`history` object" in this documentation refers to [the `history` package](https://github.com/ReactTraining/history), which is one of only 2 major dependencies of React Router (besides React itself), and which provides several different implementations for managing session history in JavaScript in various environments.  
本文档中的”history”以及”`history`对象“请参照 [`history` 包](https://github.com/ReactTraining/history)中的内容，History 是 React Router 的两大重要依赖之一(除去 React 本身)，在不同的 Javascript 环境中，它提供多种不同的形式来实现对 session 历史的管理。

The following terms are also used:  
我们也会使用以下术语：

- "browser history" - A DOM-specific implementation, useful in web browsers that support the HTML5 history API  
  “browser history” - 在 DOM 上的实现，使用于支持 HTML5 history API 的Web浏览器中
- "hash history" - A DOM-specific implementation for legacy web browsers  
  “hash history” - 在 DOM 上的实现，使用于旧版本的Web浏览器中
- "memory history" - An in-memory history implementation, useful in testing and non-DOM environments like React Native  
  “memory history” - 在内存中的 history 实现，使用于测试或者非 DOM 环境中

`history` objects typically have the following properties and methods:  
`history` 对象通常会具有以下属性和方法：

- `length` - (number) The number of entries in the history stack  
  `length` - (number类型) history 堆栈的条目数
- `action` - (string) The current action (`PUSH`, `REPLACE`, or `POP`)  
  `action` - (string类型) 当前的操作(`PUSH`, `REPLACE`, `POP`)
- `location` - (object) The current location. May have the following properties:  
  `location` - (object类型) 当前的位置。location 会具有以下属性：
  - `pathname` - (string) The path of the URL  
    `pathname` - (string类型) URL路径
  - `search` - (string) The URL query string  
    `search` - (string类型) URL中的查询字符串
  - `hash` - (string) The URL hash fragment  
    `hash` - (string类型) URL的 hash 片段
  - `state` - (object) location-specific state that was provided to e.g. `push(path, state)` when this location was pushed onto the stack. Only available in browser and memory history.  
    `state` - (object类型) location 的状态。例如在 `push(path, state)` 时，state会描述什么时候 location 被放置到堆栈中等信息。这个 state 只会出现在 browser history 和 memory history 的环境里。
- `push(path, [state])` - (function) Pushes a new entry onto the history stack  
  `push(path, [state])` - (function类型) 在 history 堆栈添加一个新条目
- `replace(path, [state])` - (function) Replaces the current entry on the history stack  
  `replace(path, [state])` - (function类型) 替换在 history 堆栈中的当前条目
- `go(n)` - (function) Moves the pointer in the history stack by `n` entries  
  `go(n)` - (function类型) 将 history 堆栈中的指针调整 `n`
- `goBack()` - (function) Equivalent to `go(-1)`  
  `goBack()` - (function类型) 等同于 `go(-1)`
- `goForward()` - (function) Equivalent to `go(1)`  
  `goForward()` - (function类型) 等同于 `go(1)`
- `block(prompt)` - (function) Prevents navigation (see [the history docs](https://github.com/ReactTraining/history#blocking-transitions))  
  `block(prompt)` - (function类型) 阻止跳转。(详见 [history 文档](https://github.com/ReactTraining/history#blocking-transitions))。

## history is mutable  
history 是可变的

The history object is mutable. Therefore it is recommended to access the [`location`](./location.md) from the render props of [`<Route>`](./Route.md), not from `history.location`. This ensures your assumptions about React are correct in lifecycle hooks. For example:  
history 对象是可变的，因此我们建议从 [`<Route>`](./Route.md) 的 props里来获取location ，而不是从 `history.location` 直接获取。这样做可以保证 React 在生命周期中的钩子函数正常执行，例如以下代码：

```jsx
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // will be true
    // locationChanged 将为 true
    const locationChanged = nextProps.location !== this.props.location

    // INCORRECT, will *always* be false because history is mutable.
    // 错了，因为 history 是可变的所以 locationChanged 将一直为 false
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```

Additional properties may also be present depending on the implementation you're using. Please refer to [the history documentation](https://github.com/ReactTraining/history#properties) for more details.  
根据不同的实现，可能会出现其他属性。更多详情请参考 [history 文档](https:github.comReactTraininghistory)。
