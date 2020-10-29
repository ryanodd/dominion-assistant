import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckReportModel } from "../types";
import { CardContainer } from "./CardContainer";
import { NumberReport } from "./NumberReport";
import { CardListReport } from "./CardListReport";

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
          <CardListReport
            key={'gain'}
            title={'Gain'}
            cardListReportModel={deckReportModel.doesGain}
            style={{'marginLeft': 20}}
          />
          <CardListReport
            key={'trash'}
            title={'Trash'}
            cardListReportModel={deckReportModel.doesTrash}
            style={{'marginLeft': 20}}
          />
          <CardListReport
            key={'attack'}
            title={'Attack'}
            cardListReportModel={deckReportModel.isAttack}
            style={{'marginLeft': 20}}
          />
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
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'draws'}
            title={'Draw'}
            numberReportModel={deckReportModel.draws}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'stop'}
            title={'Stop Cards'}
            numberReportModel={deckReportModel.stop}
            tooltip={"Cards that don't draw more cards."}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'extraDraws'}
            title={'Extra Draw'}
            numberReportModel={deckReportModel.extraDraws}
            tooltip={"Every +Card above 1."}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'actions'}
            title={'Actions'}
            numberReportModel={deckReportModel.actions}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'terminal'}
            title={'Terminals'}
            numberReportModel={deckReportModel.terminal}
            tooltip={"Action cards which do not give extra actions."}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'extraActions'}
            title={'Extra Actions'}
            numberReportModel={deckReportModel.extraActions}
            tooltip={"Every +Action above 1."}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'buys'}
            title={'Buys'}
            numberReportModel={deckReportModel.buys}
            style={{'marginLeft': 20}}
          />
          <NumberReport
            key={'money'}
            title={'Money'}
            numberReportModel={deckReportModel.money}
            style={{'marginLeft': 20}}
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
