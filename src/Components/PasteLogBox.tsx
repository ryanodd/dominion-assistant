import React, { FunctionComponent, ChangeEvent } from 'react';
import { Input, Button } from 'antd';
import { Block, Row, Col } from 'jsxstyle';
import allCardNames from '../allCardNames';
import { Card } from './Card';

interface CardContainerProps {
  pasteCallback: (event: ChangeEvent<HTMLInputElement>) => void,
  style?: {}
};

export const PasteLogBox: FunctionComponent<CardContainerProps> = ({pasteCallback, style}) => {  
  return (
    <Col style={{...style, 'backgroundColor': 'darkgreen'}}>
      <Input
        placeholder={'Paste deck here...'}
        onChange={pasteCallback}
        style={{
          'width': '100%'
        }}
      />
    </Col>
  );
}
