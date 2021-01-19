import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width,
    },
    button: {
        
    }
});

const Menu = (props) => {
    return ( 
        <View style={styles.menu}>
            <Button style={styles.button} title='shuffle'  onPress={props.handleShuffle}/>
            <Button style={styles.button} title='New Game' onPress={props.handleNewGame}/>
        </View>
     );
}
 
export default Menu;