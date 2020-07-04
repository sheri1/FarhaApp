import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import MostWantedScreen from '../screens/MostWantedScreen'
import NearScreen from '../screens/NearScreen'
import HallDetailScreen from '../screens/HallDetailScreen'

import { Feather as Icon } from "@expo/vector-icons";

const HomeStack = createStackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: "Home",
          header: null,
        }
      },
      MostWantedScreen:{
        screen:MostWantedScreen,
        navigationOptions: {
          title: "Home",
          header: null,
        }
      },
      NearScreen:{
        screen:NearScreen,
        navigationOptions: {
          title: "Home",
          header: null,
        } 
      },
      HallDetailScreen:{
        screen:HallDetailScreen,
        navigationOptions: {
          title: "HallDetailScreen",
          header: null,
        } 
      }
    },
    {
      initialRouteName: "HomeScreen",
    }
  );
export default HomeStack;
