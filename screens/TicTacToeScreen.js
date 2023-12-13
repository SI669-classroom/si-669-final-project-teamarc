// TicTacToeScreen.js

import { useEffect } from "react";
import { useState } from 'react';

import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'
import { getAuthUser } from "../AuthManager.js";
import { addGame, updateGame, joinGame } from "../data/Actions.js";
import Square from "../components/Square.js";
import { serverTimestamp } from "firebase/firestore";
import { current, legacy_createStore } from "@reduxjs/toolkit";



function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // If there is a winner or the square is already filled, handleClick is disabled and no square can be clicked
    if (calculateWinner(squares) || squares[i]) {
      return; 
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares); // currentMove === 9 ? 'yes' : 'no'
  //squares.filter(value => value !== null).length === 9;
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.filter(value => value !== null).length === 9){
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View>
      <View style={styles.status}>
        <Text style={styles.status}>
        {status}
        </Text>
      </View>

      <View style={styles.boardRowAfter}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </View> 

      <View style={styles.boardRowAfter}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </View> 

      <View style={styles.boardRowAfter}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </View>  
    </View> 
  );
} //Board component ends here, which takes in xIsNext, change the squares based on that
// squares (the previous array of board values, and onPlay as props








//main component of the screen, containing the board
function TicTacToeScreen(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;

  const [history, setHistory] = useState([Array(9).fill(null)]); 
  //initialize the board with 9 empty grids; history only records two states of the board (before change and after user has clicked the board)

  //TODO: initialize the sendGame object as the game object to be sent to firebase, with the following properties:
  // - tttboard: the current board state
  // - turn: the current turn (p1 or p2)
  // - players: the players in the game (array of 2 elements)
  // - finish: whether the game is finished or not (yes or no)
  // - type: the type of game (TicTacToe)
  // - roundNumber: the current round number (0-8) 

  const theGames = useSelector((state) => state.myGames); // this gets a list of all game objects, including other types of games from the firebase
  
  //TODO: initiate currentMove as the index of the current move (0-9), or round number from 0-8
  const [currentMove, setCurrentMove] = useState(0); // Keep track of current move index.

  const [sendGame, setSendGame] = useState(
    {
      tttboard: Array(9).fill(null),
      turn: 'p1', //p1 always initiate the game and use X
      players: [getAuthUser().uid, ''],
      finish: 'no',
      type: 'TicTacToe',
      roundNumber: 0 //this will be the same as currentMove; currentMove will get value from here
    }
  ); // Placeholder for the game object to send and stored to firehbase.
  
  //TODO: set currentSquares as what is currently on the board. Because we are just innitiating now, it would be null
  let currentSquares = Array(9).fill(null); //history[currentMove];

  let xIsNext = currentMove % 2 === 0; //indicator of which symbol is to be played next (x or o). p1 always play X. We start with X

  // Next, check if this is a new game or an existing game based on where the route it is from
  useEffect(()=>{
    if (route.params.type === 'new') { //if this is a new game      
      console.log('new game');
      const initialGame = {
        tttboard: Array(9).fill(null),
        turn: 'p1', //p1 always initiate the game and use X
        players: [getAuthUser().uid, ''],
        finish: 'no',
        type: 'TicTacToe',
        roundNumber: 0 //this will be the same as currentMove; currentMove will get value from here
      };
      setSendGame(initialGame);
    }
   else {
    //TODO: get values for sendGame object, from the firebase game object
    // - tttboard: the current board state
    // - turn: the current turn (p1 or p2)
    // - players: the two players in the game (array of 2)
     
    // theGames will get every game in the database, filter for tictactoe only

    // let thisGame = theGames.filter(elem=>elem.key === route.params.type);

    const thisGameType = theGames.filter(elem=>elem.type === 'TicTacToe'); //filtering for tictactoe only, among all of the games
    
    let thisGame = thisGameType.find(game => game.key === route.params.gameId); //getting one game object from theGames array

      thisGame = thisGameType[0]; // just testing the first game object in the array for now
      if (thisGame) { // If the game exists
        setSendGame(thisGame); // Assuming thisGame has all the required fields.

        // console.log("route param id is: ", route.params.gameId);
        // console.log("game key is: ", thisGame.key)
        console.log("all games retrieved for tictactoe: ", thisGameType); // thisGame is able to be retrieved

        setCurrentMove(thisGame.roundNumber || 0); // Set the current move index to the round number of the game object
        
        
        currentSquares = thisGame.tttboard; // able to successfully retrieve the board state
        xIsNext = currentMove % 2 === 0; //update xIsNext
        setHistory(prevHistory => prevHistory[0] = currentSquares);
        // console.log("successfully retrieved thisGame", thisGame); // was able to successfully retrieve the game object
        // console.log("now, the history object is", history); // it should have one array containing the retrieved currentSquares 
        // console.log("current board state is ", currentSquares); // it should have two obejcts in the array
      }
      else{
        console.log("game does not exist");
      }

    //TODO: update history, currentMove, currentSquares, and xIsNext from the retrievedGame object
   }
   
  }, [route.params.type, route.params.gameId, theGames]); //useEffect ends here, theGames may need to be excluded from tracking


  function handlePlay(nextSquares) { 
    //updates the history array, but in this case just adding an array item to history about current state
    // const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // setHistory(nextHistory);
    // setCurrentMove(nextHistory.length - 1);

    // setHistory(prevHistory => {
    //   // const newHistory = prevHistory.slice(0, currentMove + 1);
    //   const newHistory = prevHistory.slice(0, 1);
    //   return [...prevHistory, nextSquares];
    // });
    const newMoveIndex = currentMove + 1;
    setCurrentMove(newMoveIndex);
    const nextTurn = newMoveIndex % 2 === 0 ? 'p1' : 'p2';

    setSendGame(prevSendGame => ({
      ...prevSendGame,
      tttboard: nextSquares,
      turn: nextTurn,
      roundNumber: newMoveIndex,
    }));
    
    setHistory(prevHistory => [...prevHistory, nextSquares]); //added nextSquares to history

    // setHistory(prevHistory => [...prevHistory, nextSquares]);//not working

    // console.log(nextSquares); // nextSquare is able to be updated
    console.log("This happens after handleplay is called, and nextSquare value is ", nextSquares); 
  } //handleplay ends

  useEffect(() => {
    console.log("The sendGame object has been updated: ", sendGame);
    currentSquares = history[history.length - 1]; // this is updating currentSquares value whenever history has new addition

    // console.log("After update, currentSquares value is ", currentSquares);
    // console.log("the histroy is ", history);

  }, [sendGame]);

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

      </View> 

        <View style={styles.game}>
          <Board xIsNext={xIsNext} squares={sendGame.tttboard} onPlay={handlePlay} /> 

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
              margin:10
            }}
            style={styles.gameButton}
            title={"Send Move"}
            onPress={() => {
              //TODO: update the sendGame object with the current board state, turn, and round number
              
              const winner = calculateWinner(currentSquares);
              let nextTurn = (currentMove + 1) % 2 === 0 ? 'p1' : 'p2';

              if (winner || currentMove === 9) {
                // Game finished
                setSendGame(prevSendGame => ({
                  ...prevSendGame,
                  finish: 'yes',
                  roundNumber: currentMove,
                  turn: nextTurn, // Setting the next turn
              }));}

              else{
                setSendGame(prevSendGame => ({
                  ...prevSendGame,
                  tttboard: currentSquares,
                  roundNumber: currentMove + 1,
                  turn: nextTurn, // Setting the next turn
              })); 
              }

              let theGame = {
                ...sendGame,
                finish: winner || currentMove === 9 ? 'yes' : 'no',
                // turn: xIsNext ? 'p2' : 'p1', xisnext is already updated in handlePlay
              };

              if (route.params.type === 'new') {
                // if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1' && currentMove === 0) {
                // let theGame = {...sendGame, turn:'p2', tttboard: currentSquares, roundNumber: currentMove}
                dispatch(addGame(theGame))
                props.navigation.navigate('Home')
                // }
              }
              else {
                
                if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1') {
                  // let theGame = {...sendGame, turn:'p2', tttboard: currentSquares, roundNumber: currentMove}
                  theGame = {...sendGame, turn:'p2'} //chang the turn
                  dispatch(updateGame(theGame))
                  console.log("updated: theGame after p1 clicked on a box", theGame);
                  props.navigation.navigate('Home') //navigate to home screen
                  }
                if (getAuthUser().uid === sendGame.players[1] && sendGame.turn ==='p2') {
                  // let theGame = {...sendGame, turn:'p1', tttboard: currentSquares, roundNumber: currentMove}
                  theGame = {...sendGame, turn:'p1'}
                  dispatch(updateGame(theGame))
                  props.navigation.navigate('Home')                  
                }
                //TODO: also check if the game has finished or not (use thecalculatewinner function)

              }
              
            }}

          /> 
        </View> 

      </View> 
    </View>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
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
    paddingTop: '8%',
  },

  gameContainer: {
    backgroundColor: 'white',
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
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
    marginTop: '2%',
    justifyContent: 'flex-end', // Position button at the end of flex container
  },

  gameButton: {
    marginBottom: 40,
  },


  //styles for the board itself
  boardRowAfter: {
    // flexDirection: 'row',       // align children horizontally
    // justifyContent: 'center',   // center children in the row
    // alignItems: 'center',       // align items in the center of the cross-axis

    flexDirection: 'row', 
    borderWidth: 2,
    borderColor: '#444',
  },
  status:{
    // marginBottom: '10',
    color: 'white', // This sets the text color to white
    textAlign: 'center',  
    marginBottom: 6, // This sets a bottom margin; can adjust the value as needed
  },

  game:{ //game contains the board and the list of moves
    display: 'flex',
    flexDirection: 'column',
    flex:1,
  },

  movesList:{
    flex:1,
    marginTop: 10,
  },

  moveListItemText: {
    color: 'white', // This sets the text color to white
    textAlign: 'center', // This centers the button text horizontally
  },

  gameInfo:{
    marginLeft: '20',
  },

  footer:{
    padding:1
  }
 
});

export default TicTacToeScreen;