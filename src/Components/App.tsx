import React, { FunctionComponent } from 'react'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from '../store'

type AppProps = {
  children: any
}

const App: FunctionComponent<AppProps> = (props: AppProps) => (
  <Provider store={store}>
    {props.children}
  </Provider>
)

export default App
