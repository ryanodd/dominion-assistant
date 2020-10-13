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
          value: deckInfo.numCards.value,
          messages: deckInfo.numCards.messages
        },
        {
          title: "Draw",
          value: deckInfo.totalDraws.value,
          messages: deckInfo.totalDraws.messages
        },
        {
          title: "Stop Cards",
          value: deckInfo.totalStops.value,
          tooltip: "Cards that don't draw more cards.",
          messages: deckInfo.totalStops.messages
        },
        {
          title: "Extra Draw",
          value: deckInfo.totalExtraDraws.value,
          tooltip: "Every +Card above 1.",
          messages: deckInfo.totalExtraDraws.messages
        }
      ],
      [
        {
          title: "Actions",
          value: deckInfo.totalActions.value,
          messages: deckInfo.totalActions.messages
        },
        {
          title: "Terminals",
          value: deckInfo.totalTerminals.value,
          tooltip: "Action cards which do not give extra actions.",
          messages: deckInfo.totalTerminals.messages,
          // valueStyle: { color: '#d06060' }
        },
        {
          title: "Extra Actions",
          value: deckInfo.totalExtraActions.value,
          messages: deckInfo.totalExtraActions.messages,
          tooltip: "Every +Action above 1.",
        }
      ],
      [
        {
          title: "Buys",
          value: deckInfo.totalBuys.value,
          messages: deckInfo.totalBuys.messages
        },
        {
          title: "Money",
          value: deckInfo.totalMoney.value,
          messages: deckInfo.totalMoney.messages
        },
        {
          title: "Money Density",
          value: deckInfo.totalMoney.value / deckInfo.numCards.value,
          tooltip: "Money divided by cards.",
          messages: deckInfo.totalMoney.messages.concat(deckInfo.numCards.messages),
          precision: 2
        },
        {
          title: "Effective Money Density",
          value: deckInfo.totalMoney.value / Math.max(1, deckInfo.totalStops.value - deckInfo.totalExtraDraws.value),
          tooltip: "Money divided by effective cards (stop cards - extra draws).",
          messages: deckInfo.totalMoney.messages.concat(deckInfo.totalStops.messages.concat(deckInfo.totalExtraDraws.messages)),
          precision: 2
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
        {/* <Row // Test row. Why does it fill the width of the column?
          backgroundColor='red'
          height={10}
        /> */}
      </Col>
    )
  })
  return (
    <Col style={style}>
      {playerDeckStats}
    </Col>
  )
}
