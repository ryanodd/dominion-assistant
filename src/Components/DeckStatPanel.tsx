import React, { FunctionComponent } from 'react';
import { Col, Row } from 'jsxstyle';
import { Card, Popover, Statistic } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons'

export interface DeckStat {
  title: string
  value?: number | string
  tooltip?: string
  messages?: string[]
  precision?: number
  valueStyle?: {}
}

interface DeckStatPanelProps {
  stats: DeckStat[]
  style?: {}
};

export const DeckStatPanel: FunctionComponent<DeckStatPanelProps> = ({stats, style}) => {  
  let elementsToRender: JSX.Element[] = []
  stats.forEach((stat, i) => {

    let tooltipLineElements: JSX.Element[] = []
    if (stat.tooltip){
      tooltipLineElements.push(
        <Row
        fontSize={16}
        fontWeight={700}
        alignItems='center'
      >
        {stat.tooltip}
      </Row>
      )
    }
    if (stat.messages){
      stat.messages.forEach(s => {
        tooltipLineElements.push(
          <Row
            fontSize={14}
            alignItems='center'
          >
            <ExclamationCircleTwoTone twoToneColor='#f07030' style={{marginRight: 4}}/>
            {s}
          </Row>
        )
      })
    }
    let tooltipElement = (
      <Col
        fontSize={14}
      >
        {tooltipLineElements}
      </Col>
    )

    let marginLeftAmount = i === 0 ? 0 : 30 // or try vertical line?
    elementsToRender.push(
      stat.messages?.length || stat.tooltip ? 
      <Popover
        content={tooltipElement}
        key={i}
      >
        <Statistic
          title={stat.title}
          value={stat.value}
          valueStyle={stat.valueStyle}
          precision={stat.precision}
          style={{...style, marginLeft: marginLeftAmount}}
          suffix={stat.messages?.length ? <ExclamationCircleTwoTone twoToneColor='#f07030' style={{fontSize: 20}}/> : null}
        />
      </Popover>
      :
      <Statistic
        key={i}
        title={stat.title}
        value={stat.value}
        valueStyle={stat.valueStyle}
        precision={stat.precision}
        style={{...style, marginLeft: marginLeftAmount}}
      /> 
    )
  })
  return (
    <Card style={style}>
      <Row justifyContent='space-between'>
        {elementsToRender}
      </Row>
    </Card>

  );
}
