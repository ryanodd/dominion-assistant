import React, { FunctionComponent } from 'react';
import { Col, Row } from 'jsxstyle';
import { Card, Popover, Statistic, Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons'

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
    let stringsToDisplayInTooltip = stat.tooltip ? [stat.tooltip] : []
    if (stat.messages){
      stringsToDisplayInTooltip = stringsToDisplayInTooltip.concat(stat.messages)
    }
    let tooltipLineElements: JSX.Element[] = []
    stringsToDisplayInTooltip.forEach(s => {
      tooltipLineElements.push(
        <Row
          fontSize={14}
        >
          {s}
        </Row>
      )
    })
    let tooltipElement = (
      <Col
        fontSize={14}
      >
        {tooltipLineElements}
      </Col>
    )
    //console.log(tooltipMessage)
    let marginLeftAmount = i === 0 ? 0 : 30 // or try vertical line?
    elementsToRender.push(
      stringsToDisplayInTooltip.length ? 
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
          suffix={stat.messages?.length ? <QuestionCircleTwoTone twoToneColor='#f08040'/> : null}
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
