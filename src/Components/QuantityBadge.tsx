import React, { FunctionComponent } from 'react';
import { Col, Row } from 'jsxstyle';

interface QuantityBadgeProps {
  quantity: number
  style?: {}
};

export const QuantityBadge: FunctionComponent<QuantityBadgeProps> = ({quantity, style}) => {  
  return (
    <Col
      height={24}
      borderRadius={12}
      paddingH={8}
      alignItems='center'
      justifyContent='center'
      backgroundColor='#f03030'
      style={style}
    >
      <Row
        color='black'
        fontWeight={700}
        paddingBottom={3} // Font Compensation
      >
        {quantity + 'x'}
      </Row>
    </Col>
  );
}
