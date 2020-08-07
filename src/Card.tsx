import React, { FunctionComponent } from 'react';
import { Block } from 'jsxstyle';

interface CardProps {
  cardAssetName: string,
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well'}) => {  
  return (
    <img height={200}  src={require('./cardAssets/200px-' + cardAssetName + '.jpg')}/>
  );
}
