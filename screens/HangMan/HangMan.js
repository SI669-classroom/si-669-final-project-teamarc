import { useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight, ScrollView
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../../components/LogoImage.js'
import { getAuthUser } from "../../AuthManager.js";
import { addGame } from "../../data/Actions.js";
import FigureMan from './FigureMan.js'

function HangManScreen(props) {
  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;
  const word = 'HANGMAN';

  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [correctGuesses, setCorrectGuesses] = useState([])
  const [wrongLetters, setWrongLetters] = useState('');

  const maskedWord = word.split('').map(letter =>
    correctGuesses.includes(letter) ? letter : "_").join(" ");
  const [status, setStatus] = useState('');

  const storeCorrectLetters = (keyInput) => {
    const ans = correctWord.toUpperCase();
    if (ans.includes(keyInput)) {
      const cl = correctLetters + keyInput;
      setCorrectGuesses(cl);
      // check win
      updateStatus(cl);
    } else {
      const wl = wrongLetters + keyInput;
      setWrongLetters(wl);
      if (wl.length > 5) {
        // lost
        setStatus('lost')
      }
    }
  }

console.log(wrongLetters.length)
  return (
    <View style={styles.container}>
      <LogoImage />
      <ScrollView style={styles.header}>
      <FigureMan wrongWord={wrongLetters.length} />
        <Text style={styles.displayWord}>{maskedWord}</Text>
        <View style={styles.keyContainer}>
          {alphabets
            .map((alphabet, index) =>
              <Button
                color="#FFD600"
                buttonStyle={{
                  borderRadius: 6,
                  height: 45,
                  width: 34,
                }}
                titleStyle={{
                  color: "black",
                  fontSize: 16,
                }}
                containerStyle={{
                  // width: 35,
                  marginBottom: 8,
                  margin: 3,
                }}
                key={index} onPress={() => {
                  if (word.includes(alphabet)) {
                    setCorrectGuesses([...correctGuesses, alphabet])
                  }
                  else {
                    setWrongLetters([...wrongLetters, alphabet]);
                    wl = [...wrongLetters, alphabet]
                    if (wl.length > 6) {
                      // lost
                      setStatus('lost')
                    }
                  }
                }}>{alphabet}</Button>)}
        </View>
        {!maskedWord.includes("_") && <Text style={styles.displayWord}>You won!</Text>}
        {/* </View> */}

        {/* <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/HangManIcon.png')} />
          <Text style={styles.gameText}>Hang Man</Text>
        </View> */}



        {/* <View style={styles.allButtons}>
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
            margin: 10
          }}
          style={styles.gameButton}
          title={"Send Move"}
          onPress={() => {
            let theGame = { type: 'HangMan', players: [myKey, 'free'], p1Moves: [1], p2Moves: [0], turn: 'p2' }
            dispatch(addGame(theGame))
            props.navigation.navigate('Home')
          }}
        />

      </View> */}
      </ScrollView>
    </View >
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

  keyContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    flexWrap: 'wrap',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  displayWord: {
    fontSize: 21,
    alignSelf: 'center',
  },

});

export default HangManScreen;