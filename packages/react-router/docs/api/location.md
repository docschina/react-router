# 地址

地址代表应用程序现在在哪，你想让它去哪，或者甚至它曾经在哪，它看起来就像：

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

路由器将在这几个地方为您提供一个地址对象：

- [Route component](./Route.md#component) as `this.props.location`
- [Route render](./Route.md#render-func) as `({ location }) => ()`
- [Route children](./Route.md#children-func) as `({ location }) => ()`
- [withRouter](./withRouter.md) as `this.props.location`

它也可以在 `history.location` 找到，但是你不应该使用它，因为它是可变的，您可以在 [history](./history.md) 文档中阅读更多内容。

地址对象永远不会发生变化，因此您可以在生命周期钩子中使用它来确定何时导航，这对数据抓取和动画非常有用。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```

您可以将位置而不是字符串提供给导航的各个位置：

- Web [Link to](../../../react-router-dom/docs/api/Link.md#to)
- Native [Link to](../../../react-router-native/docs/api/Link.md#to)
- [Redirect to](./Redirect.md#to)
- [history.push](./history.md#push)
- [history.replace](./history.md#push)

通常你只是使用一个字符串，但是如果你需要添加一些“位置状态”，只要应用程序返回到特定的位置就可以使用，你可以使用位置对象。 如果您想根据导航历史记录而不是仅路径（如模式）来分支UI，这很有用。

```jsx
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

最后，您可以将地址传递给以下组件：

- [Route](./Route.md#location)
- [Switch](./Switch.md#location)

这将阻止他们在路由器的状态下使用实际的位置。这对动画和在等待的导航非常有用，或者任何时候你想哄骗一个组件在不同的位置渲染到真实的位置。

