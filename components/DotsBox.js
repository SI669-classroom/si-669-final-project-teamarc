import React, { Component } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';

function DotsBox(props) {  

   if (props?.num === 0) {
   return (
      <View style={styles.long}>
      </View>
   )
   }
   if (props.num === 'a') {
      return (
         <View style={[styles.long, {backgroundColor:'darkblue'}]} >
         </View>
      )
   }
   if (props.num === 'b') {
      return (
         
         <View style={[styles.long, {backgroundColor:'darkred'}]}>
         </View>
         
      )
   }
   return (
      <View style={styles.long}>
      </View>
   )
}

const styles = StyleSheet.create({
   long: {
   //   flex: .1,
     width: '14.85%',
     backgroundColor:'white',
     borderRadius:20,
   },
   button: {
      //   flex: .1,
        width: '14.85%',
        backgroundColor:'#CCC',
        borderRadius:5,
      },
 });

export default DotsBox;