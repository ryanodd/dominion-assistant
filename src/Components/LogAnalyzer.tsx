import React, { ChangeEvent } from 'react';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';

interface LogAnalyzerProps {
  //code related to your props goes here
}

interface LogAnalyzerState {
  deck1List: string[];
  deck2List: string[];
}

// This component is super stateful
export class LogAnalyzer extends React.Component<LogAnalyzerProps, LogAnalyzerState> {

  constructor(props: Object) {
    super(props);
    this.state = {
      deck1List: [],
      deck2List: [],
    }
    //init state
  }

  pasteCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // start loading animation
    RequestService.logPasteRequest(event.target.value)
    .then((payload) => {
      this.setState({
        deck1List: payload.deck1List,
        deck2List: payload.deck2List,
      });
    })
    .catch(() => {
      console.log("ERROR!!!!!!!!! logPasteRequest failed")
    })

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
        <Row fontSize={16}>
          {'Deck 1'}
        </Row>
        <CardContainer
          cardNameList={this.state.deck1List}
          style={{'backgroundColor': '#a0a0a0'}}
        />
        <Row fontSize={16}>
          {'Deck 2'}
        </Row>
        <CardContainer
          cardNameList={this.state.deck2List}
          style={{'backgroundColor': '#a0a0a0'}}
        />
      </Col>
    );
  }
}
