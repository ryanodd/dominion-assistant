import React, { FunctionComponent } from 'react';
import { Block, Row } from 'jsxstyle';
import allCardNames from '../cardNames';
import { Card } from './Card';

interface CardContainerProps {
  cardAssetName?: string,
  cardNameList: string[],
};

export const CardContainer: FunctionComponent<CardContainerProps> = ({cardNameList}) => {  
  return (
      <Row
        backgroundColor='red'
        overflowX='scroll'
        overflowY='hidden'
      >
        {renderCards(cardNameList)}
      </Row>
  );
}

function renderCards(cardNameList: string[]) {
  let cards: JSX.Element[] = [];
  cardNameList.forEach(name => cards.push(
    <Block margin={10}>
      <Card cardAssetName={name}/>
    </Block>
  ));
  return cards;
}
