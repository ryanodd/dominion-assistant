import React, { ChangeEvent, useContext } from 'react'
import { Col } from 'jsxstyle'
import { RequestService } from '../Services/RequestService'
import { PasteLogBox } from './PasteLogBox'
import { Button, Spin } from 'antd'
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats'
import SAMPLE_LOG_1 from '../sampleLogs/sample1'
import { useTypedDispatch, useTypedSelector } from '../hooks'

const LogAnalyzer = () => {
  const dispatch = useTypedDispatch()
  const { deckReports, requesting, error, gameLog, returnPayload } = useTypedSelector(state => state)

  const onSampleButtonClick = (event: any) => {
    RequestService.logPasteRequest(SAMPLE_LOG_1, dispatch)
  }

  const onPaste = (event: ChangeEvent<HTMLTextAreaElement>) => {
    RequestService.logPasteRequest(event.target.value, dispatch)
  }

  const mailReportUrl = () => {
    return (
      'mailto:ryanodd@gmail.com'
      + '?subject=Dominion%20Issue'
      + '&body='
      + (gameLog ? `Log:\n${gameLog}\n\n` : '')
      + (returnPayload ? `Return:\n${JSON.stringify(returnPayload)}\n\n` : '')
      + (error ? `Error:\n${JSON.stringify(error)}\n\n` : '')
    )
  }

  return (
    <Col
      padding={20}
      borderRadius={6}
      alignItems='stretch'
      style={{'backgroundColor': '#e0e0e0'}}
    >
      <Spin
        spinning={requesting}
        tip='Thinking...'
      >
        <Col>
          <PasteLogBox
            pasteCallback={onPaste}
          />
          <Button
            type='primary'
            onClick={onSampleButtonClick}
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
            error &&
            (
              <p
                style={{
                  color: 'red',
                }}
              >
                {error}
              </p>
            )
          }
        </Col>
      </Spin>
      {
        !!deckReports.length &&
          <LogAnalyzerDeckStats deckReports={deckReports}/>
      }
      <p>
        {'Something broken? '}
        <a href={mailReportUrl()}>
          {'Email me'}
        </a>
      </p>
    </Col>
  )
}

export default LogAnalyzer
