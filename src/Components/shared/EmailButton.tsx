import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useTypedSelector } from '../../hooks'

const Message = styled.p<{white: boolean}>`
  margin: 0;
  color: ${props => (props.white ? 'white' : 'black')};
`

export type EmailButtonProps = {
  white?: boolean
}

const EmailButton = ({white = false}: EmailButtonProps): ReactElement => {
  const { error, gameLog, returnPayload } = useTypedSelector(state => state)

  const mailReportUrl = () => {
    return (
      'mailto:ryanodd@gmail.com'
      + '?subject=Dominion%20Tracker%20Issue'
      + '&body='
      + ((gameLog || returnPayload || error) ? '%0D%0A%0D%0A%2D%2D%2D%2D%2D%2D%0D%0A%0D%0A' : '')
      + (gameLog ? `Log:%0D%0A${gameLog}%0D%0A%0D%0A` : '')
      + (returnPayload ? `Return:%0D%0A${JSON.stringify(returnPayload)}%0D%0A%0D%0A` : '')
      + (error ? `Error:%0D%0A${JSON.stringify(error)}%0D%0A%0D%0A` : '')
    )
  }

  return (
    <Message white={white}>
      {'Got feedback? Something broken? '}
      <a
        href={mailReportUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Email me'}
      </a>
    </Message>
  )
}

export default EmailButton
