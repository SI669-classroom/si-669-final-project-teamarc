import React, { Component } from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';



function LogoImage() {
   const {width} = useWindowDimensions();
   const height = Math.round((width * 1) / 8);
   return (
   <Image 
   style={[styles.image,{height:height}]}
   source = {require('../images/DigiArcadeLogo.png')} />
)}

const styles = StyleSheet.create({
   image: {
     width: '80%',
     height: 50,
    //  resizeMode: 'contain'
   },
 });
export default LogoImage;