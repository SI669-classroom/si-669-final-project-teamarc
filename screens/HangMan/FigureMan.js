import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


// type HangmanDrawingProps = {
//     wrongWord: number
//   }

function FigureMan(props) {
    const { wrongWord } = props;
    // console.log(wrongWord)
    const Rope = <Image style={styles.image} source={require('../../images/Rope.png')} />
    const Head = <Image style={styles.image} source={require('../../images/Head.png')} />
    const Body = <Image style={styles.image} source={require('../../images/Body.png')} />
    const LeftArm = <Image style={styles.image} source={require('../../images/LeftArm.png')} />
    const RightArm = <Image style={styles.image} source={require('../../images/RightArm.png')} />
    const LeftLeg = <Image style={styles.image} source={require('../../images/LeftLeg.png')} />
    const RightLeg = <Image style={styles.image} source={require('../../images/RightLeg.png')} />
    const bodyParts = [Rope,Head,Body, LeftArm, RightArm, LeftLeg, RightLeg]

  return (
    <View style={styles.container}>
      {/* {bodyParts.slice(0, wrongWord)} */}
      {bodyParts[wrongWord]}
    </View>
  )
}

export default FigureMan

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // margin: '5%',
    marginBottom: '12%',
  },
})