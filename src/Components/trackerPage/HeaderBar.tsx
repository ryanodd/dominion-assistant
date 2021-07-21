import React, { FunctionComponent } from 'react'
import { Row, Col } from 'jsxstyle'
import { Popover } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

interface HeaderBarProps {
  style?: Record<string, unknown>
}

const infoTooltipContent = (
  <Col
    width={180}
  >
    {'This is a deck tracking tool for the card game \'Dominion Online\'. Just paste your game\'s log, and each player\'s stats will appear.'}
  </Col>
)


export const HeaderBar: FunctionComponent<HeaderBarProps> = ({style}: HeaderBarProps) => {  
  return (
    <Row
      style={{
        ...style, 
        'backgroundColor': '#202020',
        'padding': 10,
        'justifyContent': 'space-between',
      }}
    >
      <Col
        fontSize={30}
        color='#E0E0E0'
      >
        {'Dominion Tracker'}
      </Col>
      <Col
        fontSize={16}
        color='#E0E0E0'
        justifyContent='center'
      >
        <Popover
          arrowPointAtCenter
          placement='bottomRight'
          content={infoTooltipContent}
        >
          <span>
            <InfoCircleFilled/>
            {' What is this?'}
          </span>
        </Popover>
      </Col>
    </Row>
  )
}
