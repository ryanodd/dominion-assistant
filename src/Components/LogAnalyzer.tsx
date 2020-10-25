import React, { ChangeEvent } from 'react';
import { Col } from 'jsxstyle';
import { RequestService } from '../Services/RequestService';
import { PasteLogBox } from './PasteLogBox';
import { Tabs } from 'antd';
import { DeckReportModel } from '../types';
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats';

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

  pasteCallback = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: start loading animation
    RequestService.logPasteRequest(event.target.value)
    .then((payload) => {
      console.log(payload)
      this.setState({
        deckReportModels: payload.deckReports,
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
            <LogAnalyzerDeckStats deckReportModels={this.state.deckReportModels}/>
          {/* </TabPane>
        </Tabs> */}
      </Col>
    );
  }
}
