import React, { ReactElement } from 'react'
import 'antd/dist/antd.css'
import { useTypedDispatch, useTypedSelector } from '../../hooks'
import styled from 'styled-components'
import { SET_OVERLAY_ACTIVE_TAB } from '../../actions'
import { Spin } from 'antd'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

const TabButton = styled.button<{active: boolean}>`
  background-color: black;
  border: none;
  text-decoration: none;
  color: ${props => (props.active ? 'white' : 'gray')};
  cursor: pointer; // why was this not on by default?
`

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`

export enum OverlayTabType {
  DECKLISTS = 'decklists',
  OTHER = 'other',
}

const OverlayTabs = (): ReactElement => {
  const { overlayActiveTab, requesting } = useTypedSelector(state => state)
  const dispatch = useTypedDispatch()
  return (
    <Wrapper>

      <SpinnerWrapper>
        <Spin spinning={requesting} />
      </SpinnerWrapper>
      <TabButton
        active={overlayActiveTab === OverlayTabType.DECKLISTS}
        onClick={() => dispatch({type: SET_OVERLAY_ACTIVE_TAB, payload: OverlayTabType.DECKLISTS})}
      >
        {'Decklists'}
      </TabButton>
      <TabButton
        active={overlayActiveTab === OverlayTabType.OTHER}
        onClick={() => dispatch({type: SET_OVERLAY_ACTIVE_TAB, payload: OverlayTabType.OTHER})}
      >
        {'Other'}
      </TabButton>
    </Wrapper>
  )
}

export default OverlayTabs
