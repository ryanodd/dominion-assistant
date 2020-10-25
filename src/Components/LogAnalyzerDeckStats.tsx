import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckReportModel } from "../types";
import { CardContainer } from "./CardContainer";
import { NumberReport } from "./NumberReport";

interface LogAnalyzerDeckStatsProps {
  deckReportModels: DeckReportModel[]
  style?: {}
};

export const LogAnalyzerDeckStats: FunctionComponent<LogAnalyzerDeckStatsProps> = ({deckReportModels, style}) => {  
  let deckReportsToRender: JSX.Element[] = []
  
  deckReportModels.forEach((deckReportModel, i) => {
    deckReportsToRender.push(
      <Col
        key={i}
        marginTop={20}
      >
        <Row
          fontSize={18}
          fontWeight={700}
        >
        {deckReportModel.playerName}
        </Row>
        <Row
          marginTop={10}
          width='100%'
          flexWrap='wrap'
        >
          <NumberReport
            key={'card'}
            title={'Cards'}
            numberReportModel={deckReportModel.card}
          />
          <NumberReport
            key={'draws'}
            title={'Draw'}
            numberReportModel={deckReportModel.draws}
          />
          <NumberReport
            key={'stop'}
            title={'Stop Cards'}
            numberReportModel={deckReportModel.stop}
            tooltip={"Cards that don't draw more cards."}
          />
          <NumberReport
            key={'extraDraws'}
            title={'Extra Draw'}
            numberReportModel={deckReportModel.extraDraws}
            tooltip={"Every +Card above 1."}
          />
          <NumberReport
            key={'actions'}
            title={'Actions'}
            numberReportModel={deckReportModel.actions}
          />
          <NumberReport
            key={'terminal'}
            title={'Terminals'}
            numberReportModel={deckReportModel.terminal}
            tooltip={"Action cards which do not give extra actions."}
          />
          <NumberReport
            key={'extraActions'}
            title={'Extra Actions'}
            numberReportModel={deckReportModel.extraActions}
            tooltip={"Every +Action above 1."}
          />
          <NumberReport
            key={'buys'}
            title={'Buys'}
            numberReportModel={deckReportModel.buys}
          />
          <NumberReport
            key={'money'}
            title={'Money'}
            numberReportModel={deckReportModel.money}
          />
        </Row>
        <CardContainer
          cardNameList={deckReportModel.cardNameList}
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
      {deckReportsToRender}
    </Col>
  )
}
