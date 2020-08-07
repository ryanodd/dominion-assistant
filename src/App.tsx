import React from 'react';
import { Card } from './Card';
import cardNames from './cardNames';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';


class App extends React.Component {
  render(): any {
    return(
      // The styling on this is meant to be the first point of control,
      // taking up the full viewport and being behind everything.
      // It's the only thing that should use vw/vh?
      <Col
        padding={20}
        alignItems='stretch'
        backgroundColor='grey'
        height='100vh'
        width='100vw'
        overflowX='hidden'
        overflowY='scroll'
      >
          <CardContainer/>
      </Col>
    );
  }
}
export default App;
