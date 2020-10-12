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
};

export const DeckStatPanel: FunctionComponent<DeckStatPanelProps> = ({stats}) => {  
  let elementsToRender: JSX.Element[] = []
  stats.forEach((stat, i) => {
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
        />
      </Tooltip>
      :
      <Statistic
        key={i}
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
