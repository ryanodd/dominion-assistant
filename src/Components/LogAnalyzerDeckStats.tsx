import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { CardListReportModel, DeckReportModel, NumberReportModel } from "../types";
import { CardContainer } from "./CardContainer";
import { NumberReport } from "./NumberReport";
import { CardListReport } from "./CardListReport";
import { Divider } from "antd";

interface CardListReportData {
  title: string
  fieldName: string
  tooltip?: string
}

interface CardListReportData {
  title: string
  fieldName: string
  tooltip?: string
}

interface NumberReportData {
  title: string
  fieldName: string
  tooltip?: string
}

interface LogAnalyzerDeckStatsProps {
  deckReportModels: DeckReportModel[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckReportModels, style}) => {  
  
  let cardListReportData = [
    {
      title: 'Gain',
      fieldName: 'doesGain',
    },
    {
      title: 'Trash',
      fieldName: 'doesTrash',
    },
    {
      title: 'Attack',
      fieldName: 'isAttack',
    },
  ]

  let numberReportData = [
    {
      title: 'Cards',
      fieldName: 'card',
    },
    {
      title: 'Draw',
      fieldName: 'draws',
    },
    {
      title: 'Stop Cards',
      fieldName: 'stops',
      tooltip: 'Cards that don\'t draw more cards.'
    },
    {
      title: 'Extra Draw',
      fieldName: 'extraDraws',
      tooltip: 'Every +Card above 1.'
    },
    {
      title: 'Actions',
      fieldName: 'actions'
    },
    {
      title: 'Terminals',
      fieldName: 'terminal',
      tooltip: 'Action cards which do not give extra actions.'
    },
    {
      title: 'Extra Actions',
      fieldName: 'extraActions',
      tooltip: 'Every +Action above 1.'
    },
    {
      title: 'Buys',
      fieldName: 'buys',
    },
    {
      title: 'Money',
      fieldName: 'money',
    },
    {
      title: 'Effective Stops',
      fieldName: 'effectiveStops',
      tooltip: 'Extra Draw - Stop Cards'
    },
    {
      title: 'Effective Money Density',
      fieldName: 'effectiveMoneyDensity',
      tooltip: 'Money / Effective Stops'
    }
  ]

  let deckReportsToRender: JSX.Element[] = []
  deckReportModels.forEach((deckReportModel, i) => {
    deckReportsToRender.push(
      <Col
        key={i}
        marginTop={20}
      >
        {i !== 0 && <Divider/>}
        <Row
          fontSize={22}
          fontWeight={700}
        >
          {deckReportModel.playerName}
        </Row>
        <CardContainer
          cardNameList={deckReportModel.cardNameList}
          style={{
            'backgroundColor': 'white',
            'marginTop': 10 
          }}
        />
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          {renderFromCardListReportData(cardListReportData, deckReportModel)}
        </Row>
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          {renderFromNumberReportData(numberReportData, deckReportModel)}
        </Row>
        {/* <Row // Test row. Why does it fill the width of the column?
          backgroundColor='red'
          height={10}
        /> */}
      </Col>
    )
  })
  return (
    <Col style={style}>
      {deckReportsToRender}
    </Col>
  )
}

function renderFromCardListReportData(cardListReportData: CardListReportData[], deckReportModel: DeckReportModel) {
  let reportElements: JSX.Element[] = []
  let defaultModel = {value: [], messages: []} as CardListReportModel
  cardListReportData.forEach((data, i) => {
    let cardListReportMap = new Map(Object.entries(deckReportModel.cardListReports))
    let reportModel = cardListReportMap.get(data.fieldName) || defaultModel
    if (reportModel.value.length != 0) {
      reportElements.push(
        <CardListReport
          key={i}
          title={data['title']}
          cardListReportModel={reportModel}
          tooltip={data['tooltip']}
          style={{'marginRight': 40}}
        />
      )
    }
  });
  return reportElements;
}

function renderFromNumberReportData(numberReportData: NumberReportData[], deckReportModel: DeckReportModel) {
  let reportElements: JSX.Element[] = []
  let defaultModel = {value: -1, messages: []} as NumberReportModel
  numberReportData.forEach((data, i) => {
    let numberReportDataReportMap = new Map(Object.entries(deckReportModel.numberReports)) // need to do this because of ts?
    let reportModel = numberReportDataReportMap.get(data.fieldName) || defaultModel
    if (reportModel.value != -1) {
      reportElements.push(
        <NumberReport
          key={i}
          title={data['title']}
          numberReportModel={reportModel}
          tooltip={data['tooltip']}
          style={{'marginRight': 40}}
        />
      )
    }
  });
  return reportElements;
}