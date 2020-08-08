import React, { FunctionComponent } from 'react';

interface CardProps {
  cardAssetName: string,
  cardSelectedCallback?: () => any;
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well'}) => {  
  return (
    <img height={200}  src={require('./cardAssets/200px-' + cardAssetName + '.jpg')}/>
  );
}
