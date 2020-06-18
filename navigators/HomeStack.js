import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import MostWantedScreen from '../screens/MostWantedScreen'
import NearScreen from '../screens/NearScreen'


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
      }
    },
    {
      initialRouteName: "HomeScreen",
    }
  );
export default HomeStack;
