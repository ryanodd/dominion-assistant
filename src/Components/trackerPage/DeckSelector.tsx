import React from 'react'
import cardNames from '../../cardData'
import { Col } from 'jsxstyle'
import { CardContainer } from '../shared/CardContainer'
import { AutoComplete, Button } from 'antd'

// Eventually, this should live somewhere else (along with the button that sends it off)
interface DeckSelectorState {
  selectedCardNames: string[];
}

export class DeckSelector extends React.Component<Record<string, unknown>, DeckSelectorState> {

  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {selectedCardNames: []}
  }

  autoCompleteOptions(): {value: string}[] {
    const options: {value: string}[] = []
    Object.keys(cardNames).forEach(name => {
      options.push({value: name})
    })
    return options
  }

  onSelect = (value: string): void => {
    this.setState(prevState => {
      return {selectedCardNames: prevState.selectedCardNames.concat(value)}
    })
  }

  buttonPress = (): void => {
    // do stuff
  }

  render(): any {
    return(
      <Col
        padding={20}
        alignItems='stretch'
        backgroundColor='purple'
      >
        <AutoComplete
          options={this.autoCompleteOptions()}
          filterOption
          defaultActiveFirstOption
          onSelect={this.onSelect}
          style={{ marginBottom: 20 }}
        />
        <CardContainer cardNameList={this.state.selectedCardNames} style={{marginBottom: 20}}/>
        <Button type="primary" onClick={this.buttonPress}>
          {'SUBMIT!'}
        </Button>
      </Col>
    )
  }
}
