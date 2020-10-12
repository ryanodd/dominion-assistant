import React, { FunctionComponent } from 'react';
import { Row } from 'jsxstyle';
import { Card, Statistic, Tooltip } from 'antd';

export interface DeckStat {
  title: string
  value?: number | string
  tooltip?: string
  valueStyle?: {}
}

interface DeckStatPanelProps {
  stats: DeckStat[]
  style?: {}
};

export const DeckStatPanel: FunctionComponent<DeckStatPanelProps> = ({stats, style}) => {  
  let elementsToRender: JSX.Element[] = []
  stats.forEach((stat, i) => {
    let marginLeftAmount = i === 0 ? 0 : 30 // or try vertical line?
    elementsToRender.push(
      stat.tooltip ? 
      <Tooltip
        title={stat.tooltip}
        key={i}
      >
        <Statistic
          title={stat.title}
          value={stat.value}
          valueStyle={stat.valueStyle}
          style={{marginLeft: marginLeftAmount}}
        />
      </Tooltip>
      :
      <Statistic
        key={i}
        title={stat.title}
        value={stat.value}
        valueStyle={stat.valueStyle}
        style={{marginLeft: marginLeftAmount}}
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
