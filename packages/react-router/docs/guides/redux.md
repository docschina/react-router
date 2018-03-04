#  Redux Integration  


Redux 是 React 生态系统的重要组成部分。对于想要同时使用 React Router 和Redux 两者的人来说，我们希望尽可能流畅的对他们进行整合。

## Blocked Updates


通常，React Router 和 Redux 可以很好的协同工作。尽管有时候，一个应用程序可以有一个在位置发生变化时不更新的组件（子路由或活动单行链接不更新）。

如果是这种情况:

1. 该组件连接到 `connect()(Comp)`。
2. 组件**不是** “路由组件”，这意味着它不是像这样渲染的： `<Route component={SomeConnectedThing}/>`。


问题是， Redux 实现了 `shouldComponentUpdate`，并且如果他没有从路由器接收到属性，则没有任何改变的迹象。这很容易解决。找到你 `connect`到你的组件的位置，然后用 `withRouter`将其包围起来。

```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```

## Deep integration

有些人们想要:

-  将路由数据与存储同步，并从存储访问路由数据
-  能够通过调度操作来实现导航
-  支持Redux开发工具中路由更改的时间迁移调试

所有这些都需要更深层次的整合。请注意，你不需要这种深度集成：

-  路线更改对于时间迁移调试来说是不太重要的。
-  你可以传递提供给路由组件的 `history` 对象，并在操作中使用它进行导航，而不是调度操作进行导航。
-  路由数据已经成为你关心的大多数组件的支柱，无论是来自存储库还是路由器都不会改变组件的代码。

但是，我们知道有些人对此有强烈的感受，因此我们尽可能提供最好的深度集成。截至React Router的第4版，Redux包已经成为了该项目的一部分。有关深度集成，请参考它

[React Router Redux](https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)
