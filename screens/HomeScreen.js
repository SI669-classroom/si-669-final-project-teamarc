import { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { FAB } from "@rneui/base";
import ListItem from "../components/ListItem";
import { getAuthUser, signOut } from '../AuthManager';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import LogoImage from '../components/LogoImage';
import { loadGames, loadUserIcon, subToGames } from '../data/Actions';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { collection, query } from 'firebase/firestore';
import UserIcon from '../components/UserIcon';
function HomeScreen(props) {
  // const thisGame = useSelector((state) => state.myGames);
  const dispatch = useDispatch();
  const [av, setAv] = useState([0,0,0,0])
  const pics = {DotsAndBoxes: require('../images/DotsAndBoxesIcon.png'), HangMan: require('../images/HangManIcon.png'), TicTacToe: require('../images/TicTacToeIcon.png')}
  const myId = getAuthUser().uid;
  const { navigation, route } = props;


  const turnBox = (n) => {
    if (n===0) {
      return (
        <View style={[styles.turnBox, {backgroundColor:'green'}]}>
          <Text style={styles.turnText}>My Turn</Text>
        </View>
      )
    }
    return (
      <View style={[styles.turnBox]}>
        <Text style={styles.turnText}>Their Turn</Text>
      </View>
    )
  }
  const checkTurn = (i) => {
    if (myId === i.players[0] & i.turn === 'p1') {
      return turnBox(0)
    }
    if (myId === i.players[1] & i.turn === 'p2') {
      return turnBox(0)
    }
    else {
      return turnBox(1)
    }
  }
  const checkFinish = (i) => {
    if (myId === i.players[0] & i.finish ==='p1') {
      return true
    }
    if (myId === i.players[1] & i.finish ==='p2') {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    dispatch(subToGames());
    loadUserIcon(getAuthUser().uid).then((e)=>{
      // console.log('next',e)
      setAv([...e.avatar])
    })
   navigation.addListener('beforeRemove', (e) => {
     // This is to stop the user from accidentally going back to the Login Screen.
     if (e.data.action.type === "GO_BACK" | "POP"){
     e.preventDefault();
     }
    //  console.log(getAuthUser())
     console.log(e)
   })

  }, [myGames,route]);
  const myGames = useSelector((state)=>state.myGames)
  // console.log(myGames)

  return(
      <View style={styles.container}>
        <View style={styles.header}> 
        <LogoImage />
        </View>
        <View style={styles.header}>
        <UserIcon avatar={av} b='black' />  
        </View>
      <View style={styles.listContainer}>
      <Text style={styles.activeText}>Active Games</Text>
      </View>
      <FlatList
          data={myGames}
          renderItem={({item})=>{
            let img = `../images/${item.type}Icon.png`
            if (!checkFinish(item)) {
            return (
              <TouchableOpacity
                onPress={()=>{navigation.navigate(item.type, {type: item.key})}}
              >
              <View key={item.key} style={styles.gameContainer}>
              <View>
                <Text>{checkTurn(item)}</Text>
                <Text>Game: {item?.type}</Text>
              </View>
              <Image
            style={styles.image}
            // {item.type ==='DotsAndBoxes' ? source='../images/DotsAndBoxesIcon.png':null}
            source={pics[item.type]} />
              </View>
              </TouchableOpacity>
            ); } else {return (<></>)}
          }}
        />
      <View style={styles.buttonContainer}>
      <FAB
        title='New Game'
        style={{margin:6}}
        color='green'
        onPress={() => {
          navigation.navigate('Games', {type: 'new'})
        }}
      />
      <FAB
        title='Sign Out'
        style={{margin:6}}
        color='darkblue'
        onPress={async () => {
          try {
            await signOut();
          } catch (error) {
            Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
          }
        }}
      />
      <FAB
        title='Settings'
        style={{margin:6}}
        color='blue'
        onPress={() =>
          {
          navigation.navigate('Settings');
          }
        }
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:'12%',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0085D1'
  },
  buttonContainer: {
    // paddingTop:'12%',
    // flex: 1,
    flexDirection:'row',
    width: '100%',
    padding:0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#0085D1'
  },

  header: {
    paddingTop:'5%',
    flexDirection:'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0085D1'
  },

  listContainer: {
    flex: 0.3,
    width: '100%',
    paddingTop: '10%',
    alignItems: 'center',
  },
  gameContainer: {
    backgroundColor: 'white',
    flexWrap:'wrap',
    width: 350,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // height: 90,
    paddingLeft: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 20,
    flexBasis:'end',
    // flexWrap:'wrap-reverse',
    justifyContent: 'flex-end',
    // alignContent:'center',
    alignItems:'flex-end',
    alignSelf:'center'
  },
  turnBox: {
    backgroundColor: 'grey',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  activeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 21,
  },

  turnText: {
    color: 'white',
  }

});

export default HomeScreen;