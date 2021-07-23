import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { CompactCard } from './CompactCard'

const Wrapper = styled.div`
  display: flex;
`

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
`

const PlayerTitle = styled.h2`
  margin: 0;
`

interface CardListProps {
  cardLists: {
    title: string
    cardNameList: string[]
  }[]
}

export const CardList: FunctionComponent<CardListProps> = ({cardLists}: CardListProps) => {

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
          <PlayerList key={i}>
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
