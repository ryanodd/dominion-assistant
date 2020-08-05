import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card } from './Card';
import cardNames from './cardNames';

function renderCards() {
  let cards: JSX.Element[] = [];
  cardNames.forEach(name => cards.push(<Card cardAssetName={name}/>));
  return cards;
}

class App extends React.Component {
  render(): any {
    return(
      <div className="App">
          <div style={styles.cardContainer}>
            {renderCards()}
          </div>
      </div>
    );
  }
}

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
  cardContainer: {
    display: 'flex',
    backgroundColor: 'red',
    height: 30,
    width: 30,
  },
};

export default App;
