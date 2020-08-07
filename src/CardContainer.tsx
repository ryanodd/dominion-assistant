import React, { FunctionComponent } from 'react';
import { Block, Row } from 'jsxstyle';
import cardNames from './cardNames';
import { Card } from './Card';

interface CardContainerProps {
  cardAssetName?: string,
};

export const CardContainer: FunctionComponent<CardContainerProps> = ({cardAssetName = 'Wishing_Well'}) => {  
  return (
      <Row
        backgroundColor='red'
        overflowX='scroll'
        overflowY='hidden'
      >
        {renderCards()}
      </Row>
  );
}

function renderCards() {
  let cards: JSX.Element[] = [];
  cardNames.forEach(name => cards.push(
    <Block margin={10}>
      <Card cardAssetName={name}/>
    </Block>
  ));
  return cards;
}
