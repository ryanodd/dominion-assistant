import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { HashRouter, Route} from 'react-router-dom'
import MainPage from './Components/trackerPage/MainPage'
import Overlay from './Components/overlay/Overlay'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename='/'>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/overlay" component={Overlay} />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
