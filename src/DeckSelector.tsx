import React from 'react';
import { Card } from './Card';
import cardNames from './cardNames';
import { Row, Col } from 'jsxstyle';
import { CardContainer } from './CardContainer';
import { AutoComplete, Divider } from 'antd';
import { OptionType, LabeledValue } from 'antd/lib/select';

export class DeckSelector extends React.Component {

  autoCompleteOptions(): {value: string}[] {
    let options: {value: string}[] = [];
    cardNames.forEach(name => {
      options.push({value: name});
    });
    return options;
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
            style={{ marginBottom: 20 }}
          />
          <CardContainer/>
      </Col>
    );
  }
}
