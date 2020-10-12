import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckInfo } from "../types";
import { Card, Statistic, Tooltip } from "antd";
import { CardContainer } from "./CardContainer";
import { DeckStat, DeckStatPanel } from "./DeckStatPanel";

interface LogAnalyzerDeckStatsProps {
  deckInfos: DeckInfo[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckInfos, style}) => {  
  let playerDeckStats: JSX.Element[] = []
  deckInfos.forEach(deckInfo => {
    playerDeckStats.push(
      <Col>
        <Row fontSize={16}>
        {deckInfo.playerName}
          <DeckStatPanel 
            stats={[
              {
                title: "Cards",
                value: deckInfo.numCards
              },
              {
                title: "Draw",
                value: deckInfo.totalDraw
              },
              {
                title: "Stop Cards",
                value: deckInfo.totalStops,
                tooltip: "Cards that don't draw more cards.",
                valueStyle: { color: '#3f8600' }
              },
              {
                title: "Extra Draw",
                value: deckInfo.totalExtraDraw,
                tooltip: "Every +Card above 1."
              }
            ]}
          />
          <DeckStatPanel 
            stats={[
              {
                title: "Actions",
                value: deckInfo.totalActions
              },
              {
                title: "Terminals",
                value: deckInfo.totalTerminals,
                tooltip: "Action cards which do not give extra actions.",
                valueStyle: { color: '#3f8600' }
              },
              {
                title: "Extra Actions",
                value: deckInfo.totalExtraActions,
                tooltip: "Every +Action above 1.",
              }
            ]}
          />
          <DeckStatPanel 
            stats={[
              {
                title: "Buys",
                value: deckInfo.totalBuys
              },
              {
                title: "Money",
                value: deckInfo.totalMoney
              },
              {
                title: "Money Density",
                value: deckInfo.totalMoney / deckInfo.numCards,
                tooltip: "Money divided by cards."
              },
              {
                title: "Effective Money Density",
                value: deckInfo.totalMoney / Math.max(1, deckInfo.totalStops - deckInfo.totalExtraDraw),
                tooltip: "Money divided by effective cards (stop cards - extra draw).",
              }
            ]}
          />
        </Row>
        <CardContainer
          cardNameList={deckInfo.cardNameList}
          style={{...style, 'backgroundColor': '#a0a0a0'}}
        />
      </Col>
    )
  })
  return (
    <Col style={style}>
      {playerDeckStats}
    </Col>
  )
}
