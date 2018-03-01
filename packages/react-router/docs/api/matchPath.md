# matchPath

这里 `<Route>` 可以使用相同的匹配代码，除非在正常渲染周期之外，例如，采集到的数据属于之前渲染到服务器上的。

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
})
```

## pathname

第一个参数是你想要匹配的 pathname。 如果您正在服务器上使用 Node.js ，它将是 `req.path`。

## props

第二个参数是匹配的 props，它们与匹配 props 相同 `Route` 接受：

```js
{
  path, // 例如 /users/:id
  strict, // 选填, 默认为 false
  exact // 选填, 默认为 false
}
```
