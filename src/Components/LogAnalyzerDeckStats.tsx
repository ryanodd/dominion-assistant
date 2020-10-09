import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckInfo } from "../types";
import { CardContainer } from "./CardContainer";
import { Statistic, Tooltip } from "antd";

interface LogAnalyzerDeckStatsProps {
  deckInfos: DeckInfo[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckInfos, style}) => {  
  let deckStatsToRender: JSX.Element[] = []
  deckInfos.forEach(deckInfo => {
    deckStatsToRender.push(
      <Row fontSize={16}>
        <Tooltip title="prompt text">
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix="%"
          />
        </Tooltip>
        {'# Cards - ' + deckInfo.numCards}
        {'Total Money - ' + deckInfo.totalMoney}
        {'Total Stops - ' + deckInfo.totalStops}
        {'Total Draw - ' + deckInfo.totalDraw}
        {'Total Actions - ' + deckInfo.totalActions}
        {'Total Terminals - ' + deckInfo.totalTerminals}
        {'Total Villages - ' + deckInfo.totalVillages}
        {'Total Buys - ' + deckInfo.totalBuys}
      </Row>
    )
  })
  return (
    <Col style={style}>
      {deckStatsToRender} 
    </Col>
  )
}
