import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckInfo } from "../types";
import { Card, Statistic, Tooltip } from "antd";

interface LogAnalyzerDeckStatsProps {
  deckInfos: DeckInfo[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckInfos, style}) => {  
  let deckStatsToRender: JSX.Element[] = []
  deckInfos.forEach(deckInfo => {
    deckStatsToRender.push(
      <Row fontSize={16}>
        <Card>
          <Row>
            <Statistic
              title="Cards"
              value={deckInfo.numCards}
              //valueStyle={{ color: '#3f8600' }}
            />
            <Statistic
              title="Draw"
              value={deckInfo.totalDraw}
              //valueStyle={{ color: '#3f8600' }}
            />
            <Tooltip title="Cards that don't draw more cards.">
              <Statistic
                title="Stop Cards"
                value={deckInfo.totalStops}
              />
            </Tooltip>
            <Tooltip title="Every +Card above 1.">
              <Statistic
                title="Extra Draw"
                value={deckInfo.totalExtraDraw}
              />
            </Tooltip>
          </Row>
        </Card>
        <Card>
          <Row>
            <Statistic
              title="Actions"
              value={deckInfo.totalActions}
            />
            <Tooltip title="Action cards which do not give extra actions.">
              <Statistic
                title="Terminals"
                value={deckInfo.totalStops}
              />
            </Tooltip>
            <Tooltip title="Every +Action above 1.">
              <Statistic
                title="Extra Actions"
                value={deckInfo.totalExtraActions}
              />
            </Tooltip>
          </Row>
        </Card>
        <Card>
          <Row>
            <Statistic
              title="Money"
              value={deckInfo.totalMoney}
            />
            <Tooltip title="Money divided by cards.">
              <Statistic
                title="Money Density"
                value={deckInfo.totalMoney / deckInfo.numCards}
              />
            </Tooltip>
            <Tooltip title="Money divided by effective cards (stop cards - extra draw).">
              <Statistic
                title="Effective Money Density"
                value={deckInfo.totalMoney / Math.max(1, deckInfo.totalStops - deckInfo.totalExtraDraw)}
              />
            </Tooltip>
            <Statistic
              title="Buys"
              value={deckInfo.totalBuys}
            />
          </Row>
        </Card>
      </Row>
    )
  })
  return (
    <Col style={style}>
      {deckStatsToRender} 
    </Col>
  )
}
