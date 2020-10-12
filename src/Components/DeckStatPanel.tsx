import React, { FunctionComponent } from 'react';
import { Col, Row } from 'jsxstyle';
import { Card, Divider, Statistic, Tooltip } from 'antd';

export interface DeckStat {
  title: string
  value?: number | string
  tooltip?: string
  valueStyle?: {}
}

interface DeckStatPanelProps {
  stats: DeckStat[]
};

export const DeckStatPanel: FunctionComponent<DeckStatPanelProps> = ({stats}) => {  
  let elementsToRender: JSX.Element[] = []
  stats.forEach((stat, i) => {
    if (i != 0){
      elementsToRender.push(
        <Divider/> // ?
      )
    }
    elementsToRender.push(
      stat.tooltip ? 
      <Tooltip title={stat.tooltip}>
        <Statistic
          title={stat.title}
          value={stat.value}
          valueStyle={stat.valueStyle}
        />
      </Tooltip>
      :
      <Statistic
        title={stat.title}
        value={stat.value}
        valueStyle={stat.valueStyle}
      /> 
    )
  })
  return (
    <Card>
      <Row>
        {elementsToRender}
      </Row>
    </Card>

  );
}
