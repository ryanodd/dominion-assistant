import React, { ReactElement } from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import store from '../store'

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
const Overlay = (): ReactElement => (
  <Provider store={store}>
    <Col
      height='100vh'
      width='100vw'
      pointerEvents='none'
      backgroundColor='transparent'
    >
      {'Hello! This is an overlay!'}
    </Col>
    <style>{`
      body {
        background-color: transparent;
      }
    `}</style>
  </Provider>
)

export default Overlay
