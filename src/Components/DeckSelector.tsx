import React from 'react';
import { Card } from './Card';
import cardNames from '../allCardNames';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { AutoComplete, Divider, Button } from 'antd';
import { OptionType, LabeledValue } from 'antd/lib/select';
import { RequestService } from '../Services/RequestService';

interface DeckSelectorProps {
  //code related to your props goes here
}

// Eventually, this should live somewhere else (along with the button that sends it off)
interface DeckSelectorState {
  selectedCardNames: string[];
}

export class DeckSelector extends React.Component<DeckSelectorProps, DeckSelectorState> {

  constructor(props: Object) {
    super(props);
    this.state = {selectedCardNames: []};
  }

  autoCompleteOptions(): {value: string}[] {
    let options: {value: string}[] = [];
    cardNames.forEach(name => {
      options.push({value: name});
    });
    return options;
  }

  onSelect = (value: string): void => {
    this.setState(prevState => {
      return {selectedCardNames: prevState.selectedCardNames.concat(value)}
    });
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
            {"SUBMIT!"}
          </Button>
      </Col>
    );
  }
}
