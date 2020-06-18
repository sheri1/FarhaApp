import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterDoneScreen from '../screens/RegisterDoneScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const AuthenticationStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Login",
        header: null
      }
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        title: "Register",
        header: null
      }
    },
    ForgetPasswordScreen: {
      screen: ForgetPasswordScreen,
      navigationOptions: {
        title: 'ForgetPasswordScreen',
        header: null
      }
    },
    RegisterDoneScreen: {
      screen: RegisterDoneScreen,
      navigationOptions: {
        title: 'RegisterDoneScreen',
        header: null
      }
    },
    ChangePasswordScreen: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        title: "ChangePasswordScreen",
        header: null
      }
    },
  },
  {
    initialRouteName: "LoginScreen"
  }
);

export default AuthenticationStack;