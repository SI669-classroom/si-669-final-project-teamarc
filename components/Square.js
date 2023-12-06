//Square.js - makeup of each of the square in tic tac toe


import { useState } from 'react';
import { Button } from "@rneui/base";

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Square({ value, onSquareClick }) {
  return (
    <TouchableOpacity
      onPress={onSquareClick}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#999',
    width: 100,   
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: -1,  // Maintaining a tight layout with other squares if necessary
  },
  buttonText: {
    color: 'black', // A contrasting color to the button background
    fontSize: 24,
    fontWeight: 'bold',
  }
});


export default Square;