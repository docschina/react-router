# Testing

React Router relies on React context to work. This affects how you can
test your components that use our components.

React Router依赖于React。这会影响您如何通过使用我们的组件来测试你的组件。

## Context

If you try to unit test one of your components that renders a `<Link>` or a `<Route>`, etc. you'll get some errors and warnings about context.  While you may be tempted to stub out the router context yourself, we recommend you wrap your unit test in a `<StaticRouter>` or a `<MemoryRouter>`. Check it out:

如果您尝试单元测试呈现`<Link>`或者`<Router>`组件，你会得到一些上下文的错误信息和警告信息。虽然你可能会试图自己去掉路由器上下文，但我们建议你将你的单元测试包裹在`<StaticRouter>`或者`<MemoryRouter>`中。让我们来看一下：

```jsx
class Sidebar extends Component {
  // ...
  render() {
    return (
      <div>
        <button onClick={this.toggleExpand}>
          expand
        </button>
        <ul>
          {users.map(user => (
            <li>
               <Link to={user.path}>
                 {user.name}
               </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// broken
// 断开
test('it expands when the button is clicked', () => {
  render(
    <Sidebar/>
  )
  click(theButton)
  expect(theThingToBeOpen)
})

// fixed!
// 固定！
test('it expands when the button is clicked', () => {
  render(
    <MemoryRouter>
      <Sidebar/>
    </MemoryRouter>
  )
  click(theButton)
  expect(theThingToBeOpen)
})
```

That's all there is to it.

这就是它的所有示例。

## Starting at specific routes

## 从特定的路由开始

`<MemoryRouter>` supports the `initialEntries` and `initialIndex` props,
so you can boot up an app (or any smaller part of an app) at a specific
location.

`<MemoryRouter>` 支持`initialEntries` 和 `initialIndex` 属性，因此你可以从一个特定的地址（location）来启动你的app（或者是app的任何一个小部分）。

```jsx
test('current user is active in sidebar', () => {
  render(
    <MemoryRouter initialEntries={[ '/users/2' ]}>
      <Sidebar/>
    </MemoryRouter>
  )
  expectUserToBeActive(2)
})
```

## Navigating

## 导航

We have a lot of tests that the routes work when the location changes, so you probably don't need to test this stuff. But if you must, since everything happens in render, we do something a little clever like this:

当地址（location）发生变化的时候，我们会对路由进行大量的测试，因此你可能不需要测试这个东西。但是如果你必须这样做，基于一切都在渲染中发生，我们可以聪明一点这样做：

```jsx
import { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'
import { Route, Link, MemoryRouter } from 'react-router-dom'
import { Simulate } from 'react-addons-test-utils'

// a way to render any part of your app inside a MemoryRouter
// 把整个app都放在一个MemoryRouter里面渲染的其中一个方法是
// you pass it a list of steps to execute when the location
// 把他们都放进一个要执行的步骤列表里面，
// changes, it will call back to you with stuff like
// 当地址发生变化的时候，
// `match` and `location`, and `history` so you can control
// 它就会连同`match`， `location`, 和 `history`一起被回调，
// the flow and make assertions.
// 因此，你可以控制整个流程和做断言。
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement('div')

  class Assert extends React.Component {

    componentDidMount() {
      this.assert()
    }

    componentDidUpdate() {
      this.assert()
    }

    assert() {
      const nextStep = steps.shift()
      if (nextStep) {
        nextStep({ ...this.props, div })
      } else {
        unmountComponentAtNode(div)
      }
    }

    render() {
      return this.props.children
    }
  }

  class Test extends React.Component {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route render={(props) => (
            <Assert {...props}>
              <Subject/>
            </Assert>
          )}/>
        </MemoryRouter>
      )
    }
  }

  render(<Test/>, div)
}

// our Subject, the App, but you can test any sub
// section of your app too
// 我们的Subject是这个App，但是你也可以测试你的应用的任何子部分
const App = () => (
  <div>
    <Route exact path="/" render={() => (
      <div>
        <h1>Welcome</h1>
      </div>
    )}/>
    <Route path="/dashboard" render={() => (
      <div>
        <h1>Dashboard</h1>
        <Link to="/" id="click-me">Home</Link>
      </div>
    )}/>
  </div>
)

// the actual test!
// 实际测试！
it('navigates around', (done) => {

  renderTestSequence({

    // tell it the subject you're testing
    // 告诉它你正在测试的subject
    subject: App,

    // and the steps to execute each time the location changes
    // 以及每次位置变化时执行的步骤
    steps: [
      
      // initial render
      // 初始渲染
      ({ history, div }) => {
        // assert the screen says what we think it should
        // 断言屏幕的输出是否如同我们期望的输出
        console.assert(div.innerHTML.match(/Welcome/))

        // now we can imperatively navigate as the test
        // 现在我们可以为我们的测试强制导航
        history.push('/dashboard')
      },

      // second render from new location
      // 从新的地址发起第二次渲染
      ({ div }) => {
        console.assert(div.innerHTML.match(/Dashboard/))

        // or we can simulate clicks on Links instead of
        // using history.push
        // 或者我们可以模拟点击链接，而不使用 history.push
        Simulate.click(div.querySelector('#click-me'), {
          button: 0
        })
      },

      // final render
      // 最终渲染
      ({ location }) => {
        console.assert(location.pathname === '/')
        // you'll want something like `done()` so your test
        // fails if you never make it here.
        // 你需要在这里写下 `done()`，如果你从未这样做，你的测试是失败的。
        done()
      }
    ]
  })
})
```
