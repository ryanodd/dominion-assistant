import React, { FunctionComponent } from 'react';
import { Block } from 'jsxstyle';

interface CardProps {
  cardAssetName: string,
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well'}) => {  
  return (
    <Block alignItems='stretch' justifyContent='stretch'>
      <img src={require('./cardAssets/200px-' + cardAssetName + '.jpg')}/>
    </Block>
  );
}
