import React, { Component } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';

function Long(props) {  

   if (props.num === undefined) {
   return (
      <View style={styles.long}>
      </View>
   )
   }
   if (props.theLines[props.num] === 'a') {
      return (
         <TouchableOpacity style={[styles.button, {backgroundColor:'blue'}]} >
         <View>
         </View>
         </TouchableOpacity>
      )
   }
      return (
         <TouchableOpacity style={styles.button} onPress={()=> {props.press(props.num)}}>
         <View>
         </View>
         </TouchableOpacity>
      )
   

}

const styles = StyleSheet.create({
   long: {
   //   flex: .1,
     width: '14.85%',
     backgroundColor:'white'
   },
   button: {
      //   flex: .1,
        width: '14.85%',
        backgroundColor:'#CCC',
        borderRadius:5,
      },
 });

export default Long;