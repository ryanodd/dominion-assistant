import React, { ReactElement } from 'react'
import 'antd/dist/antd.css'
import { useTypedSelector } from '../../hooks'
import { CardList } from '../shared/CardList'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const DecklistTab = (): ReactElement => {
  const { deckReports } = useTypedSelector(state => state)
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default DecklistTab
