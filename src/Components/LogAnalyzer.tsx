import React, { ChangeEvent } from 'react';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';
import { Divider } from 'antd';

interface LogAnalyzerProps {
  //code related to your props goes here
}

interface DeckInfo {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]
  numCards: number
  totalMoney: number
  totalStops: number
  totalDraw: number
  totalTerminals: number
  totalVillages: number
}

interface LogAnalyzerState {
  deckInfos: DeckInfo[]
}

// This component is super stateful
export class LogAnalyzer extends React.Component<LogAnalyzerProps, LogAnalyzerState> {

  constructor(props: Object) {
    super(props);
    this.state = {
      deckInfos: [],
    }
  }

  pasteCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: start loading animation
    RequestService.logPasteRequest(event.target.value)
    .then((payload) => {
      this.setState({
        deckInfos: payload.deckInfos,
      });
    })
    .catch(() => {
      console.log("ERROR!!!!!!!!! logPasteRequest failed")
    })
  }

  renderDeckInfos = () => {
    deckInfosToRender = []
    deckInfosToRender += 
      <Row fontSize={16}>
      {'Deck 2'}
      <CardContainer
        cardNameList={this.state.deck2List}
        style={{'backgroundColor': '#a0a0a0'}}
      />
      </Row>
    return deckInfosToRender
  }

  render(): any {
    return(
      <Col
        padding={20}
        borderRadius={6}
        alignItems='stretch'
        style={{'backgroundColor': '#c0c0c0'}}
      >
        <PasteLogBox
          pasteCallback={this.pasteCallback}
        />
        <Divider/>
        {this.renderDeckInfos()}
      </Col>
    );
  }
}
