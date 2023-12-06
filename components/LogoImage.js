import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
// import {DigiArcadeLogo.svg} from '../image';

const LogoImage = () => (
   <Image 
   style={styles.image}
   source = {require('../images/DigiArcadeLogo.png')} />
)

const styles = StyleSheet.create({
   image: {
     width: '80%',
     height: 50,
    //  resizeMode: 'contain'
   },
 });
export default LogoImage;