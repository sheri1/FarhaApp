import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity,Image } from "react-native";
import StyledTextBold from '../StyledTexts/StyledTextBold';
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Header } from 'react-navigation-stack';

class HeaderBackMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  componentDidMount() {
    this.setState({
      title: this.props.title,
    });
  }

  whereToGo(){
    this.props.navigation.goBack()
  }

  render() {
    return (
      <>
        <View style={styles.containerLinear}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.whereToGo()}>
              <AntDesign name='arrowleft' size={25} color={this.props.Iconcolor} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <StyledTextBold style={{ textAlign: 'center', fontSize: 16, color:this.props.Iconcolor}}>
              Vision
            </StyledTextBold> */}
            {/* <Image source={require('../../assets/iconHeader.png')} style={{width:30,height:30}} /> */}
            <Image source={require('../../assets/iconHeaderEz.png')} style={{width:35,height:35}} />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', transform: [{rotateY: '180deg'}] }}>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} 
              style={{borderRadius:25/2,height:25,width:25,
                    justifyContent: 'center', alignItems: 'center'}}>
              <Entypo name='menu' size={25} color={this.props.Iconcolor} />
              {/* <Image style={{width:20,height:15}} source={require('../../assets/images/menu.png')} /> 
              style={{paddingVertical: 10,paddingRight: 10}}
              */}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
  

}

const styles = StyleSheet.create({
  containerLinear: {
    paddingHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: Header.HEIGHT,
    // height:40,
  },
});

export default HeaderBackMenu;