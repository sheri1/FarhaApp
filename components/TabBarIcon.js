import React from "react";
import { Image, View } from "react-native";
import {MaterialCommunityIcons,Feather,Entypo,MaterialIcons} from "@expo/vector-icons"

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View 
        style={{ width: '100%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',height:60}}>
          {/* height: 60 */}
        { 
          this.props.name ==  'profile' ?
            <MaterialIcons name="person-outline" size={30} color="#8D8D8D" />
          :
          this.props.name ==  'profile-active' ?
            <MaterialIcons name="person" size={30} color="#924480" />
          :
          this.props.name ==  'search'?
            <Feather name="search" color='#8D8D8D' size={30}/>
          :
          this.props.name ==  'search-active'?
            <Feather name="search" color='#924480' size={30}/>
          :
          // this.props.name ==  'order'?
          //   <Feather name="grid" size={30} color="#8D8D8D" />
          // :
          // this.props.name ==  'order-active'?
          //   <Entypo name="grid" size={35} color="#924480" />
          // :
          this.props.name ==  'home'?
            <MaterialCommunityIcons name="home-outline" size={30} color="#8D8D8D" />
          :
            <MaterialCommunityIcons name="home" size={30} color="#924480" />
        }
      </View>
    );
  }
}