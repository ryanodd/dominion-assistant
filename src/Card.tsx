import React, { FunctionComponent } from 'react';
import './App.css';

interface CardProps {
  cardAssetName: string
};

export const Card: FunctionComponent<CardProps> = ({cardAssetName = 'Wishing_Well'}) => {  
  return (
    <div className="App">
      <img src={require('./cardAssets/200px-' + cardAssetName + '.jpg')} alt="logo" />
    </div>
  );
}
