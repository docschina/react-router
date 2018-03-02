# &lt;Link>

在应用程序周围提供声明式的,可访问的导航。

```jsx
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```

## to: string

链接位置的字符串表示，通过连接位置的路径名，搜索和 hash 属性创建。

```jsx
<Link to='/courses?sort=name'/>
```

## to: object

一个可以具有以下任何属性的对象：
  * `pathname`: 表示要链接到的路径的字符串。
  * `search`: 表示查询参数的字符串形式。
  * `hash`: 放入网址的 hash，例如 `#a-hash`。
  * `state`: 状态持续到 `location`。

```jsx
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```

## replace: bool

如果为 `true`，则单击链接将替换历史堆栈中的当前入口，而不是添加新入口。

```jsx
<Link to="/courses" replace />
```

## innerRef: function

允许访问 `ref` 组件的底层

```jsx
const refCallback = node => {
  // `node` refers to the mounted DOM element or null when unmounted
}

<Link to="/" innerRef={refCallback} />
```

## others

您还可以传递您想要放在 `<a>` 上的属性，例如标题，`ID`，`className` 等。

