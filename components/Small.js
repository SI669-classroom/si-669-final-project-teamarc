import React, { Component } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';

function Small(props) {
   
   if (props.num === undefined) {
      return (
         <View style={styles.small}>
   
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
   if (props.theLines[props.num] === 'b') {
      return (
         <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]} >
         <View>
         </View>
         </TouchableOpacity>
      )
   }

      return (
         <TouchableOpacity style={[styles.button, {backgroundColor: props.color ?? '#CCC'}]} onPress={()=> {props.press(props.num)}}>
         {/* <View>
         </View> */}
         </TouchableOpacity>
      )
   

}

const styles = StyleSheet.create({
   small: {
   //   flex: .05,
     width: '4.77%',
     backgroundColor:'black',
     borderRadius:5,
   },
   button: {
      width: '4.77%',
      backgroundColor: 'green',
      borderRadius:5,
      // padding:5,
   },
 });
export default Small;