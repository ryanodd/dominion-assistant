import React, { ReactElement, useLayoutEffect } from 'react'
import { Col } from 'jsxstyle'
import 'antd/dist/antd.css'

import { MessageListenerService } from '../../Services/MessageListenerService'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import { throttledLogPasteRequest } from '../../api/logPasteRequest'
import DecklistTab from './DecklistTab'
import OtherTab from './OtherTab'
import OverlayTabs, { OverlayTabType } from './OverlayTabs'
import styled from 'styled-components'

const OverlayContent = styled.div`
  width: 100%;
  height: auto;
  overflow-y: auto;
`

const messageListenerService = new MessageListenerService()

// The styling on this is meant to be the first point of control,
// taking up the full viewport and being behind everything.
// It's the only thing that should use vw/vh?
const Overlay = (): ReactElement => {
  const { overlayActiveTab, error, gameLog } = useTypedSelector(state => state)
  const dispatch = useTypedDispatch()
  useLayoutEffect(() => {
    messageListenerService.setup(dispatch)
    return messageListenerService.destroy
  }, [])
  useLayoutEffect(() => {
    if (gameLog && !error) {
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
        backgroundColor='black'
      >
        <OverlayTabs />
        {
          error ? (
            <p
              style={{
                color: 'red',
              }}
            >
              {error}
            </p>
          ) : (
            <OverlayContent>
              {
                overlayActiveTab === OverlayTabType.DECKLISTS && (
                  <DecklistTab />
                )
              }
              {
                overlayActiveTab === OverlayTabType.OTHER && (
                  <OtherTab />
                )
              }
            </OverlayContent>
          )
        }
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
