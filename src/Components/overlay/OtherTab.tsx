import React, { ReactElement } from 'react'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import EmailButton from '../shared/EmailButton'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const OtherTab = (): ReactElement => {
  return (
    <Wrapper>
      <EmailButton white={true} />
    </Wrapper>
  )
}

export default OtherTab
