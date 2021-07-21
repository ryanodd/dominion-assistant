import React, { FunctionComponent } from 'react'
import { Row, Col } from 'jsxstyle'
import { CardListReportModel, DeckReportModel, NumberReportModel } from '../../types'
import { CardContainer } from '../shared/CardContainer'
import { NumberReport } from '../shared/NumberReport'
import { CardListReport } from '../shared/CardListReport'

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
  style?: Record<string, unknown>
}

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckReports, style}: LogAnalyzerDeckStatsProps) => {  
  
  const cardListReportTemplate = [
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

  const numberReportTemplate = [
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

  const deckReportsToRender: JSX.Element[] = []
  deckReports.forEach((deckReport, i) => {
    deckReportsToRender.push(
      <Col
        key={i}
        marginTop={6}
      >
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
            'marginTop': 6 
          }}
        />
        {
          deckReport.cardListReports &&
            <Row
              marginTop={6}
              width='100%'
              flexWrap='wrap'
            >
              {renderCardListReport(cardListReportTemplate, deckReport.cardListReports)}
            </Row>
        }
        {
          deckReport.numberReports &&
            <Row
              marginTop={6}
              width='100%'
              flexWrap='wrap'
            >
              { renderNumberReport(numberReportTemplate, deckReport.numberReports)}
            </Row>
        }
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
  const reportElements: JSX.Element[] = []
  const defaultModel = {value: [], messages: []} as CardListReportModel
  cardListReportTemplate.forEach((data, i) => {
    const cardListReportMap = new Map(Object.entries(cardListReports))
    const reportModel = cardListReportMap.get(data.fieldName) || defaultModel
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
  })
  return reportElements
}

function renderNumberReport(numberReportTemplate: NumberReportEntry[], numberReports: Map<string, NumberReportModel>) {
  const reportElements: JSX.Element[] = []
  const defaultModel = {value: -1, messages: []} as NumberReportModel
  numberReportTemplate.forEach((data, i) => {
    const numberReportTemplateReportMap = new Map(Object.entries(numberReports)) // need to do this because of ts?
    const reportModel = numberReportTemplateReportMap.get(data.fieldName) || defaultModel
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
  })
  return reportElements
}
