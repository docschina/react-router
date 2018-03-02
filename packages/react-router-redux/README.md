# react-router-redux

[![npm version](https://img.shields.io/npm/v/react-router-redux/next.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux)  [![npm downloads](https://img.shields.io/npm/dm/react-router-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux) [![build status](https://img.shields.io/travis/reactjs/react-router-redux/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-router-redux)

> **保持你的状态与你的 router 同步 :闪烁:

这是软件测试版，需要准备的:

1. 一个工作的例子
2. 一些人尝试去寻找 bug 
3. 使用 devtools 的策略。
   - (描述我们之前看到的不同的方法)
   
## Versions

此版本(react-router-redux 5.x) 是与 react-router 4.x一起使用的 react-router-redux 版本，react-router 2.x和 3.x 的用户希望使用在[旧版存储库](https://github.com/reactjs/react-router-redux)中找到的 react-router-redux 。

## Installation

```
npm install --save react-router-redux@next
npm install --save history
```

## Usage

下面是一个基本的工作原理:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
```
