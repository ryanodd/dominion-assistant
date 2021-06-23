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
  gameLog: string,
  returnPayload: Record<string, unknown>
  requesting: boolean
  error: string | null
}

const { TabPane } = Tabs

// This component is super stateful
export class LogAnalyzer extends React.Component<Record<string, unknown>, LogAnalyzerState> {

  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      deckReportModels: [],
      gameLog: '',
      returnPayload: {},
      requesting: false,
      error: null,
    }
  }

  sendRequest = (gameLog: string) => {
    this.setState({
      requesting: true,
    })
    RequestService.logPasteRequest(gameLog)
      .then((payload) => {
        this.setState({
          deckReportModels: payload.deckReports,
          returnPayload: payload,
          requesting: false,
          error: null,
        })
      })
      .catch((error) => {
        this.setState({
          deckReportModels: [],
          requesting: false,
          error: error
        })
      })
  }

  onSampleButtonClick = (event: any) => {
    this.sendRequest(SAMPLE_LOG_1)
  }

  onPaste = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      gameLog: event.target.value,
    })
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
          tip='Thinking...'
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
            {
              this.state.error &&
              (
                <p
                  style={{
                    color: 'red',
                  }}
                >
                  {this.state.error}
                </p>
              )
            }
          </Col>
        </Spin>
        {
          this.state.deckReportModels.length &&
          (
            <LogAnalyzerDeckStats deckReports={this.state.deckReportModels}/>
          )
        }
        <p>
          {'Something broken? '}
          <a href={`mailto:ryanodd@gmail.com?subject=Dominion%20Issue&amp;body=Log:\n${this.state.gameLog}\nReturn:\n${this.state.returnPayload}\n\n`}>
            {'Email me'}
          </a>
        </p>
      </Col>
    )
  }
}
