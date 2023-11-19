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
import { addGame } from "../data/Actions.js";
import Small from "../components/Small.js";
import Long from "../components/Long.js";

function DotsAndBoxesScreen(props) {
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

      <View style={styles.container2}>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
        </View>
        <View style={styles.theGame}>
          <Small t='b' color='blue'/><Long /><Small t='b'/><Long /><Small t='b' /><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/>
        </View>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
        </View>
        <View style={styles.theGame}>
          <Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/>
        </View>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
        </View>
        <View style={styles.theGame}>
          <Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/>
        </View>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
        </View>
        <View style={styles.theGame}>
          <Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/>
        </View>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
        </View>
        <View style={styles.theGame}>
          <Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/><Long /><Small t='b'/>
        </View>
        <View style={styles.theGame1}>
          <Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small /><Long t='b'/><Small />
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
              let theGame = {type:'DotsAndBoxes', players:[myKey, 'free'], p1Moves:[1], p2Moves:[0], turn:'p2'}
              dispatch(addGame(theGame))
              props.navigation.navigate('Home')
            }}
          />
          
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
    width: '100%',
    height: '60%',
    // paddingTop: '12%',
    justifyContent: 'center',
    alignItems:'center',
    // borderRadius:4,
    // backgroundColor: '#000'
  },

  theGame: {
    flexDirection:'row',
    // flexWrap:'wrap',
    // height:'10%',
    flex: .1385,
    backgroundColor:'#999',
    borderRadius: 4,
  },
  theGame1: {
    flexDirection:'row',
    // flexWrap:'wrap',
    // height:'10%',
    flex:.028,
    backgroundColor:'#999',
    borderRadius: 4,  
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
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    padding: 20,
    borderRadius: 10,
    // marginBottom: 20,
  },
});

export default DotsAndBoxesScreen;