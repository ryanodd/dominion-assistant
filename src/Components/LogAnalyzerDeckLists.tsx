import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";
import { DeckInfo } from "../types";
import { CardContainer } from "./CardContainer";

interface LogAnalyzerDeckListsProps {
  deckInfos: DeckInfo[]
  style?: {}
};

export const LogAnalyzerDeckLists: FunctionComponent<LogAnalyzerDeckListsProps> = ({deckInfos, style}) => {  
  let deckListsToRender: JSX.Element[] = []
  deckInfos.forEach(deckInfo => {
    deckListsToRender.push(
      <Row fontSize={16}>
        {deckInfo.playerName}
        <CardContainer
          cardNameList={deckInfo.cardNameList}
          style={{...style, 'backgroundColor': '#a0a0a0'}}
        />
      </Row>
    )
  })
  return (
    <Col style={style}>
      {deckListsToRender} 
    </Col>
  )
}
