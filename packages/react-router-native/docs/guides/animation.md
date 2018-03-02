# Animation

本指南现在有些零散，但是如果你已经习惯了动画，本篇指南应该可以提供足够的见解来帮助你实现一些优秀的动画。由于 React Router 主要只是组件，所以对于所有典型的动画策略都适用。唯一的区别是触发动画的东西。本指南试图去激发灵感，而不是提供复制或者粘贴的代码。

# Element Transitions

当用户导航时，某些元素应在保留在页面上。在这种情况非常适合使用 [`Route`][Route] `children`  。

考虑一下这个没有 router 的应用程序。当触发 `<TouchableHighlight/>` 时，边栏的动画将会切换。

```jsx
class Sidebar extends Component {
  state {
    anim: new Animated.Value(
      this.props.isOpen ? 0 : 1
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      Animated.timing(this.state.anim, {
        toValue: nextProps.isOpen ? 1 : 0
      }).start()
    }
  }

  render() {
    // ...
  }
}

class App extends Component {
  state = {
    sidebarIsOpen: false
  }

  render() {
    const { sidebarIsOpen } = this.state
    return (
      <View>
        <Sidebar isOpen={sidebarIsOpen}/>
        <TouchableHighlight onPress={() => {
          this.setState(state => !state.sidebarIsOpen)
        }}>
          <Text>Open Sidebar</Text>
        </TouchableHighlight>
        <Screen/>
      </View>
    )
  }
}
```

现在，我们可以通过 route 替换状态，从而让你可以从任何地方打开侧边栏的深层链接，甚至与其他应用程序的深层链接。

```jsx
class App extends Component {
  render() {
    return (
      <View>
        <Route path="/sidebar" children={({ match }) => (
          // `children` always renders, match or not. This
          // way we can always render the sidebar, and then
          // tell it if its open or not
          <Sidebar isOpen={!!match}/>
        )}/>
        <Link to="/sidebar">
          <Text>Open Sidebar</Text>
        </Link>
        <Screen/>
      </View>
    )
  }
}
```

这在列表中非常有趣。对于列表中的每个项目，你可以创建与其匹配的 route，然后执行动画以打开或关闭该列表的这一部分，或将其中一个元素转换为 header 。

```jsx
<View>
  {chutneys.map(chutney => (
    <Route path={`/chutney/${chutney.id}`}>
      {({ match }) => (
        <Chutney isActive={match}/>
      )}
    </Route>
  ))}
</View>
```

每个 chutney 都有属于自己的 route ，这些 route 总是作为列表的一部分进行渲染，当它处于活动状态时（通过点击该项目或通过其他方式），它可以将图像设置为具有固定位置的标题（然后可能在动画完成后停止渲染，并让 “真实” 标题滚动到页面）。

## Page Transitions

由于组件的声明性，当你在一个屏幕上，按下一个链接，然后导航到另一个屏幕时，旧页面将不再位于渲染树中，甚至不再具有动画效果！关键是记住 React 元素只是对象。你可以保存它们并再次渲染它们。这是从一个页面（离开渲染树）到另一个页面的动画策略。

如果你在移动设备上访问过此网站，或者你将浏览器缩小得很小，则可以单击后退按钮查看此类动画。这个策略是首先不要考虑动画。只需渲染你的 route 和 link，并使他们都工作起来，然后用动画组件包装你的组件，把它们包装起来。

我们将在一个页面中考虑使用一些子路由：

```jsx
class Parent extends Component {
  render() {
    return (
      <View>
        <Switch>
          <Route path="/settings"/>
          <Route path="/notifications"/>
        </Switch>
      </View>
    )
  }
}
```

一旦它在没有动画的情况下工作，我们就可以在它周围添加动画了。


```jsx
<AnimatedChild
  anim={this.state.anim}
  atParent={this.props.match.isExact}
  animating={this.state.animating}
>
  <Switch location={this.props.location}>
    <Route path="/settings"/>
    <Route path="/notifications"/>
  </Switch>
</AnimatedChild>
```

这对于使用 [`<Switch>`][Switch] 很重要。它将确保只有一条路径可以匹配，因此在 `props.children` 上给我们一个单个元素在播放动画的同时坚持渲染。最后，你必须通过该位置去 `Switch` 。它更喜欢在 internal router location 使用 `props.location` ，这使得保存的子元素能够在以后被更换，并且继续匹配旧的 location 。

在管理动画时，父级会将知道一些交给 `AnimatedChild` 的支持。同样的，本指南现在比复制/粘贴更具启发性，请随时查看本网站的来源以了解具体实施情况。好的，让我们来看看 `AnimatedChild` 的实现（它是从本网站使用的动画粘贴的副本）。

```jsx
class AnimatedChild extends Component {

  static propTypes = {
    children: PropTypes.node,
    anim: PropTypes.object,
    atParent: PropTypes.bool,
    animating: PropTypes.bool
  }

  state = {
    // we're going to save the old children so we can render
    // it when it doesnt' actually match the location anymore
    previousChildren: null
  }

  componentWillReceiveProps(nextProps) {
    // figure out what to do with the children
    const navigatingToParent = nextProps.atParent && !this.props.atParent
    const animationEnded = this.props.animating && !nextProps.animating

    if (navigatingToParent) {
      // we were rendering, but now we're heading back up to the parent,
      // so we need to save the children (har har) so we can render them
      // while the animation is playing
      this.setState({
        previousChildren: this.props.children
      })
    } else if (animationEnded) {
      // When we're done animating, we can get rid of the old children.
      this.setState({
        previousChildren: null
      })
    }
  }

  render() {
    const { anim, children } = this.props
    const { previousChildren } = this.state
    return (
      <Animated.View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: anim.interpolate({
          inputRange: [ 0, 1 ],
          outputRange: [ 20, 0 ]
        }),
        opacity: anim.interpolate({
          inputRange: [ 0, 0.75 ],
          outputRange: [ 0, 1 ]
        })
      }}>
        {/* render the old ones if we have them */}
        {previousChildren || children}
      </Animated.View>
    )
  }
}
```

希望这能帮助你思考。同样，动画本身与 router 是一样的，区别在于知道何时触发它们。以下列表中列出了要在 `componentWillReceiveProps` 中检查的内容，以便根据 router 的 location 决定如何处理动画:

location 的一般的变化

```js
nextProps.location !== this.props.location`
```

由子级到父级：

```js
nextProps.match.isExact && !this.props.match.isExact
```

由父级到子级：

```js
!nextProps.match.isExact && this.props.match.isExact
```

祝你好运！我们希望通过更多的细节和实例来扩展这一部分。

[Route]:../api/Route.md
[Switch]:../api/Switch.md
