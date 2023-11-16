import { useState } from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "@rneui/base";
import ListItem from "../components/ListItem";
import { getAuthUser, signOut } from '../AuthManager';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import LogoImage from '../components/LogoImage';
import { loadGames } from '../data/Actions';
import { Text } from 'react-native';
import { Image } from 'react-native';
function HomeScreen(props) {
  // const listItems = useSelector((state) => state.listItems);
  const dispatch = useDispatch();
  const pics = {DotsAndBoxes: require('../images/DotsAndBoxesIcon.png'), HangMan: require('../images/HangManIcon.png'), TicTacToe: require('../images/TicTacToeIcon.png')}
  const { navigation, route } = props;
  // const subscribeToMessageBoard = () => {
  //   const q = query(
  //     collection(db, 'messageBoard'),
  //     orderBy('timestamp', 'desc'),
  //     limit(3)
  //   );
  //   onSnapshot(q, mbSnapshot => {
  //     const newMessages = [];
  //     mbSnapshot.forEach(mSnap => {
  //       let newMessage = mSnap.data();
  //       newMessage.key = mSnap.id;
  //       newMessages.push(newMessage);
  //     });
  //     setMessages(newMessages);
  //   }
  // )};

  // useEffect(()=>{
  //   subscribeToMessageBoard();
  // }, []);
  useEffect(() => {
    // console.log(getAuthUser().uid)
  dispatch(loadGames(getAuthUser().uid))
   navigation.addListener('beforeRemove', (e) => {
     // This is to stop the user from accidentally going back to the Login Screen.
     if (e.data.action.type === "GO_BACK"){
     e.preventDefault();
     }
    //  console.log(e)
   })

  }, []);
  const myGames = useSelector((state)=>state.myGames)
  // console.log(myGames)

  return(
    <View style={styles.container}>
            <LogoImage />
      <View style={styles.listContainer}>
      </View>
      <Text>Active Games</Text>
      <FlatList
          data={myGames}
          renderItem={({item})=>{
            let img = `../images/${item.type}Icon.png`
            return (
              <View key={item.key} style={styles.gameContainer}>
              <Text>{item.type}</Text>
              <Image
            style={styles.image}
            // {item.type ==='DotsAndBoxes' ? source='../images/DotsAndBoxesIcon.png':null}
            source={pics[item.type]} />
              </View>
            );
          }}
        />

      <FAB
        title='Make Game'
        color='green'
        onPress={() => {
          navigation.navigate('Games', {type: 'new'})
        }}
      />
      <FAB
        title='Find Game'
        color='orange'
        onPress={() => {
          navigation.navigate('Games', {type: 'find'})
        }}
      />
      <FAB
        title='Sign Out'
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
        title='Games Screen'
        color='blue'
        onPress={() =>
          navigation.navigate('Games')
        }
      />
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
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
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

});

export default HomeScreen;