import React, { ChangeEvent } from 'react';
import { Col } from 'jsxstyle';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';
import { Divider, Tabs } from 'antd';
import { DeckInfo } from '../types';
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats';

interface LogAnalyzerProps {
  //code related to your props goes here
}

interface LogAnalyzerState {
  deckInfos: DeckInfo[]
}

const { TabPane } = Tabs;

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

  render(): any {
    return(
      <Col
        padding={20}
        borderRadius={6}
        alignItems='stretch'
        style={{'backgroundColor': '#e0e0e0'}}
      >
        <PasteLogBox
          pasteCallback={this.pasteCallback}
        />
        {/* <Tabs type="card">
          <TabPane tab="Deck Stats" key="1"> */}
            <LogAnalyzerDeckStats deckInfos={this.state.deckInfos}/>
          {/* </TabPane>
        </Tabs> */}
        <Divider/>
        
      </Col>
    );
  }
}
