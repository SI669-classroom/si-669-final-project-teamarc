//Square.js - makeup of each of the square in tic tac toe


import { useState } from 'react';
import { Button } from "@rneui/base";

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Square({ value, onSquareClick }) {
  const textStyle = value === 'X' ? styles.xText : value === 'O' ? styles.oText : styles.buttonText;

  return (
    <TouchableOpacity
      onPress={onSquareClick}
      style={styles.button}
    >
      <Text style={textStyle}>{value}</Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //Below are old version styles
  // button: {
  //   backgroundColor: '#fff',
  //   borderWidth: 2,
  //   borderColor: '#999',
  //   width: 100,   
  //   height: 100, 
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: -1,  // Maintaining a tight layout with other squares if necessary
  // },
  // buttonText: {
  //   color: 'black', // A contrasting color to the button background
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // }

  button: {
    backgroundColor: '#fff',
    borderWidth: 5,    // Updated for bolder borders
    borderColor: '#333', // Updated color for a bolder look
    width: 100,   
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: -1,
  },
  buttonText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  xText: {
    color: 'blue', // X value color
    fontSize: 28,
    fontWeight: 'bold',
  },
  oText: {
    color: '#ffd300', // O value color
    fontSize: 28,
    fontWeight: 'bold',
  }


});


export default Square;