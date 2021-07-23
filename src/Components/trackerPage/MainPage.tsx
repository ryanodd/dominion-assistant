import React, { ReactElement } from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'
import LogAnalyzer from './LogAnalyzer'
import { HeaderBar } from './HeaderBar'
import styled from 'styled-components'

const BackgroundImage = styled.div`
  position: absolute;
  top: 0; 
  right: 0;
  bottom: 0;
  left: 0;

  background-image: url(throne-room.png);
  background-size: cover;
  background-position: center;
  //background-repeat: no-repeat;
  
  filter: blur(10px);
  transform: scale(1.04); // to cancel out border blur effect
`

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
export default class MainPage extends React.Component {
  render(): ReactElement {
    return (

      <Col
        height='100vh'
        width='100vw'
        overflowX='hidden'
      >
        <HeaderBar style={{
          'width': '100%',
          'z-index': '1',
        }}/>
        <Col
          position='relative'
          flex={1}
          overflow='hidden'
        >
          <BackgroundImage />
          <Col
            padding={20}
            alignItems='stretch'
            overflowY='auto'
          >
            <LogAnalyzer/>
          </Col>
        </Col>
        {/* <DeckSelector/> */}
      </Col>
    )
  }
}
