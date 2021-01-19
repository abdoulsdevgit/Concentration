import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, Dimensions, Button, Pressable, TouchableOpacity} from 'react-native';
import * as imgs from '../assets/cardImages/cardImageImporter';


const cardWidth = Math.floor(Dimensions.get('screen').width / 4) * 0.95;
const cardHeight = Math.floor(Dimensions.get('screen').height / 6);

let styles = StyleSheet.create({
    card: {
        
        borderWidth: 1,
        flexBasis: cardWidth,
        flexGrow: 0,
        flexShrink: 0,
        height: cardHeight,
    },

    image: {
        height: cardHeight,
        width: cardWidth,
        alignContent: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
    }
});

const Card = (props) => {
   
    const {identifier, isMatched, isFaceup} = props;
    const cardMatched = isMatched ? {...styles.card, backgroundColor: 'gray'} : {...styles.card};
    const card = isFaceup ? <Image resizeMethod='resize' style={styles.image} source={imgs[`card${identifier}`]} /> :
    <Image resizeMethod='resize' style={[styles.image]} source={isMatched ? imgs['matched'] : imgs['back']}/>
    return ( 
        <TouchableOpacity disabled={isMatched} style={cardMatched} onPress={props.handleCard}>
            {card}
        </TouchableOpacity>
    );
}
 
export default Card;