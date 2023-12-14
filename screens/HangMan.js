import { useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight, ScrollView
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'
import { getAuthUser } from "../AuthManager.js";
import { addGame, updateGame, joinGame } from "../data/Actions.js";
import FigureMan from '../components/FigureMan.js'
import { randomWord } from '../components/Words.js'
import { HangManBlank } from "../data/HangManBlank.js";



function HangManScreen(props) {
  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;

  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [word] = useState(randomWord());

  const [correctGuesses, setCorrectGuesses] = useState([])
  const [wrongLetters, setWrongLetters] = useState('');
  const [sendGame, setSendGame] = useState(HangManBlank)

  const maskedWord = word.split('').map(letter =>
    correctGuesses.includes(letter) ? letter : "_").join(" ");
  const [status, setStatus] = useState('');

  var maxWrong = 6;

  console.log(word)
  console.log(status)

  // const handlePopupButton = () => {
  //   if (status === 'win') {
  //     // go to next word
  //     setCurrentIndex(i => i + 1)
  //   }
  //   // clear all stored data
  //   setCorrectLetters('')
  //   setWrongLetters('')
  //   setStatus('')
  //   // // replay
  //   if (status === 'completed') {
  //     setCurrentIndex(0);
  //   }
  // }

  const updateStatus = (cl) => {
    let status = 'win';
    const correctWordArray = Array.from(word.toUpperCase());
    console.log(correctWordArray)
    correctWordArray.forEach(letter => {
      if (!cl.includes(letter)) {
        status = '';
        return
      }
    })
    // if (status === 'win' && currentIndex === WordsArray.length - 1) {
    //   setStatus('completed')
    //   return
    // }
    setStatus(status);
  }

  return (
    <View style={styles.container}>
      <LogoImage />
      <ScrollView style={styles.header}>
        <FigureMan wrongWord={wrongLetters.length} />
        <Text style={styles.displayWord}>{maskedWord}</Text>
        <View style={styles.keyContainer}>
        {alphabets.map((alphabet, index) =>
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
              const cl = correctGuesses + alphabet;
              updateStatus(cl);
            }
            else {
              setWrongLetters([...wrongLetters, alphabet]);
              wl = [...wrongLetters, alphabet]
              if (wl.length > 5) {
                // lost
                setStatus('lost')
              }
            }
          }}>{alphabet}</Button>)}
          

          {!maskedWord.includes("_") ? <Text style={styles.displayWord}>You won!</Text> :

          (wrongLetters.length === maxWrong ?
          <View>
            <Text style={styles.wordText}>YOU LOSE </Text>
            <Text style={styles.wordText}>Correct Word is: {word}</Text>
          </View> 
          :
          <View>
          <Text></Text>
          </View> 
          )
          }
        </View>

        {/* <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/HangManIcon.png')} />
          <Text style={styles.gameText}>Hang Man</Text>
        </View> */}



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
            margin: 10
          }}
          style={styles.gameButton}
          title={"Send Move"}
          onPress={() => {
            let theGame = { type: 'HangMan', word: word, players: [myKey, 'free'], p1Moves: [1], p2Moves: [0], turn: 'p2' }
            dispatch(addGame(theGame))
            props.navigation.navigate('Home')
          }}
        />

      </View>
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
    paddingTop: '3%',
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
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'white',
    marginTop: '5%',
  },

  wordText: {
    marginTop: '5%',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700',
    color: 'white',
  }

});

export default HangManScreen;