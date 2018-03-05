# &lt;BackButton>

将Android和tvOS上的全局后退按钮连接到 router 的历史记录。在Android上，当到达初始位置时，默认的后退行为将接管。只需在你的应用程序中的某处进行渲染。

```jsx
<BackButton/>
```

## children

如果你要避开浮动的配置组件，可以使用子组件进行组合。

```jsx
<NativeRouter>
  <BackButton>
    <App/>
  </BackButton>
</NativeRouter>

// instead of
<NativeRouter>
  <View>
    <BackButton/>
    <View>Some people don't like that.</View>
  </View>
</NativeRouter>
```

