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
import { addGame } from "../data/Actions.js";
import Square from "../components/Square.js";
import { serverTimestamp } from "firebase/firestore";

// Todo:
// - Send status to firebase after each move
// - Load status from firebase on start

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
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

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
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
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} style={styles.square} />
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
}

//main component of the screen containing the board
function TicTacToeScreen(props) {
  useEffect(()=>{
    // console.log('In TicTacToe');

    // return(()=>{console.log('Left TicTacToe')})
  }, [])

  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;

  const [history, setHistory] = useState([Array(9).fill(null)]); //initialize the board with 9 empty grids
  const [currentMove, setCurrentMove] = useState(0);//currentMove is the index of the current move (0-9)
  const xIsNext = currentMove % 2 === 0; //indicator of which symbol is to be played next (x or o)
  const currentSquares = history[currentMove]; //get a list of the state of current squares
  const [status, setStatus] = useState('Next player: ' + (xIsNext ? 'X' : 'O'));

  useEffect(() => {
    // This will run every time `currentMove` or `history` changes
    console.log(`The most recent move:`, currentSquares);
  }, [currentMove, history]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = ({ item, index }) => {
    const move = index;
    const description = move ?
      `Go to move #${move}` :
      'Go to game start';
    return (
      <View style={styles.moveListItem}>
        <Text style={styles.moveListItemText} onPress={() => jumpTo(move)}>
          {description}
        </Text>
      </View>
    );
  };

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
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
          <FlatList
            data={history}
            renderItem={moves}
            keyExtractor={(item, index) => index.toString()}
            style={styles.movesList}
          /> 
        
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
              let theGame = {type:'TicTacToe', players:[myKey, 'free'], p1Moves:[1], p2Moves:[0], turn:'p2'}
              dispatch(addGame(theGame))
              props.navigation.navigate('Home')
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
    flexDirection: 'row',       // align children horizontally
    justifyContent: 'center',   // center children in the row
    alignItems: 'center',       // align items in the center of the cross-axis
  },
  status:{
    // marginBottom: '10',
    color: 'white', // This sets the text color to white
    textAlign: 'center', // This will center your status text horizontally
    marginBottom: 6, // This sets a bottom margin; you can adjust the value as needed
  },

  game:{ //game contains the board and the list of moves
    display: 'flex',
    flexDirection: 'column',
    flex:1,
  },

  movesList:{
    flex:1,
    // flexGrow: 1,  // Allow the list grow and fill space 
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