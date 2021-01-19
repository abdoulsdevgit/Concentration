import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import CardBoard from "./components/cardBoard";
import Constants from 'expo-constants';
import Menu from './components/menu';
 
export default class App extends Component {

  state = {
    cards: [],
    numberOfPairsOfCards: 8,
    canShuffle: true,
  };

  indexOfOnlyFaceupCard = -1;

  /** Generates the cards of the game. at each iteration generate a pair of cards */
  generateCards = () => {
    
    const {numberOfPairsOfCards} = this.state;
    const result = [];

    for (let index = 0; index < numberOfPairsOfCards; index++) {
      
      const card = {
        identifier: index,
        isMatched: false,
        isFaceup: false,
      };

      const card2 = {...card};
      result.push(card);
      result.push(card2);

    }

    return this.shuffle(result);
  }

  componentDidMount() {
    this.setState({cards: this.generateCards()});
    
  }

  render() {
    const {cards} = this.state;
    return (
      <View style={styles.container}>

        <StatusBar style="auto" />
        <CardBoard cards={cards} handleCard={this.handleCard}/>
        <Menu handleShuffle={this.handleShuffle} handleNewGame={this.handleNewGame}/>
      </View>
    );

  }

  handleCard = (index) => {

    const cards = [...this.state.cards];
    
    
    if(cards[index].isFaceup || cards[index].isMatched) {
      return;
    }

    if(this.indexOfOnlyFaceupCard === -1) {
      cards.forEach(card => card.isFaceup = false);
      cards[index].isFaceup = true;
      this.indexOfOnlyFaceupCard = index;
    } else {
     
      cards[index].isFaceup = true;
      // if the 2 cards match disable them
      if(cards[this.indexOfOnlyFaceupCard].identifier === cards[index].identifier) {
        cards[this.indexOfOnlyFaceupCard].isMatched = true;
        cards[index].isMatched = true;
      }

      this.indexOfOnlyFaceupCard = -1;
    }

    this.setState({cards, canShuffle: false});
  }

  /** Player can only shuffle if they are not in the middle of a game. */
  handleShuffle = () => {
    const {canShuffle, cards} = this.state;
    const shuffledCards = [...cards];

    if(canShuffle) {
      this.setState({cards: this.shuffle(shuffledCards)});
    }
  }

  shuffle = (array) => {
  
    const cards = [...array];
  
    for (let index = 0; index < cards.length; index++) {
      const newIndex = Math.floor(Math.random() * cards.length);
      const temp = cards[newIndex];
      cards[newIndex] = cards[index];
      cards[index] = temp; 
    }
  
    return cards;
  }

  handleNewGame = () => {
      this.setState({
        cards: this.generateCards(),
        numberOfPairsOfCards: 8,
        canShuffle: true,
      });
  }
}




const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#000000',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
});
