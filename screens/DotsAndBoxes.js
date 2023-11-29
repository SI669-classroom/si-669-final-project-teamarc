import { useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'
import { getAuthUser } from "../AuthManager.js";
import { addGame, updateGame } from "../data/Actions.js";
import Small from "../components/Small.js";
import Long from "../components/Long.js";
import { dotsBlank } from "../data/DotsBlank.js";

function DotsAndBoxesScreen(props) {
  const { navigation, route } = props;
  const [theLines, setTheLines] = useState(dotsBlank.board);
  const [theBoxes, setBoxes] =useState(dotsBlank.boxes);
  const [turns, setTurns] = useState(1);
  const [myMoves, setMyMoves] = useState([]);
  const [sendGame, setSendGame] = useState(dotsBlank)
  // Need a way to check game logic for player turn
  const theGames = useSelector((state) => state.myGames);
  // console.log(dotsBlank)
  useEffect(()=>{
    if (route.params.type === 'free') {
      // TODO --- Free Game Stuff

    }
    if (route.params.type === 'new') {
      let current = {...sendGame, players:[getAuthUser().uid, 'free']};
      setSendGame(current)
      // TODO --- New Game Stuff

    }
   else {
    // Existing Game Stuff
    let thisGame = theGames.filter(elem=>elem.key === route.params.type);
    // console.log('my filtered out game', thisGame);
    setSendGame(thisGame[0]);
    setTheLines(thisGame[0].board);
    setBoxes(thisGame[0].boxes);
    if (getAuthUser().uid === thisGame[0].players[0] && thisGame[0].turn ==='p2'){
      setTurns(0)
    }
    if (getAuthUser().uid === thisGame[0].players[1] && thisGame[0].turn ==='p1'){
      setTurns(0)
    }
   }

   return(()=>{console.log('detached')})
  }, []);

  const tap = (num) => {
    // console.log(turns)

    if (turns === 0 ) {
      console.log('No moves left')
      return 
    }

    let next = [...myMoves];
    next.push(num)
    console.log('next is: ',next)
    setMyMoves(next)
    
    let grid = [...theLines]
    if (getAuthUser().uid === sendGame.players[0]){
      grid[num]='a'}
    else {grid[num]='b'}
    setTheLines(grid)
    // console.log(theLines)
    setTurns(0)
  }
  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.header}>

        <View style={styles.scoreContainer}>
          <Image
            style={styles.image}
            source={require('../images/DotsAndBoxesIcon.png')} />
          <Text style={styles.gameText}>Dots and Boxes</Text>
        </View>
        {/* THINGS ARE LONG OR SMALL WIDTH                  SMALL WIDTH       OR        LONG WIDTH */}
      <View style={styles.container2}>
        <View style={styles.smallRow}>
          <Small /><Long  num={0} press={tap} theLines={theLines}/><Small /><Long  num={1} press={tap} theLines={theLines}/><Small /><Long  num={2} press={tap} theLines={theLines}/><Small /><Long  num={3} press={tap} theLines={theLines}/><Small /><Long  num={4} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
          <Small  num={5} press={tap} theLines={theLines}/><Long /><Small  num={6} press={tap} theLines={theLines}/><Long /><Small  num={7} press={tap} theLines={theLines} /><Long /><Small  num={8} press={tap} theLines={theLines}/><Long /><Small  num={9} press={tap} theLines={theLines}/><Long /><Small  num={10} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={11} press={tap} theLines={theLines}/><Small /><Long  num={12} press={tap} theLines={theLines}/><Small /><Long  num={13} press={tap} theLines={theLines}/><Small /><Long  num={14} press={tap} theLines={theLines}/><Small /><Long  num={15} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={16} press={tap} theLines={theLines}/><Long /><Small  num={17} press={tap} theLines={theLines}/><Long /><Small  num={18} press={tap} theLines={theLines} /><Long /><Small  num={19} press={tap} theLines={theLines}/><Long /><Small  num={20} press={tap} theLines={theLines}/><Long /><Small  num={21} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={22} press={tap} theLines={theLines}/><Small /><Long  num={23} press={tap} theLines={theLines}/><Small /><Long  num={24} press={tap} theLines={theLines}/><Small /><Long  num={25} press={tap} theLines={theLines}/><Small /><Long  num={26} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={27} press={tap} theLines={theLines}/><Long /><Small  num={28} press={tap} theLines={theLines}/><Long /><Small  num={29} press={tap} theLines={theLines} /><Long /><Small  num={30} press={tap} theLines={theLines}/><Long /><Small  num={31} press={tap} theLines={theLines}/><Long /><Small  num={32} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={33} press={tap} theLines={theLines}/><Small /><Long  num={34} press={tap} theLines={theLines}/><Small /><Long  num={35} press={tap} theLines={theLines}/><Small /><Long  num={36} press={tap} theLines={theLines}/><Small /><Long  num={37} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={38} press={tap} theLines={theLines}/><Long /><Small  num={39} press={tap} theLines={theLines}/><Long /><Small  num={40} press={tap} theLines={theLines} /><Long /><Small  num={41} press={tap} theLines={theLines}/><Long /><Small  num={42} press={tap} theLines={theLines}/><Long /><Small  num={43} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={44} press={tap} theLines={theLines}/><Small /><Long  num={45} press={tap} theLines={theLines}/><Small /><Long  num={46} press={tap} theLines={theLines}/><Small /><Long  num={47} press={tap} theLines={theLines}/><Small /><Long  num={48} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={49} press={tap} theLines={theLines}/><Long /><Small  num={50} press={tap} theLines={theLines}/><Long /><Small  num={51} press={tap} theLines={theLines} /><Long /><Small  num={52} press={tap} theLines={theLines}/><Long /><Small  num={53} press={tap} theLines={theLines}/><Long /><Small  num={54} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={55} press={tap} theLines={theLines}/><Small /><Long  num={56} press={tap} theLines={theLines}/><Small /><Long  num={57} press={tap} theLines={theLines}/><Small /><Long  num={58} press={tap} theLines={theLines}/><Small /><Long  num={59} press={tap} theLines={theLines}/><Small />
        </View>
      </View>

{/* THIS IS THE SEND BUTTON */}
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
            // ADD THE CREATE GAME FUNCTION HERE!!!!!!!!
            style={styles.gameButton}
            title={"Send Move"}
            onPress={() => {
              // TODO --- This needs to be checking the game type. If 'new' do the below. If (existing), it needs to update
              if (route.params.type === 'new') {
                if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1' && turns === 0) {
                let theGame = {...sendGame, p1:myMoves, turn:'p2', board: theLines, boxes: theBoxes}
                dispatch(addGame(theGame))
                props.navigation.navigate('Home')
                }}
              else {
                if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1' && turns === 0) {
                  let theGame = {...sendGame, p1:myMoves, turn:'p2', board: theLines, boxes: theBoxes}
                  dispatch(updateGame(theGame))
                  props.navigation.navigate('Home')
                  }
                else {
                  let theGame = {...sendGame, p2:myMoves, turn:'p1', board: theLines, boxes: theBoxes}
                  dispatch(updateGame(theGame))
                  props.navigation.navigate('Home')                  
                }
              }
              }}
          />
          {/* TODO --- Want to later add a Redo button so they don't have to close out and get back in to select a different line. This would require changing the board(lines) based on moves and then emptying out moves. Can probably map over moves and then setMoves to [].  */}
          
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
  container2: {
    // marginTop:20,
    flex: .8,
    width: '90%',
    height: '70%',
    // paddingTop: '12%',
    justifyContent: 'center',
    alignItems:'center',
    // borderRadius:4,
    // backgroundColor: '#000'
  },

  largeRow: {
    flexDirection:'row',
    // flexWrap:'wrap',
    // height:'10%',
    flex: .1486,
    backgroundColor:'white',
    borderRadius: 4,
  },
  smallRow: {
    flexDirection:'row',
    // flexWrap:'wrap',
    // height:'10%',
    flex:.0477,
    backgroundColor:'white',
    borderRadius: 5,  
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
  scoreContainer: {
    backgroundColor: 'white',
    // width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default DotsAndBoxesScreen;