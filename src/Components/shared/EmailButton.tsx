import React, { ReactElement } from 'react'
import { useTypedSelector } from '../../hooks'

const EmailButton = (): ReactElement => {
  const { error, gameLog, returnPayload } = useTypedSelector(state => state)

  const mailReportUrl = () => {
    return (
      'mailto:ryanodd@gmail.com'
      + '?subject=Dominion%20Issue'
      + '&body='
      + ((gameLog || returnPayload || error) ? '%0D%0A%0D%0A%2D%2D%2D%2D%2D%2D%0D%0A%0D%0A' : '')
      + (gameLog ? `Log:%0D%0A${gameLog}%0D%0A%0D%0A` : '')
      + (returnPayload ? `Return:%0D%0A${JSON.stringify(returnPayload)}%0D%0A%0D%0A` : '')
      + (error ? `Error:%0D%0A${JSON.stringify(error)}%0D%0A%0D%0A` : '')
    )
  }

  return (
    <p>
      {'Got feedback? Something broken? '}
      <a
        href={mailReportUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Email me'}
      </a>
    </p>
  )
}

export default EmailButton
