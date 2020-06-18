import React , {Component} from "react";
import { Platform, SafeAreaView,ScrollView,StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons, AntDesign,Feather} from "@expo/vector-icons";
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
// import DrawerFirstComponent from '../components/DrawerFirstComponent'
// const CustomDrawerContentComponent = (props) => (
//   <SafeAreaView style={styles.safeAreaStyle}>
//     <DrawerFirstComponent />
//     <ScrollView style={styles.scrollViewStyle}>
//       <DrawerNavigatorItems style={styles.drawerItemsStyle} {...props} />
//     </ScrollView>
//   </SafeAreaView>
// );

import SideBar from '../components/SideBar'
import AppBottom from "./BottomNavigator";
import LogoutScreen from "../screens/LogoutScreen";

import NotificationScreen from "../screens/NotificationScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import OffersScreen from "../screens/OffersScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import ContactScreen from "../screens/ContactScreen";
import CommonQuestionScreen from "../screens/CommonQuestionScreen";

// import ShareAppScreen from "../screens/ShareAppScreen";

import UseRuleScreen from "../screens/UseRuleScreen";
import PolicyScreen from "../screens/PolicyScreen";

const AppStack = createDrawerNavigator(
  {
    AppBottom:{screen: AppBottom},
    NotificationScreen:{screen:NotificationScreen},
    FavoriteScreen:{screen:FavoriteScreen},
    OffersScreen:{screen:OffersScreen},
    AboutAppScreen:{screen:AboutAppScreen},
    ContactScreen:{screen:ContactScreen},
    CommonQuestionScreen:{screen:CommonQuestionScreen},
    UseRuleScreen:{screen:UseRuleScreen},
    PolicyScreen:{screen:PolicyScreen},
    Logout:{screen: LogoutScreen}
  },
  {
    // contentComponent: CustomDrawerContentComponent,
    contentComponent: props => <SideBar {...props} />,
    drawerPosition: "right",
    contentOptions: {
      activeTintColor: "#00BE96",
      inactiveTintColor: "#000",
      itemStyle: {
        ...Platform.select({
          ios: {
            flexDirection: "row"
          },
          android: {
            flexDirection: "row-reverse"
          }
        })
      },
      labelStyle: {
        fontFamily: "tahoma",
        fontSize: 14,
        fontWeight: "normal"
      }
    }
  },
  {
    initialRouteName: "AppBottom"
  }
);

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  scrollViewStyle: {
    backgroundColor: "white",
    width: "100%",
    direction: "rtl"
  },
  drawerItemsStyle: {
    fontFamily: "tahoma",
    color: "white",
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppStack;