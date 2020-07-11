import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import ProfileStack from './ProfileStack'
import HomeStack from './HomeStack'
// import OrderStack from './OrderStack'
import SearchStack from './SearchStack'

import TabBarIcon from "../components/TabBarIcon";
import { Feather as Icon } from "@expo/vector-icons";


HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  if ( routeName == "HallDetailScreen" ){
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "الرئيسية",
    tabBarOptions: { 
      activeTintColor: '#924480',
      inactiveTintColor: '#8D8D8D',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={`home${focused ? "-active" : ""}`} />
    )
  };
}

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  //   if (routeName == "AddPostScreen") {
  //     tabBarVisible = false;
  //   }
  return {
    tabBarVisible,
    tabBarLabel: "البحث",
    tabBarOptions: { 
      activeTintColor: '#924480',
      inactiveTintColor: '#8D8D8D',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={`search${focused ? "-active" : ""}`} />
    )
  };
}

// OrderStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   let routeName = navigation.state.routes[navigation.state.index].routeName;
//   //   if (routeName == "AddPostScreen") {
//   //     tabBarVisible = false;
//   //   }
//   return {
//     tabBarVisible,
//     tabBarLabel: "طلباتي",
//     tabBarOptions: { 
//       activeTintColor: '#924480',
//       inactiveTintColor: '#8D8D8D',
//     },
//     tabBarIcon: ({ focused }) => (
//       <TabBarIcon focused={focused} name={`order${focused ? "-active" : ""}`} />
//     )
//   };
// }

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;
//   if (routeName == "SearchScreen"|| routeName == "MessagesScreen"|| routeName == "FriendsListScreen"
//       || routeName == "TicketDetailScreen") {
//     tabBarVisible = false;
//   }
  return {
    tabBarVisible,
    tabBarLabel: "الملف الشخصي",
    tabBarOptions: { 
      activeTintColor: '#924480',
      inactiveTintColor: '#8D8D8D',
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={`profile${focused ? "-active" : ""}`}/>
    )
  };
}

const AppBottom = createBottomTabNavigator(
  {
    ProfileStack,
    // OrderStack,
    SearchStack,
    HomeStack
  },
  {
    initialRouteName: "HomeStack",
    tabBarOptions: {
      showLabel: true,
      style: {
        paddingHorizontal: 0 ,// Platform.OS === "android" ? 5 : 15,
        paddingVertical: 0 ,// Platform.OS === "android" ? 0 : 30,
        shadowColor: "#444",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: Platform.OS === "android" ? 1 : 4,
        shadowOpacity: Platform.OS === "android" ? 1 : 0.3,
        elevation: 25,
        borderTopColor: "transparent",
        borderTopWidth: 0,
        height: 60,
      }
    }
  }
);

export default AppBottom


// const AppBottom = createBottomTabNavigator(
//   {
//     ProfileStack,
//     OrderStack,
//     SearchStack,
//     HomeStack
//   },
//   {
//     initialRouteName: "HomeStack",
//     defaultNavigationOptions: {
//       backgroundColor: 'transparent',
//       opacity: 0,
//     },
//     tabBarOptions: {
//       tintColor: "#ccc",
//       activeTintColor: "#01597d",
//       inactiveTintColor: "#ccc",
//     },
//     tabBarOptions: {
//       showLabel: false,
//       style: {
//         paddingHorizontal: 0 ,// Platform.OS === "android" ? 5 : 15,
//         paddingVertical: 0 ,// Platform.OS === "android" ? 0 : 30,
//         height: 60,
//         borderTopWidth: 0,
//         borderTopColor: "transparent",
//         shadowColor: "#444",
//         shadowOffset: { width: 0, height: 0 },
//         shadowRadius: Platform.OS === "android" ? 1 : 4,
//         shadowOpacity: Platform.OS === "android" ? 1 : 0.3,
//         elevation: 25
//       }
//     }
//   }
// );