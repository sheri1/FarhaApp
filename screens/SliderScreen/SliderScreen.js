import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, StatusBar,AsyncStorage,ImageBackground,
          Dimensions,Image,TextInput} from "react-native";
import Constants from 'expo-constants'
import StyledText from "../../components/StyledTexts/StyledText";
import styles from "./SliderScreenStyle";
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
const { width , height} = Dimensions.get('window');
import ViewPager from '@react-native-community/viewpager';
//import * as firebase from "firebase"; 

export default class SliderScreen extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: null,
      activeIndex:0,
      sliderData:[
        {
          id:0,
          image:require('../../assets/images/slide1.png'),
          title:`اكتشاف الصالات`,
          description:`هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى  الصفحة التي يقرأها`
        },
        {
          id:1,
          image:require('../../assets/images/slide2.png'),
          title:`عرض الصالة`,
          description:`هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى  الصفحة التي يقرأها`
        },
        {
          id:2,
          image:require('../../assets/images/slide3.png'),
          title:`حجز الصالة`,
          description:`هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى  الصفحة التي يقرأها`
        },
      ]
    };
  }

  render() {
    return (
      <>
        <View style={styles.containerStyle}>
            <View style={{ height: Constants.statusBarHeight, backgroundColor: 'transparent' }}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View style={{flex:4}}>
              {this.renderSwiper()}
              <View style={styles.dotCont}>
                <View>
                  {this.state.activeIndex == 0 &&
                    this.activeDot()
                  }
                  {
                    this.state.activeIndex != 0 &&
                    this.dot()
                  }
                </View>
                <View>
                  {this.state.activeIndex == 1 &&
                    this.activeDot()
                  }
                  {
                    this.state.activeIndex != 1 &&
                    this.dot()
                  }
                </View>
                <View>
                  {this.state.activeIndex == 2 &&
                    this.activeDot()
                  }
                  {
                    this.state.activeIndex != 2 &&
                    this.dot()
                  }
                </View>
              </View>
            </View>
            <View style={styles.skipAndSaved}>
              <TouchableOpacity style={styles.skipButton} 
                onPress={()=>this.props.navigation.navigate('LoginScreen')}
              >
                <StyledText style={styles.saved}> تخطي </StyledText>
              </TouchableOpacity>
            </View>
        </View>
      </>
    )  
  }

  renderSwiper(){
    const {sliderData} = this.state;
    return (
      <ViewPager style={styles.viewPager} initialPage={0} 
        onPageSelected={(onPageSelected) => this.setState({activeIndex:onPageSelected.nativeEvent.position})}	>
        {sliderData.map((item, index) => {
          return (
            <View style={{width:width,height:height}} key={index}>
              <View style={styles.sliderTitleCont}>
                <StyledText style={styles.text}></StyledText>
              </View>
              <View style={styles.sliderImageCont}>
                <Image source={item.image}
                  style={{height:350,width:width-100,resizeMode: "contain"}}
                />
              </View>
              <View style={styles.sliderDetailCont}>
                <StyledText style={styles.detailTitle}>
                  {item.title}
                </StyledText>
                <StyledText style={styles.detailDesc}>
                  {item.description}
                </StyledText>
              </View>
            </View>
          )
        })}  
      </ViewPager>
    )
  }

  dot(){
    return(
      <View style={{backgroundColor:'#A2A2A2', width: 10, height:10,borderRadius: 10/2,
                    marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
    )
  }
  activeDot(){
    return(
      <View style={{backgroundColor:'#924480', width: 15, height:15,borderRadius: 15/2,
                    marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
    )
  }
}