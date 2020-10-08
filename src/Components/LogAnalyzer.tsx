import React, { ChangeEvent } from 'react';
import { Card } from './Card';
import cardNames from '../allCardNames';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { AutoComplete, Divider, Button } from 'antd';
import { OptionType, LabeledValue } from 'antd/lib/select';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';

interface LogAnalyzerProps {
  //code related to your props goes here
}

interface LogAnalyzerState {
  logStr: string;
  deck1List: string[];
  deck2List: string[];
}

export class LogAnalyzer extends React.Component<LogAnalyzerProps, LogAnalyzerState> {

  constructor(props: Object) {
    super(props);
    this.state = {
      logStr: '',
      deck1List: [],
      deck2List: [],
    }
    //init state
  }

  pasteCallback = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      logStr: event.target.value,
      deck1List: ['Estate', 'Estate', 'Council_Room'],
      deck2List: ['Chapel'],
    });
    console.log('pasted!')
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
