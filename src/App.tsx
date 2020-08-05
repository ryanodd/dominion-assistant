import React from 'react';
import { Card } from './Card';
import cardNames from './cardNames';
import { Row, Col } from 'jsxstyle';

function renderCards() {
  let cards: JSX.Element[] = [];
  cardNames.forEach(name => cards.push(<Card cardAssetName={name}/>));
  return cards;
}

class App extends React.Component {
  render(): any {
    return(
      <Col padding={20} alignItems='stretch' backgroundColor='grey' height='100%' width='100%'>
          <Row
            backgroundColor='red' 
          >
            {renderCards()}
          </Row>
      </Col>
    );
  }
}
export default App;
