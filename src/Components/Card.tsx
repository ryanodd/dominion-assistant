import React, { FunctionComponent } from 'react'
import { Col } from 'jsxstyle'
import { QuantityBadge } from './QuantityBadge'

interface CardProps {
  cardAssetName: string
  cardSelectedCallback?: () => any
  quantity: number
  height?: number
  useQuantityBadge?: boolean
}

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well', quantity, height=150, useQuantityBadge=false}: CardProps) => {
  const MULTI_CARD_STAGGER_HEIGHT = height * 0.12
  const extraCardElements: JSX.Element[] = []

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cardImage = require('../assets/cards/200px-' + cardAssetName.replaceAll(' ','_') + '.jpg')
  console.log(cardImage)

  // Only adding 'position: absolute' cards after the 1st, since we want the width to be determined automatically
  for (let i = 1; i < quantity; i++){
    extraCardElements.push(
      <img
        key={i}
        height={height}
        src={cardImage.default}
        alt={cardAssetName}
        style={{
          position: 'absolute',
          top: i * MULTI_CARD_STAGGER_HEIGHT
        }}
      />
    )
  }

  return (
    <Col
      borderRadius={4}
      overflow='hidden'
      position='relative' // For child positioning
      height={height + ((quantity-1) * MULTI_CARD_STAGGER_HEIGHT)}
    >
      {useQuantityBadge && quantity > 1 &&
        <QuantityBadge
          quantity={quantity}
          style={{
            'position': 'absolute',
            'left': 6,
            'top': 12
          }}
        />
      }
      <img
        height={height}
        src={cardImage.default}
        alt={cardAssetName}
      />
      {!useQuantityBadge && extraCardElements}
    </Col>
  )
}
