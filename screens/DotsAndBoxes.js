import { useEffect, useState } from "react";
import {
  Dimensions, StyleSheet, View, Text, FlatList, Image,
  TouchableOpacity, TouchableHighlight, Alert
} from "react-native";
import { Button } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import LogoImage from '../components/LogoImage.js'
import { getAuthUser } from "../AuthManager.js";
import { addGame, deleteGame, loadUserIcon, updateGame } from "../data/Actions.js";
import Small from "../components/Small.js";
import Long from "../components/Long.js";
import { dotsBlank } from "../data/DotsBlank.js";
import UserIcon from "../components/UserIcon.js";
import DotsBox from "../components/DotsBox.js";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function DotsAndBoxesScreen(props) {
  const { navigation, route } = props;
  const [theLines, setTheLines] = useState(dotsBlank.board);
  const [theBoxes, setBoxes] =useState(dotsBlank.boxes);
  const [turns, setTurns] = useState(1);
  const [myMoves, setMyMoves] = useState([]);
  const [sendGame, setSendGame] = useState(dotsBlank)
  const [avs, setAvs] = useState([[0,0,0,0],[0,0,0,0]]);
  const [fin, setFin] = useState('no')
  const getBox = [[0,5,6,11],[1,6,7,12],[2,7,8,13],[3,8,9,14],[4,9,10,15],[11,16,17,22],[12,17,18,23],[13,18,19,24],[14,19,20,25],[15,20,21,26],[22,27,28,33],[23,28,29,34],[24,29,30,35],[25,30,31,36],[26,31,32,37],[33,38,39,44],[34,39,40,45],[35,40,41,46],[36,41,42,47],[37,42,43,48],[44,49,50,55],[45,50,51,56],[46,51,52,57],[47,52,53,58],[48,53,54,59]]
  // Need a way to check game logic for player turn
  const theGames = useSelector((state) => state.myGames);
  // console.log(dotsBlank)
  const getIcon = (x) => {
    let q = [0,1]
    // console.log(x)
    // console.log(x?.length)
    if (x[1]==='free'){
  
      loadUserIcon(x[0]).then((e)=>{
        // console.log('next',e)
        q = [[...e.avatar],['black','black','black','black']]
        // setAvs([[...e.avatar],['black','black','black','black']])
        // return e.avatar
        // console.log(q)
        setAvs(q)
      })}
      else {
        loadUserIcon(x[0]).then((e)=>{
          q[0]=[...e.avatar]
        }).then(
        loadUserIcon(x[1]).then((e)=>{
          
          q[1]=[...e.avatar]
          setAvs(q)
        }))
      }
    }
  useEffect(()=>{

    if (route.params.type === 'new') {
      let current = {...sendGame, players:[getAuthUser().uid, 'free']};
      setSendGame(current)
      //  New Game Stuff
      getIcon(current.players)
    }
   else {
    // Existing Game Stuff
    // console.log(route.params.type)
    let thisGame = theGames.filter(elem=>elem.key === route.params.type);
    // console.log('my filtered out game', thisGame);
    setSendGame(thisGame[0]);
    setTheLines(thisGame[0].board);
    setBoxes(thisGame[0].boxes);
    getIcon(thisGame[0].players);
    setFin(thisGame[0].finish)
    if (getAuthUser().uid === thisGame[0].players[0] && thisGame[0].turn ==='p2'){
      setTurns(0)
    }
    if (getAuthUser().uid === thisGame[0].players[1] && thisGame[0].turn ==='p1'){
      setTurns(0)
    }
   }

  //  return(()=>{console.log('detached')})
  }, []);

  const countBoxes = (p) => {
    let theCount = 0;
    for (let i = 0, len = theBoxes.length; i < len; i++) {
      if (p === theBoxes[i]) {
        theCount++
      }
    }
    if (theCount > 12){
      return 1
    }
    return 0
  }
  const gettingBoxes = (grid) => {
    // console.log(grid)
    let fillBox = []
    for (let i = 0, len = theBoxes.length; i < len; i++) {
      let myBox = []
      if (theBoxes[i] !== 0) {
        continue
      }
      for (let q = 0, len = getBox[i].length; q < len; q++){
        // console.log(getBox[i][q])
        if (grid[getBox[i][q]] !== 0) {
          myBox.push(0)
        }
      }
      // console.log('myBox for ',i,'is ',myBox)
      if (myBox.length === 4) {
        fillBox.push(i)
      }
      
    }
    return fillBox;

  }
  const tap = (num) => {
    // console.log(turns)

    if (turns === 0 ) {
      // console.log('No moves left')
      return 
    }

    let next = [...myMoves];
    next.push(num)
    // console.log('next is: ',next)
    // TODO --- Check for boxes that have been filled if filled, turn = 1 
    setMyMoves(next)
    
    let grid = [...theLines]
    if (getAuthUser().uid === sendGame.players[0]){
      grid[num]='a'}
    else {grid[num]='b'}
    let newBoxes = gettingBoxes(grid)
    // console.log(newBoxes)
    if (newBoxes.length === 0) {
    setTheLines(grid)
    // console.log(theLines)
    setTurns(0)
    }
    else {
      let boxes = [...theBoxes]
      for (let i = 0, len = newBoxes.length; i < len; i++) {
        if (getAuthUser().uid === sendGame.players[0]) {
          boxes[newBoxes[i]]='a'
        } else {
          boxes[newBoxes[i]]='b'
        }
      }
      if (boxes.includes(0)===false){
        // console.log('can end game')
        if (getAuthUser().uid === sendGame.players[0]){
        setFin('p1')}
        else{
          setFin('p2')
        }

      }
      setBoxes(boxes);
      setTheLines(grid);
      setTurns(1);
      
    }
  }
  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.header}>

        <View style={styles.scoreContainer}>
          <UserIcon avatar={avs[0]} b={'#00C'} />
          <View>{sendGame.turn === 'p1' ? <FontAwesome5 name="hand-point-left" size={36} color="blue" />:<FontAwesome5 name="hand-point-right" size={36} color="red" />}</View>
          <UserIcon avatar={avs[1]} b={'#C00'}/>
          
          {/* <Text style={styles.gameText}>HI</Text> */}
        </View>
        {/* THINGS ARE LONG OR SMALL WIDTH                  SMALL WIDTH       OR        LONG WIDTH */}
      <View style={styles.container2}>
        <View style={styles.smallRow}>
          <Small /><Long  num={0} press={tap} theLines={theLines}/><Small /><Long  num={1} press={tap} theLines={theLines}/><Small /><Long  num={2} press={tap} theLines={theLines}/><Small /><Long  num={3} press={tap} theLines={theLines}/><Small /><Long  num={4} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
          <Small  num={5} press={tap} theLines={theLines}/><DotsBox num={theBoxes[0]} /><Small  num={6} press={tap} theLines={theLines}/><DotsBox num={theBoxes[1]} /><Small  num={7} press={tap} theLines={theLines} /><DotsBox num={theBoxes[2]} /><Small  num={8} press={tap} theLines={theLines}/><DotsBox num={theBoxes[3]} /><Small  num={9} press={tap} theLines={theLines}/><DotsBox num={theBoxes[4]} /><Small  num={10} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={11} press={tap} theLines={theLines}/><Small /><Long  num={12} press={tap} theLines={theLines}/><Small /><Long  num={13} press={tap} theLines={theLines}/><Small /><Long  num={14} press={tap} theLines={theLines}/><Small /><Long  num={15} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={16} press={tap} theLines={theLines}/><DotsBox num={theBoxes[5]} /><Small  num={17} press={tap} theLines={theLines}/><DotsBox num={theBoxes[6]} /><Small  num={18} press={tap} theLines={theLines} /><DotsBox num={theBoxes[7]} /><Small  num={19} press={tap} theLines={theLines}/><DotsBox num={theBoxes[8]} /><Small  num={20} press={tap} theLines={theLines}/><DotsBox num={theBoxes[9]} /><Small  num={21} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={22} press={tap} theLines={theLines}/><Small /><Long  num={23} press={tap} theLines={theLines}/><Small /><Long  num={24} press={tap} theLines={theLines}/><Small /><Long  num={25} press={tap} theLines={theLines}/><Small /><Long  num={26} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={27} press={tap} theLines={theLines}/><DotsBox num={theBoxes[10]} /><Small  num={28} press={tap} theLines={theLines}/><DotsBox num={theBoxes[11]} /><Small  num={29} press={tap} theLines={theLines} /><DotsBox num={theBoxes[12]} /><Small  num={30} press={tap} theLines={theLines}/><DotsBox num={theBoxes[13]} /><Small  num={31} press={tap} theLines={theLines}/><DotsBox num={theBoxes[14]} /><Small  num={32} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={33} press={tap} theLines={theLines}/><Small /><Long  num={34} press={tap} theLines={theLines}/><Small /><Long  num={35} press={tap} theLines={theLines}/><Small /><Long  num={36} press={tap} theLines={theLines}/><Small /><Long  num={37} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={38} press={tap} theLines={theLines}/><DotsBox num={theBoxes[15]} /><Small  num={39} press={tap} theLines={theLines}/><DotsBox num={theBoxes[16]} /><Small  num={40} press={tap} theLines={theLines} /><DotsBox num={theBoxes[17]} /><Small  num={41} press={tap} theLines={theLines}/><DotsBox num={theBoxes[18]} /><Small  num={42} press={tap} theLines={theLines}/><DotsBox num={theBoxes[19]} /><Small  num={43} press={tap} theLines={theLines}/>
        </View>
        <View style={styles.smallRow}>
        <Small /><Long  num={44} press={tap} theLines={theLines}/><Small /><Long  num={45} press={tap} theLines={theLines}/><Small /><Long  num={46} press={tap} theLines={theLines}/><Small /><Long  num={47} press={tap} theLines={theLines}/><Small /><Long  num={48} press={tap} theLines={theLines}/><Small />
        </View>
        <View style={styles.largeRow}>
        <Small  num={49} press={tap} theLines={theLines}/><DotsBox num={theBoxes[20]} /><Small  num={50} press={tap} theLines={theLines}/><DotsBox num={theBoxes[21]} /><Small  num={51} press={tap} theLines={theLines} /><DotsBox num={theBoxes[22]} /><Small  num={52} press={tap} theLines={theLines}/><DotsBox num={theBoxes[23]} /><Small  num={53} press={tap} theLines={theLines}/><DotsBox num={theBoxes[24]} /><Small  num={54} press={tap} theLines={theLines}/>
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

            style={styles.gameButton}
            
            title={fin==='no'?'Send Move' : 'Finish Game'}
            onPress={() => {
              // Create Game -- This needs to be checking the game type. If 'new' do the below. If (existing), it needs to update
              if (route.params.type === 'new') {
                if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1' && turns === 0) {
                let theGame = {...sendGame, p1:myMoves, turn:'p2', board: theLines, boxes: theBoxes}
                dispatch(addGame(theGame))
                props.navigation.navigate('Home')
                }}
              else {
                // Delete Game -- Check if game was finished by other player and tidy up Firebase
                if (sendGame.finish !== 'no'){
                  let winner = null
                  if (getAuthUser().uid === sendGame.players[0]) {
                    winner = countBoxes('a')
                  } else { winner = countBoxes('b')}
                    Alert.alert((winner===0?'You Lost :( ':'You Won!!'),'',[{text:'Finish', onPress:()=>{
                      // TODO --- If want to add score/history at some point do it here
                      console.log("Yup Lost")
                      dispatch(deleteGame(sendGame.key))
                      props.navigation.navigate('Home')
                    }}])
                  
                  
                }
                // Check if game was finished by this player
                else if (fin !== 'no') {
                  let winner = null
                  if (getAuthUser().uid === sendGame.players[0]) {
                    winner = countBoxes('a')
                  } else { winner = countBoxes('b')}
                  if (winner === 0) {
                  Alert.alert("You Lost :( ")
                  } else {
                    Alert.alert((winner===0?'You Lost :( ':'You Won!!'),'',[{text:'Finish', onPress:()=>{
                      if (getAuthUser().uid === sendGame.players[0]) {
                        let theGame = {...sendGame, p1:myMoves, turn:'p2', board: theLines, boxes: theBoxes, finish:'p1'}
                        dispatch(updateGame(theGame))
                        props.navigation.navigate('Home')
                      } else {
                        let theGame = {...sendGame, p2:myMoves, turn:'p1', board: theLines, boxes: theBoxes, finish:'p2'}
                        dispatch(updateGame(theGame))
                        props.navigation.navigate('Home')
                      }
                    }}])
                  }
                } else {
                // Regular Move -- Check which player we are and if moves are spent to send the correct turn back
                if (getAuthUser().uid === sendGame.players[0] && sendGame.turn ==='p1' && turns === 0) {
                  let theGame = {...sendGame, p1:myMoves, turn:'p2', board: theLines, boxes: theBoxes}
                  dispatch(updateGame(theGame))
                  props.navigation.navigate('Home')
                  }
                if (getAuthUser().uid === sendGame.players[1] && sendGame.turn ==='p2' && turns === 0) {
                  let theGame = {...sendGame, p2:myMoves, turn:'p1', board: theLines, boxes: theBoxes}
                  dispatch(updateGame(theGame))
                  props.navigation.navigate('Home')                  
                }
              }}




              }}
          ></Button>
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
    borderRadius:5,
    backgroundColor: '#FFF'
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
    justifyContent:'space-evenly',
    height: 90,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default DotsAndBoxesScreen;