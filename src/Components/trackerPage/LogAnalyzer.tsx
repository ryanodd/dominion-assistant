import React, { ChangeEvent, ReactElement } from 'react'
import { Block, Col } from 'jsxstyle'
import { PasteLogBox } from './PasteLogBox'
import { Button, Spin } from 'antd'
import { LogAnalyzerDeckStats } from './LogAnalyzerDeckStats'
import SAMPLE_LOG_1 from '../../sampleLogs/sample1'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import { throttledLogPasteRequest } from '../../api/logPasteRequest'
import EmailButton from '../shared/EmailButton'

const LogAnalyzer = (): ReactElement => {
  const dispatch = useTypedDispatch()
  const { deckReports, requesting, error } = useTypedSelector(state => state)

  const onSampleButtonClick = () => {
    throttledLogPasteRequest(SAMPLE_LOG_1, dispatch)
  }

  const onPaste = (event: ChangeEvent<HTMLTextAreaElement>) => {
    throttledLogPasteRequest(event.target.value, dispatch)
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
        !!deckReports?.length &&
          <LogAnalyzerDeckStats deckReports={deckReports}/>
      }
      <Block
        style={{
          marginTop: 12,
          marginBottom: '-1em',
        }}
      >
        <EmailButton />
      </Block>

    </Col>
  )
}

export default LogAnalyzer
