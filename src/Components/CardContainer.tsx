import React, { FunctionComponent } from 'react'
import { Block, Row } from 'jsxstyle'
import { Card } from './Card'

interface CardContainerProps {
  cardNameList: string[],
  style?: Record<string, unknown>
  cardHeight?: number
}

export const CardContainer: FunctionComponent<CardContainerProps> = (props: CardContainerProps) => {
  const { cardNameList, cardHeight, style } = props
  return (
    <Row
      overflowX='auto'
      overflowY='hidden'
      style={style}
    >
      {renderCards(cardNameList, cardHeight || 130)}
    </Row>
  )
}

function renderCards(cardNameList: string[], cardHeight: number) {
  const cardQuantities: { [index: string]: number } = {}
  cardNameList.forEach(name => {
    cardQuantities[name] = (cardQuantities[name]+1) || 1
  })
  
  const cards: JSX.Element[] = []
  for (const key in cardQuantities){
    cards.push(
      <Block key={key} margin={4}>
        <Card cardAssetName={key} quantity={cardQuantities[key]} height={cardHeight}/>
      </Block>
    )
  }
  return cards
}
