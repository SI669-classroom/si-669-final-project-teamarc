import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';

const UserIcon = ({avatar, b}) => {
   return (
      <View style={[styles.gameContainer,{backgroundColor:b} ]}>
          <Image
            style={styles.image}
            tintColor={avatar[0]}
            source={require('../images/Circle.png')} />

          <Image
            style={styles.image}
            tintColor={avatar[1]}
            source={require('../images/Eyes.png')} />

          <Image
            style={styles.image}
            tintColor={avatar[2]}
            source={require('../images/Pupils.png')} />

          <Image
            style={styles.image}
            tintColor={avatar[3]}
            source={require('../images/Mouth2.png')} />
        </View>
      
    )
   }

const styles = StyleSheet.create({
   image: {
      position:'absolute',
      height: '100%',
      width: '100%',
      resizeMode:'contain',
      // marginRight: 20,
      justifyContent: 'flex-start'
    },  
    gameContainer: {
      // flex:1,
      backgroundColor: 'blue',
      // width: 350,
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
      width: 80,
      // padding: 20,
      borderRadius: 10,
      padding: 5,
      // marginBottom: 20,
    },
 });
export default UserIcon;