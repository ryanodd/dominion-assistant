import React, { FunctionComponent } from 'react';
import { Block, Row } from 'jsxstyle';
import { Card } from './Card';

interface CardContainerProps {
  cardNameList: string[],
  style?: {}
  cardHeight?: number
};

export const CardContainer: FunctionComponent<CardContainerProps> = (props) => {
  let { cardNameList, cardHeight, style } = props;
  return (
      <Row
        overflowX='scroll'
        overflowY='hidden'
        style={style}
      >
        {renderCards(cardNameList, cardHeight || 130)}
      </Row>
  );
}

function renderCards(cardNameList: string[], cardHeight: number) {
  let cardQuantities: { [index: string]: number } = {};
  cardNameList.forEach(name => {
    cardQuantities[name] = (cardQuantities[name]+1) || 1
  })
  
  let cards: JSX.Element[] = [];
  for (let key in cardQuantities){
    cards.push(
      <Block key={key} margin={4}>
        <Card cardAssetName={key} quantity={cardQuantities[key]} height={cardHeight}/>
      </Block>
    )
  }
  return cards;
}
