import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

import SplashScreen from "../screens/SplashScreen";
import SliderScreen from "../screens/SliderScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Slider: SliderScreen,
    AuthStack: AuthenticationNavigator,
    DrawerNav: DrawerNavigator,
  },
  {
    initialRouteName: "Splash"
  }
);

const MyAppNavigator = createAppContainer(AppNavigator);

export default MyAppNavigator;