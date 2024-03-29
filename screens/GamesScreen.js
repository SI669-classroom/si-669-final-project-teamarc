import { useEffect } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'

function GamesScreen(props) {

  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.header}>

        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/TicTacToeIcon.png')} />

          <Text style={styles.gameText}>Tic-Tac-Toe</Text>
        </View>

        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/DotsBoxesIcon.png')} />
          <Text style={styles.gameText}>Dots and Boxes</Text>
        </View>

        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/HangManIcon.png')} />
          <Text style={styles.gameText}>Hang Man</Text>
        </View>

        <View style={styles.allButtons}>
          <Button
            color="#FFD600"
            buttonStyle={{
              backgroundColor: "#FFD600",
              borderRadius: 8,
            }}
            titleStyle={{
              color: "black",
              fontSize: 24,
            }}
            containerStyle={{
              width: 200,
            }}
            style={styles.gameButton}
            title={"Find Game"}
            onPress={() => {
            }}
          />
          <Button
            color="#FFD600"
            buttonStyle={{
              backgroundColor: "#FFD600",
              borderRadius: 8,
            }}
            titleStyle={{
              color: "black",
              fontSize: 24,
            }}
            containerStyle={{
              width: 200,
            }}
            style={styles.gameButton}
            title={"Make A Game"}
            onPress={() => {
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0085D1'
  },
  header: {
    paddingTop: '10%',
  },

  gameContainer: {
    backgroundColor: 'white',
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  image: {
    height: 80,
    width: 80,
    marginRight: 20,
    justifyContent: 'flex-start'
  },

  gameText: {
    fontSize: 28,
    textAlign: "left",
  },

  allButtons: {
    flexDirection: 'column', 
    alignSelf: 'center', 
    width: '90%', 
    marginTop: '5%',
  },

  gameButton: {
    marginBottom: 20,
  },
});

export default GamesScreen;