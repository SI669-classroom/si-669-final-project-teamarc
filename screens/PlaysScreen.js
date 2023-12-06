import { useEffect } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'
import { getAuthUser } from "../AuthManager.js";
import { getDoc } from "firebase/firestore";
import { gettingGame, joinGame } from "../data/Actions.js";

function PlaysScreen(props) {
  const dispatch=useDispatch();
  

  return (
    <View style={styles.container}>
      <LogoImage />
      {props.route.params.type === 'new' ? <Text>Make A Game</Text>: null}
      {props.route.params.type === 'find' ? <Text>Find A Game</Text>: null}
      <View style={styles.header}>

      {/* <Button
          title="Send"
          onPress={async ()=>{
            let newMessage = {
              author: authorText,
              text: inputText,
              timestamp: new Date(),
            }
            await addDoc(collection(db, 'messageBoard'), newMessage);
            setInputText('');
          }}
        /> */}
{/* TODO --- Above is the way to phrase your  */}
        <TouchableOpacity 
         onPress={()=>{props.navigation.navigate('TicTacToe', {type:'new'})}}
        >
        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/TicTacToeIcon.png')} />
          <Text style={styles.gameText}>Tic-Tac-Toe</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
        //  onPress={()=>{props.navigation.navigate('DotsAndBoxes', {type:'new'})}}
          onPress={async()=>{
            // console.log('starting grab')
            let nextGame = await gettingGame('DotsAndBoxes',getAuthUser().uid)
            // console.log(nextGame)
            if (nextGame === 0) {
              props.navigation.navigate('DotsAndBoxes', {type:'new'})
            }
            else {
              // TODO --- Find a way to wait for reducer to update before navigating to the correct game. Can maybe navigate to home with a item property to say when get here go to this game?
              joinGame(nextGame)
              props.navigation.navigate('Home')
            }
          }}
        >
        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/DotsAndBoxesIcon.png')} />
          <Text style={styles.gameText}>Dots and Boxes</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={()=>{props.navigation.navigate('HangMan', {type:'new'})}}
        >
        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            source={require('../images/HangManIcon.png')} />
          <Text style={styles.gameText}>Hang Man</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.allButtons}>
          {/* <Button
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
              margin:10
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
              margin:10
            }}
            style={styles.gameButton}
            title={"Make A Game"}
            onPress={() => {
            }}
          /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: '12%',
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

export default PlaysScreen;