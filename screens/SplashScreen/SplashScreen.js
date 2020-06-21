import React, { Component } from "react";
import { View, Image, StatusBar, AsyncStorage,Platform,ImageBackground } from "react-native";
import styles from "./SplashScreenStyle";
import Constants from 'expo-constants'
import StyledText from '../../components/StyledTexts/StyledText'
import StyledTextBold from '../../components/StyledTexts/StyledTextBold'
import * as firebase from "firebase"; 

export default class SplashScreen extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.whereToGo();
    }, 3500);
  }

  async whereToGo() {
   // console.log("hello")
    this.props.navigation.navigate("Slider")
  }

  render() {
    return (
      <View style={styles.containerStyle}>          
        <View style={styles.backgroundImg}>
          <ImageBackground source={require("../../assets/images/splash.png")} 
            style={styles.backgroundImg}>
              <Image source={require("../../assets/images/Logo.png")} />
              <StyledTextBold style={styles.TXT1}>فرحة</StyledTextBold>
              <StyledText style={styles.TXT2}>أسرع طريقة لحجز صالات الأفراح</StyledText>
          </ImageBackground>
        </View>
      </View>
    );
  }
}