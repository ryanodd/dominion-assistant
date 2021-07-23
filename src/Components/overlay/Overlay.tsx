import React, { ReactElement, useLayoutEffect } from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'

import { MessageListenerService } from '../../Services/MessageListenerService'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import { throttledLogPasteRequest } from '../../api/logPasteRequest'
import { Spin } from 'antd'
import EmailButton from '../shared/EmailButton'
import { CardList } from '../shared/CardList'

const messageListenerService = new MessageListenerService()

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
const Overlay = (): ReactElement => {
  const { deckReports, requesting, error, gameLog } = useTypedSelector(state => state)
  const dispatch = useTypedDispatch()
  useLayoutEffect(() => {
    messageListenerService.setup(dispatch)
    return messageListenerService.destroy
  }, [])
  useLayoutEffect(() => {
    if (gameLog) {
      throttledLogPasteRequest(gameLog, dispatch)
    }
  }, [gameLog])
  return (
    <>
      <Spin spinning={requesting}>
        <Col
          position='fixed'
          width='100%'
          height='100%'
          padding='10px'
          backgroundColor='#aaaaaac0'
          border='4px solid white'
          borderRadius='8px'
        >
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
          <EmailButton />
        </Col>
      </Spin>
      <style>{`
        body {
          background-color: transparent;
        }
      `}</style>
    </>
  )
}

export default Overlay
