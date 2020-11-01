import React, { FunctionComponent } from 'react';
import { Col } from 'jsxstyle';
import { QuantityBadge } from './QuantityBadge';

interface CardProps {
  cardAssetName: string
  cardSelectedCallback?: () => any
  quantity: number
  height?: number
  useQuantityBadge?: boolean
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well', quantity, height=130, useQuantityBadge=false}) => {
  const MULTI_CARD_STAGGER_HEIGHT = height * 0.12
  let extraCardElements: JSX.Element[] = []

  // Only adding 'position: absolute' cards after the 1st, since we want the width to be determined automatically
  for (let i = 1; i < quantity; i++){
    extraCardElements.push(
      <img
        height={height}
        src={require('../cardAssets/200px-' + cardAssetName.replace(' ','_') + '.jpg')}
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
        src={require('../cardAssets/200px-' + cardAssetName.replace(' ','_') + '.jpg')}
        alt={cardAssetName}
      />
      {!useQuantityBadge && extraCardElements}
    </Col>
  );
}
