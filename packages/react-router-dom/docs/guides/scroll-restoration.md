# Scroll Restoration

在早期版本的 React Router 中，我们为 scroll restoration 提供了开箱即用的支持，从此人们一直在寻求它。希望本文能帮助你从滚动条和路由中获得所需要的内容！

浏览器开始使用 `history.pushState` 处理 scroll restoration，其方式与使用普通浏览器导航处理相同。它已经在 chrome 中工作，它真的很棒。 [这是 Scroll Restoration 的规范。](https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl)

由于浏览器开始处理 “默认情况”，并且应用程序有不同的滚动需求（比如本网站！），因此我们不提供默认的滚动管理。这个指南应该可以帮助你实现你所拥有的任何滚动需求。

## 滚动到顶部

大多数情况下，因为你的页面内容很长，所以你只需要“滚动到顶部”，当浏览时，保持向下滚动。这只需要一个 `<ScrollToTop>` 组件就可以简单的解决，它会在每次导航时向上滚动窗口，请确保将其封装在 Router 中，以便使它可以访问 router 的属性。

```jsx
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
```

然后将其呈现在应用程序的顶部，但在 Router 的下方

```jsx
const App = () => (
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>
)

// or just render it bare anywhere you want, but just one :)
<ScrollToTop/>
```

如果您有一个连接到 router 的 tab 接口，那么当它们切换 tab 时，你可能不希望滚动到顶部。相反，在你需要的特定位置上使用 `<ScrollToTopOnMount>` 怎么样？

```jsx
class ScrollToTopOnMount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount />
      <h1>Here is my long content page</h1>
    </div>;
  }
}

// somewhere else
<Route path="/long-content" component={LongContent} />;
```

## 通用的解决方案

对于一个通用的解决方案(以及浏览器在本地开始实现的内容)，我们讨论了两件事:

1. 向上滚动导航，这样你就不会开始滚动到底部的新屏幕
2. 在点击“后退”和“前进”时，恢复窗口和溢出元素的滚动位置（但不是点击链接！）

在某个时候，我们想要发布一个通用 API。我们的目标是:

```jsx
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: "200px", overflow: "auto" }}>I will overflow</div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```

首先，`ScrollRestoration` 将向上滚动导航窗口。其次，它将使用 `location.key` 将窗口滚动位置和 `RestoredScroll` 组件的滚动位置保存到 `sessionStorage`。然后，当 `ScrollRestoration` 或 `RestoredScroll` 组件挂载时，它们可以从 `sessionsStorage` 中查找它们的位置。

当我不想让窗口滚动管理时，定义一个“退出”API 是非常困难的。例如，如果你的页面内容中有一些标签导航浮动，你可能不想滚动到顶部（标签可能会滚动到视图外面！）。

当我了解到 chrome 现在为我们管理滚动位置，并意识到不同的应用程序将会有不同的滚动需求时，我有点失去了我们需要去提供一些东西的信念，尤其是当人们只想滚动到顶部时（你看到的是直接添加到你的应用程序中）。

基于这一点，我们不再强烈地感到自己做这项工作(和你一样，我们的时间有限！) 。但是，我们愿意帮助任何倾向于实施通用的解决方案的人。一个可靠的解决方案甚至可以存在于项目中。如果你开始了，请联系我们 : )
