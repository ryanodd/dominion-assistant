import React, { FunctionComponent } from 'react';
import { Col } from 'jsxstyle';
import { QuantityBadge } from './QuantityBadge';

interface CardProps {
  cardAssetName: string
  cardSelectedCallback?: () => any
  quantity: number
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well', quantity}) => {
  return (
    <Col
      borderRadius={4}
      overflow='hidden'
      position='relative' // For child positioning
    >
      {quantity > 1 &&
        <QuantityBadge
          quantity={quantity}
          style={{
            'position': 'absolute',
            'left': 6,
            'top': 12
          }}
        />
      }
      <img height={160}  src={require('../cardAssets/200px-' + cardAssetName.replace(' ','_') + '.jpg')} alt={cardAssetName}/>
    </Col>
  );
}
