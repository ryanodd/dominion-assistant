import React from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'
import LogAnalyzer from './LogAnalyzer'
import { HeaderBar } from './HeaderBar'
import { Provider } from 'react-redux'
import store from '../store'

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
export default class MainPage extends React.Component {
  render(): any {
    return (
      <Provider store={store}>
        <Col
          backgroundColor='#e0c090'
          height='100vh'
          width='100vw'
          overflowX='hidden'
          
        >
          <HeaderBar style={{'width': '100%'}}/>
          <Col
            padding={20}
            alignItems='stretch'
            overflowY='scroll'
            flex={1}
          >
            <LogAnalyzer/>
          </Col>
          {/* <DeckSelector/> */}
        </Col>
      </Provider>
    )
  }
}
