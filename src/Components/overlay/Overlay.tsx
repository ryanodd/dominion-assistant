import React, { ReactElement, useLayoutEffect } from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'

import { MessageListenerService } from '../../Services/MessageListenerService'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import { LogAnalyzerDeckStats } from '../trackerPage/LogAnalyzerDeckStats'
import { throttledLogPasteRequest } from '../../api/logPasteRequest'
import { Spin } from 'antd'

const messageListenerService = new MessageListenerService()

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
const Overlay = (): ReactElement => {
  const { deckReports, requesting, error, gameLog, returnPayload } = useTypedSelector(state => state)
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
      <Col
        position='fixed'
        width='100%'
        height='100%'
        padding='10px'
        backgroundColor='#aaaaaac0'
        border='4px solid white'
        borderRadius='8px'
        overflowX='auto'
      >
        {
          !!deckReports?.length &&
            <LogAnalyzerDeckStats deckReports={deckReports}/>
        }
        <Col
          position='absolute'
          bottom='10px'
          left='10px'
        >
          <Spin spinning={requesting}/>
        </Col>
      </Col>
      
      <style>{`
        body {
          background-color: transparent;
        }
      `}</style>
    </>
  )
}

export default Overlay
