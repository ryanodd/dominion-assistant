import React, { ChangeEvent } from 'react';
import { Col } from 'jsxstyle';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';
import { Button, Tabs } from 'antd';
import { DeckReportModel } from '../types';
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats';
import SAMPLE_LOG_1 from '../sampleLogs/sample1';
import SAMPLE_LOG_2 from '../sampleLogs/sample2';

interface LogAnalyzerProps {
  //code related to your props goes here
}

interface LogAnalyzerState {
  deckReportModels: DeckReportModel[]
}

const { TabPane } = Tabs;

// This component is super stateful
export class LogAnalyzer extends React.Component<LogAnalyzerProps, LogAnalyzerState> {

  constructor(props: Object) {
    super(props);
    this.state = {
      deckReportModels: [],
    }
  }

  sendRequest = (gameLog: string) => {
    // TODO: start loading animation
    RequestService.logPasteRequest(gameLog)
    .then((payload) => {
      console.log(payload)
      this.setState({
        deckReportModels: payload.deckReports,
      });
    })
    .catch(() => {
      console.log("ERROR!!!!!!!!! Request failed")
    })
  }

  onSampleButtonClick = (event: any) => {
    this.sendRequest(SAMPLE_LOG_2)
  }

  onPaste = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.sendRequest(event.target.value)
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
          pasteCallback={this.onPaste}
        />
        <Button
          type='primary'
          onClick={this.onSampleButtonClick}
          style={{
            borderRadius: 5,
            alignSelf: 'flex-end',
            marginTop: 10,
            width: 160
          }}
        >
          ...or try an example
        </Button>
        {/* <Tabs type="card">
          <TabPane tab="Deck Stats" key="1"> */}
            <LogAnalyzerDeckStats deckReportModels={this.state.deckReportModels}/>
          {/* </TabPane>
        </Tabs> */}
      </Col>
    );
  }
}
