import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckReport } from "../types";
import { CardContainer } from "./CardContainer";
import { DeckStat, DeckStatPanel } from "./DeckStatPanel";

interface LogAnalyzerDeckStatsProps {
  deckReports: DeckReport[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckReports, style}) => {  
  let playerDeckStats: JSX.Element[] = []
  
  deckReports.forEach((deckReport, i) => {
    const deckStatPanelData: DeckStat[][] = [
      [
        {
          title: "Cards",
          fieldName: "card"
        },
        {
          title: "Draw",
          fieldName: "card"
        },
        {
          title: "Stop Cards",
          fieldName: "card",
          tooltip: "Cards that don't draw more cards."
        },
        {
          title: "Extra Draw",
          fieldName: "card",
          tooltip: "Every +Card above 1.",
        }
      ],
      [
        {
          title: "Actions",
          fieldName: "card"
        },
        {
          title: "Terminals",
          fieldName: "card",
          tooltip: "Action cards which do not give extra actions."
          // valueStyle: { color: '#d06060' }
        },
        {
          title: "Extra Actions",
          fieldName: "card",
          tooltip: "Every +Action above 1."
        }
      ],
      [
        {
          title: "Buys",
          fieldName: "card"
        },
        {
          title: "Money",
          fieldName: "card"
        },
        {
          title: "Money Density",
          value: deckReport.numberReports.money.value / deckReport.numberReports.card.value,
          tooltip: "Money divided by cards.",
          messageFieldNames: ['money', 'card'],
          precision: 2
        },
        {
          title: "Effective Money Density",
          value: deckReport.numberReports.money.value / Math.max(1, deckReport.numberReports.stop.value - deckReport.numberReports.extraDraws.value),
          tooltip: "Money divided by effective cards (stop cards - extra draws).",
          messageFieldNames: ['money', 'stop', 'extraDraws'],
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
        {deckReport.playerName}
        </Row>
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          {deckStatPanels}
        </Row>
        <CardContainer
          cardNameList={deckReport.cardNameList}
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
