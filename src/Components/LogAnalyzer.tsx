import React, { ChangeEvent } from 'react'
import { Col } from 'jsxstyle'
import { RequestService } from '../Services/RequestService'
import { PasteLogBox } from './PasteLogBox'
import { Button, Spin, Tabs } from 'antd'
import { DeckReportModel } from '../types'
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats'
import SAMPLE_LOG_1 from '../sampleLogs/sample1'


interface LogAnalyzerState {
  deckReportModels: DeckReportModel[]
  requesting: boolean
}

const { TabPane } = Tabs

// This component is super stateful
export class LogAnalyzer extends React.Component<Record<string, unknown>, LogAnalyzerState> {

  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      deckReportModels: [],
      requesting: false,
    }
  }

  sendRequest = (gameLog: string) => {
    this.setState({
      requesting: true,
    })
    RequestService.logPasteRequest(gameLog)
      .then((payload) => {
        console.log(payload)
        this.setState({
          deckReportModels: payload.deckReports,
          requesting: false,
        })
      })
      .catch(() => {
        console.log('ERROR!!!!!!!!! Request failed')
      })
  }

  onSampleButtonClick = (event: any) => {
    this.sendRequest(SAMPLE_LOG_1)
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
        <Spin
          spinning={this.state.requesting}
          tip='Your first try might take some time to spin up...'
        >
          <Col>
            <PasteLogBox
              pasteCallback={this.onPaste}
            />
            <Button
              type='primary'
              onClick={this.onSampleButtonClick}
              style={{
                borderRadius: 5,
                marginTop: 10,
                alignSelf: 'flex-end',
                width: 160
              }}
            >
              ...or try an example
            </Button>
          </Col>
        </Spin>
        {/* <Tabs type="card">
          <TabPane tab="Deck Stats" key="1"> */}
        <LogAnalyzerDeckStats deckReports={this.state.deckReportModels}/>
        {/* </TabPane>
        </Tabs> */}
      </Col>
    )
  }
}
