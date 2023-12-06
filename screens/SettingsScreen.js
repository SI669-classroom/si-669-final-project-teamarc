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
import { addGame, loadUserIcon, updateUserIcon } from "../data/Actions.js";

function SettingsScreen(props) {
  const [avOptions, setAvOptions] = useState('Loading')
  useEffect(()=>{
    loadUserIcon(getAuthUser().uid).then((e)=>{
      console.log('next',e)
      setAvOptions({...e})
    })
    return(()=>{})
  }, [])

  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.header}>

        <View style={styles.gameContainer}>
          <Image
            style={styles.image}
            tintColor={avOptions?.avatar[0]}
            source={require('../images/Circle.png')} />

          <Image
            style={styles.image}
            tintColor={avOptions?.avatar[1]}
            source={require('../images/Eyes.png')} />

          <Image
            style={styles.image}
            tintColor={avOptions?.avatar[2]}
            source={require('../images/Pupils.png')} />

          <Image
            style={styles.image}
            tintColor={avOptions?.avatar[3]}
            source={require('../images/Mouth2.png')} />
        </View>

        <Text>{JSON.stringify(avOptions)}</Text>

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
            title={"Update Profile"}
            onPress={() => {
              updateUserIcon(avOptions)
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

  gameContainer: {
    backgroundColor: 'blue',
    // width: 350,
    // flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width:100,
    // padding: 20,
    borderRadius: 10,
    // marginBottom: 20,
  },

  image: {
    position:'absolute',
    height: '100%',
    width: '100%',
    resizeMode:'contain',
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

export default SettingsScreen;