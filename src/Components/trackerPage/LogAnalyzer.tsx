import React, { ChangeEvent, ReactElement } from 'react'
import { Col, Row } from 'jsxstyle'
import { PasteLogBox } from './PasteLogBox'
import { Button, Spin } from 'antd'
import SAMPLE_LOG_1 from '../../sampleLogs/sample1'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import { throttledLogPasteRequest } from '../../api/logPasteRequest'
import EmailButton from '../shared/EmailButton'
import PasteInstructions from './PasteInstructions'
import styled from 'styled-components'
import { CardList } from '../shared/CardList'

const PasteInstructionsWrapper = styled.div`
  margin-bottom: 18px;
`

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
      position='relative'
      padding={20}
      borderRadius={6}
      alignItems='stretch'
      box-shadow='0px 0px 10px 0px rgba(0,0,0,0.4)'
      style={{'backgroundColor': '#e0e0e0d0'}}
    >
      <Spin
        spinning={requesting}
        tip='Thinking...'
      >
        <Col>
          {
            !deckReports?.length && (
              <PasteInstructionsWrapper>
                <PasteInstructions />
              </PasteInstructionsWrapper>
            )
          }
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
          // <LogAnalyzerDeckStats deckReports={deckReports}/>
          <CardList
            cardLists={
              deckReports.map(report => ({
                title: report.playerName ?? report.playerInitial,
                cardNameList: report.cardNameList,
              }))
            }
          />
      }
      <Row
        marginTop='18px'
      >
        <EmailButton />
      </Row>

    </Col>
  )
}

export default LogAnalyzer
