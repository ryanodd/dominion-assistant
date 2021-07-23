import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ height: number }>`
  position: relative;
  display: flex;

  overflow: hidden;
  height: ${props => props.height}px;
`

const CardName = styled.p`
  margin: 0;
`

const CompactCardImage = styled.img`
  position: 'absolute';
`

const QuantityDiv = styled.div`
  background-color: black;
  color: white;
`

interface CompactCardProps {
  cardName: string
  cardSelectedCallback?: () => any
  quantity: number
  height?: number
}

export const CompactCard: FunctionComponent<CompactCardProps> = ({cardName, quantity, height=40}: CompactCardProps) => {

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cardImage = require('../../assets/cards/200px-' + cardName.replaceAll(' ','_') + '.jpg')

  return (
    <Wrapper
      height={height}
    >
      {
        quantity !== 0 && (
          <>
            <CardName>
              {cardName}
            </CardName>
            <CompactCardImage
              height={height}
              src={cardImage.default}
              alt={cardName}
            />
            {
              quantity > 1 && (
                <QuantityDiv>
                  {quantity}
                </QuantityDiv>
              )
            }
          </>
        )
      }
      
    </Wrapper>
  )
}
