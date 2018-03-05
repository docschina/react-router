# &lt;Link>

为你的应用程序提供声明式的可访问导航。

```jsx
import { Link } from 'react-router-native'

<Link to='/about'>About</Link>
```

## to: string

通过位置的路径名、搜索和散列属性连接用来创建代表位置链接的字符串。

```jsx
<Link to='/courses?sort=name'/>
```

## to: object

一个可以具有以下属性的对象：

- `pathname`: 表示链接路径的字符串。
- `search`: 表示查询参数的字符串, 例如： `?key=value`。
- `hash`: 要放入URL的散列， 例如： `#a-hash`。
- `state`: 状态将持续存在在 `location` 中。

```jsx
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```

## replace: bool

当为 `true` 时，单击该链接将替换历史堆栈中的当前条目，而不是添加一个新条目。

```jsx
<Link to="/courses" replace />
```

## component: func

A component for making `Link` respond properly to touches. Typically will be one React Native's "touchable" components (`TouchableHighlight`, `TouchableOpacity`, etc). All props passed to `Link` will be passed along to this component. Defaults to `TouchableHighlight`.

用于使 `Link` 正确响应触摸的组件。 通常会是一个 React Native的 “可触摸”组件（ `TouchableHighlight`，`TouchableOpacity` 等）。 所有传递给 `Link` 的属性都会传递给这个组件。 默认为 `TouchableHighlight` 。

```jsx
<Link
  to='/about'
  component={TouchableOpacity}
  activeOpacity={0.8} />
```