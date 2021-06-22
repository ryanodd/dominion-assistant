import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { CardListReportModel, DeckReportModel, NumberReportModel } from "../types";
import { CardContainer } from "./CardContainer";
import { NumberReport } from "./NumberReport";
import { CardListReport } from "./CardListReport";
import { Divider } from "antd";

interface CardListReportEntry {
  title: string
  fieldName: string
  tooltip?: string
}

interface NumberReportEntry {
  title: string
  fieldName: string
  tooltip?: string
  precision?: number
}

interface LogAnalyzerDeckStatsProps {
  deckReports: DeckReportModel[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckReports, style}) => {  
  
  let cardListReportTemplate = [
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

  let numberReportTemplate = [
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
      title: 'Effective Money Density',
      fieldName: 'effectiveMoneyDensity',
      tooltip: 'Money / (Cards - Draw)',
      precision: 2
    }
  ]

  let deckReportsToRender: JSX.Element[] = []
  deckReports.forEach((deckReport, i) => {
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
          {deckReport.playerName}
        </Row>
        <CardContainer
          cardNameList={deckReport.cardNameList}
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
          {deckReport.cardListReports && renderCardListReport(cardListReportTemplate, deckReport.cardListReports)}
        </Row>
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          {deckReport.numberReports && renderNumberReport(numberReportTemplate, deckReport.numberReports)}
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

function renderCardListReport(cardListReportTemplate: CardListReportEntry[], cardListReports: Map<string, CardListReportModel>) {
  let reportElements: JSX.Element[] = []
  let defaultModel = {value: [], messages: []} as CardListReportModel
  cardListReportTemplate.forEach((data, i) => {
    let cardListReportMap = new Map(Object.entries(cardListReports))
    let reportModel = cardListReportMap.get(data.fieldName) || defaultModel
    if (reportModel.value.length !== 0) {
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

function renderNumberReport(numberReportTemplate: NumberReportEntry[], numberReports: Map<string, NumberReportModel>) {
  let reportElements: JSX.Element[] = []
  let defaultModel = {value: -1, messages: []} as NumberReportModel
  numberReportTemplate.forEach((data, i) => {
    let numberReportTemplateReportMap = new Map(Object.entries(numberReports)) // need to do this because of ts?
    let reportModel = numberReportTemplateReportMap.get(data.fieldName) || defaultModel
    if (reportModel.value !== -1) {
      reportElements.push(
        <NumberReport
          key={i}
          title={data['title']}
          numberReportModel={reportModel}
          tooltip={data['tooltip']}
          precision={data['precision']}
          style={{'marginRight': 40}}
        />
      )
    }
  });
  return reportElements;
}
