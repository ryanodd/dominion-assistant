import React, { ChangeEvent, useContext } from 'react'
import { Block, Col } from 'jsxstyle'
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
      + ((gameLog || returnPayload || error) ? '%0D%0A%0D%0A------%0D%0A%0D%0A' : '')
      + (gameLog ? `Log:%0D%0A${gameLog.replaceAll('\n', '%0D%0A')}%0D%0A%0D%0A` : '')
      + (returnPayload ? `Return:%0D%0A${JSON.stringify(returnPayload)}%0D%0A%0D%0A` : '')
      + (error ? `Error:%0D%0A${JSON.stringify(error)}%0D%0A%0D%0A` : '')
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
              marginTop: 6,
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
      <Block
        style={{
          marginTop: 12,
          marginBottom: '-1em',
        }}
      >
        <p>
          {'Something broken? '}
          <a
            href={mailReportUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Email me'}
          </a>
        </p>
      </Block>

    </Col>
  )
}

export default LogAnalyzer
