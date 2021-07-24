import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { CompactCard } from './CompactCard'

const Wrapper = styled.div`
  width: min-content;
  overflow: hidden;
  display: flex;

  > :not(:last-child) {
    margin-right: 2px;
  }
`

const PlayerList = styled.div<{columnWidth: number}>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.columnWidth)}px;
  > :not(:last-child) {
    margin-bottom: 1px;
  }
`

const PlayerTitle = styled.h3`
  flex-shrink: 0;

  margin: 0;
  font-size: 14px;
  color: white;
  text-shadow: 1px 1px 1px black, 1px -1px 1px black, -1px 1px 1px black, -1px -1px 1px black;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  
  background-color: #1d2931;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

interface CardListProps {
  cardLists: {
    title: string
    cardNameList: string[]
  }[]
  columnWidth?: number
}

export const CardList: FunctionComponent<CardListProps> = ({cardLists, columnWidth = 160}: CardListProps) => {

  // For each player, an ordered map of cardNames to quantities
  const cardQuantitiesByPlayer: {
    titles: string[],
    cardQuantities: {[index: string]: number[]}
  } = {
    titles: [],
    cardQuantities: {
      'Colony': [],
      'Province': [],
      'Duchy': [],
      'Estate': [],
      'Copper': [],
      'Silver': [],
      'Gold' : [],
      'Platinum': [],
      'Curse': [],
    }
  }

  cardLists.forEach((cardList, i) => {
    cardQuantitiesByPlayer.titles.push(cardList.title)
    cardList.cardNameList.forEach(name => {
      const countList = cardQuantitiesByPlayer.cardQuantities[name] ?? []
      while(countList.length < cardLists.length) {
        countList.push(0) // fill for all players
      }
      countList[i] = (cardQuantitiesByPlayer.cardQuantities[name]?.[i]+1) || 1
      cardQuantitiesByPlayer.cardQuantities[name] = countList
    })
  })

  console.log(cardQuantitiesByPlayer)

  return (
    <Wrapper>
      {
        cardLists.map((_, i) => 
          <PlayerList key={i} columnWidth={columnWidth}>
            <PlayerTitle>
              {cardQuantitiesByPlayer.titles[i]}
            </PlayerTitle>
            {
              Object.keys(cardQuantitiesByPlayer.cardQuantities).map(name =>
                <>
                  {
                    !!cardQuantitiesByPlayer.cardQuantities[name].length && (
                      <CompactCard
                        key={name}
                        cardName={name}
                        quantity={cardQuantitiesByPlayer.cardQuantities[name][i]}
                      />
                    )
                  }
                </>
                
              )
            }
          </PlayerList>
        )
      }
    </Wrapper>
  )
}
