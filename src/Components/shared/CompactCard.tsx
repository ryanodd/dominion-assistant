import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import cardData from '../../cardData'

const Wrapper = styled.div<{ height: number }>`
  overflow: hidden;
  width: 100%;
  height: ${props => props.height}px;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d2931;
  position: relative;
  display: flex;
  align-items: center;
`

const CardName = styled.p`
  margin: 0 0 0 4px;
  padding-bottom: 2px; // to account for weird space above text
  flex-grow: 1;
  z-index: 1;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 1px 1px 1.5px black, 1px -1px 1.5px black, -1px 1px 1.5px black, -1px -1px 1.5px black;
`

const CompactCardImage = styled.img<{stagger: string}>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  /* mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,1) 30%); */
  object-fit: cover;
  object-position: 50% ${props => (props.stagger)};
  transform: scale(1.2);
`

const QuantityDiv = styled.div`
  z-index: 1;
  width: 20px;
  height: 100%;
  padding-bottom: 1px; // to account for weird space above text

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ec552b;
  color: white;
  font-size: 17px;
  font-weight: 600;
`

interface CompactCardProps {
  cardName: string
  cardSelectedCallback?: () => any
  quantity: number
  height?: number
}

export const CompactCard: FunctionComponent<CompactCardProps> = ({cardName, quantity, height=44}: CompactCardProps) => {

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cardImage = require('../../assets/cards/200px-' + cardName.replaceAll(' ','_') + '.jpg')

  return (
    <Wrapper
      height={height}
    >
      {
        quantity !== 0 && (
          <Background>
            <CardName>
              {cardName}
            </CardName>
            <CompactCardImage
              height={height}
              src={cardImage.default}
              alt={cardName}
              stagger={cardData[cardName]?.imageStagger ?? '18%'}
            />
            {
              quantity > 1 && (
                <QuantityDiv>
                  {quantity}
                </QuantityDiv>
              )
            }
          </Background>
        )
      }
      
    </Wrapper>
  )
}
