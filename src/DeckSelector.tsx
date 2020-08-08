import React from 'react';
import { Card } from './Card';
import cardNames from './cardNames';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { AutoComplete, Divider } from 'antd';


export class DeckSelector extends React.Component {
  render(): any {
    return(
      <Col
        padding={20}
        alignItems='stretch'
        backgroundColor='purple'
      >
          <AutoComplete 
            style={{ marginBottom: 20 }}
          />
          <CardContainer/>
      </Col>
    );
  }
}
