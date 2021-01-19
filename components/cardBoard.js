/** 
 * This Component acts as a container for the collection of cards.
 *  
 */

import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import Card from './card';

const styles = StyleSheet.create({
    board: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        alignContent:'space-around',
        backgroundColor: '#000000',
    }
});

class CardBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {  }

    }
    
    render() {
        const {cards} = this.props;
        return (  
            <View style={styles.board}>
                {cards.map( (card, key) => <Card key={key} {...card} handleCard={ () => this.props.handleCard(key)} />)}
            </View>
        );
    }
}
 
export default CardBoard;