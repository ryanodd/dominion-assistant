import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MainPage from './Components/MainPage'
import Overlay from './Components/Overlay'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/">
        <MainPage />
      </Route>
      <Route path="/overlay">
        <Overlay />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
