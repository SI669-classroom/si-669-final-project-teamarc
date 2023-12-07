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
import UserIcon from "../components/UserIcon.js";
import { FAB } from "@rneui/base";

function SettingsScreen(props) {
  const [avOptions, setAvOptions] = useState('Loading')
  const [select, setSelect] = useState('')
  useEffect(()=>{
    loadUserIcon(getAuthUser().uid).then((e)=>{
      // console.log('In the Settings',e)
      setAvOptions({...e})
    })
    return(()=>{})
  }, [])

  const icons = () => {
    if (avOptions === 'Loading') { 
      return (<Text>Loading the Object in.</Text>)
    }
    return (
      <UserIcon avatar={avOptions.avatar}/>      
    )
  }
  const changeColor = (x, color) => {
    let newAv = {...avOptions};
    let newColors = [...avOptions.avatar]
    newColors[x]= color
    newAv.avatar = newColors
    setAvOptions(newAv)
  }

  const dispatch = useDispatch();
  const myKey = getAuthUser().uid;
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.header}>
      {icons()}
      <View style={styles.row}>
        <FAB 
        color='black' title='Face' style={{margin:6}}
        onPress={() => {
          setSelect(0)}}/>
        <FAB 
        color='black' title='Eyes' style={{margin:6}}
        onPress={() => {
          setSelect(1)}}/>
        <FAB 
        color='black' title='Pupils' style={{margin:6}}
        onPress={() => {
          setSelect(2)}}/>
        <FAB 
        color='black' title='Mouth' style={{margin:6}}
        onPress={() => {
          setSelect(3)}}/>
      </View>

      <View style={styles.row}>
      <FAB color="red" style={{margin:6}} onPress={() => {changeColor(select,'red')}}/>
      <FAB color="blue" style={{margin:6}} onPress={() => {changeColor(select,'blue')}}/>
      <FAB color="green" style={{margin:6}} onPress={() => {changeColor(select,'green')}}/>
      <FAB color="yellow" style={{margin:6}} onPress={() => {changeColor(select,'yellow')}}/>
      <FAB color="magenta" style={{margin:6}} onPress={() => {changeColor(select,'magenta')}}/>
      <FAB color="#555" style={{margin:6}} onPress={() => {changeColor(select,'#555')}}/>
      <FAB color="#73F" style={{margin:6}} onPress={() => {changeColor(select,'#73F')}}/>
      <FAB color="black" style={{margin:6}} onPress={() => {changeColor(select,'black')}}/>
      <FAB color="white" style={{margin:6}} onPress={() => {changeColor(select,'white')}}/>
      <FAB color="gray" style={{margin:6}} onPress={() => {changeColor(select,'gray')}}/>
      <FAB color="#492000" style={{margin:6}} onPress={() => {changeColor(select,'#492000')}}/>
      </View>


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
              props.navigation.push('Home')
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
  row:{
    flexDirection:'row',
    flexWrap:'wrap'

  },
  header: {
    paddingTop: '10%',
  },

  gameContainer: {
    // flex:1,
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