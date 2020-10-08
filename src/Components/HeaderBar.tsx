import React, { FunctionComponent } from "react";
import { Row, Col } from "jsxstyle";

interface HeaderBarProps {
  style?: {}
};

export const HeaderBar: FunctionComponent<HeaderBarProps> = ({style}) => {  
  return (
      <Row
        style={{
          ...style, 
          'backgroundColor': '#202020',
          'padding': 16,
        }}
      >
        <Col
          fontSize={30}
          color='#E0E0E0'
        >
          {'Council Room'}
        </Col>
      </Row>
  );
}