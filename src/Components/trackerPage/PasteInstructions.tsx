import React, { ReactElement } from 'react'
import styled from 'styled-components'

const InstructionRow = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 24px;
  }
`

const InstructionStep = styled.p`
  margin: 0;
  //font-size: 14px;
`

const PasteInstructions = (): ReactElement => (
  <InstructionRow>
    <InstructionStep>
      <b>{'1. '}</b> {'Click anywhere inside your game log'}
    </InstructionStep>
    <InstructionStep>
      <b>{'2. '}</b> {'Ctrl+A'}
    </InstructionStep>
    <InstructionStep>
      <b>{'3. '}</b> {'Ctrl+C'}
    </InstructionStep>
    <InstructionStep>
      <b>{'4. '}</b> {'Paste it here with Ctrl+V'}
    </InstructionStep>
  </InstructionRow>
)

export default PasteInstructions
