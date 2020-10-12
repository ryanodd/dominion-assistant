import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckInfo } from "../types";
import { CardContainer } from "./CardContainer";
import { DeckStat, DeckStatPanel } from "./DeckStatPanel";

interface LogAnalyzerDeckStatsProps {
  deckInfos: DeckInfo[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckInfos, style}) => {  
  let playerDeckStats: JSX.Element[] = []
  deckInfos.forEach((deckInfo, i) => {
    const deckStatPanelData: DeckStat[][] = [
      [
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
      ],
      [
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
      ],
      [
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
      ]
    ]
    
    let deckStatPanels: JSX.Element[] = []
    deckStatPanelData.forEach((panelData, j) => {
      let marginRightAmount = j === (deckStatPanelData.length - 1) ? 0 : 10
      deckStatPanels.push(
        <DeckStatPanel
          key={j}
          stats={panelData}
          style={{marginRight: marginRightAmount}}
        />
      )
    })
    playerDeckStats.push(
      <Col
        key={i}
        marginTop={20}
      >
        <Row
          fontSize={18}
          fontWeight={700}
        >
        {deckInfo.playerName}
        </Row>
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          {deckStatPanels}
        </Row>
        <CardContainer
          cardNameList={deckInfo.cardNameList}
          style={{
            'backgroundColor': 'white',
            'marginTop': 10 
          }}
        />
        <Row // Test row. Why does it fill the width of the column?
          backgroundColor='red'
          height={10}
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
