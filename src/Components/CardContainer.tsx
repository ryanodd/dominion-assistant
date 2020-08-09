import React, { FunctionComponent } from 'react';
import { Block, Row } from 'jsxstyle';
import allCardNames from '../allCardNames';
import { Card } from './Card';

interface CardContainerProps {
  cardNameList: string[],
  style?: {}
};

export const CardContainer: FunctionComponent<CardContainerProps> = ({cardNameList, style}) => {  
  return (
      <Row
        backgroundColor='red'
        overflowX='scroll'
        overflowY='hidden'
        style={style}
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
