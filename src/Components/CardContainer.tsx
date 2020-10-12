import React, { FunctionComponent } from 'react';
import { Block, Row } from 'jsxstyle';
import { Card } from './Card';

interface CardContainerProps {
  cardNameList: string[],
  style?: {}
};

export const CardContainer: FunctionComponent<CardContainerProps> = ({cardNameList, style}) => {  
  return (
      <Row
        overflowX='scroll'
        overflowY='hidden'
        style={style}
      >
        {renderCards(cardNameList)}
      </Row>
  );
}

function renderCards(cardNameList: string[]) {
  let cardQuantities: { [index: string]: number } = {};
  cardNameList.forEach(name => {
    cardQuantities[name] = (cardQuantities[name]+1) || 1
  })
  
  let cards: JSX.Element[] = [];
  for (let key in cardQuantities){
    cards.push(
      <Block key={key} margin={4}>
        <Card cardAssetName={key} quantity={cardQuantities[key]}/>
      </Block>
    )
  }
  return cards;
}
