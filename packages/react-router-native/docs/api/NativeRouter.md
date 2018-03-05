# &lt;NativeRouter>

一个用 [React Native](https://facebook.github.io/react-native/) 为 iOS 和安卓构建的 [`<Router>`](../../../react-router/docs/api/Router.md) 。

```jsx
import { NativeRouter } from 'react-router-native'

<NativeRouter>
  <App/>
</NativeRouter>
```

## getUserConfirmation: func

一个用于确认导航的函数

```jsx
import { Alert } from 'react-native'

// This is the default behavior
const getConfirmation = (message, callback) => {
  Alert.alert('Confirm', message, [
    { text: 'Cancel', onPress: () => callback(false) },
    { text: 'OK', onPress: () => callback(true) }
  ])
}

<NativeRouter getUserConfirmation={getConfirmation}/>
```

## keyLength: number

`location.key` 的长度。默认值为6。

```jsx
<NativeRouter keyLength={12}/>
```

## children: node

要渲染的[单个子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。