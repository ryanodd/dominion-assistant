import React, { FunctionComponent } from 'react';
import { Row } from 'jsxstyle';
import { Card, Statistic, Tooltip } from 'antd';
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
    let tooltipMessage = stat.tooltip
    if (stat.messages) {
      stat.messages.forEach(message => {
        tooltipMessage = tooltipMessage ? tooltipMessage + '\n' + message : message
      })
    }
    let marginLeftAmount = i === 0 ? 0 : 30 // or try vertical line?
    elementsToRender.push(
      tooltipMessage ? 
      <Tooltip
        title={tooltipMessage}
        key={i}
      >
        <Statistic
          title={stat.title}
          value={stat.value}
          valueStyle={stat.valueStyle}
          precision={stat.precision}
          style={{...style, marginLeft: marginLeftAmount}}
          suffix={stat.messages?.length ? <QuestionCircleTwoTone twoToneColor='f08040' style={{'paddingBottom': 3}}/> : null}
        />
      </Tooltip>
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
