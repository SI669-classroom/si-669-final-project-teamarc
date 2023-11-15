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
function HomeScreen(props) {
  // const listItems = useSelector((state) => state.listItems);
  const dispatch = useDispatch();
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
    console.log(getAuthUser().uid)
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
  console.log(myGames)

  return(
    <View style={styles.container}>
            <LogoImage />
      <View style={styles.listContainer}>
      </View>
      <Text>Active Games</Text>
      <FlatList
          data={myGames}
          renderItem={({item})=>{
            return (
              <View key={item.key}>
              <Text>{item.type}</Text>
              <Text>{item.key}</Text>
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
});

export default HomeScreen;