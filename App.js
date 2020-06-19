import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import { I18nManager } from "react-native";

import MyAppNavigator from "./navigators/MyAppNavigator";
import NotificationScreen from './screens/NotificationScreen'
import Firebase, { FirebaseProvider } from './config/Firebase'

// import {decode, encode} from './node_modules/Base64'
//  if (!global.btoa) {  global.btoa = encode }
//  if (!global.atob) { global.atob = decode }




//import * as firebase from 'firebase';
// import 'firebase/firestore';
// require("firebase/firestore");
//import Firebase , {FirebaseContext} from './services/firebase/'



// var firebaseConfig = {
//   apiKey: "AIzaSyBz9-AYNlazedYbCe3u7kTTVv1QTwAPHC4",
//   authDomain: "graduationproject-22b8c.firebaseapp.com",
//   databaseURL: "https://graduationproject-22b8c.firebaseio.com",
//   projectId: "graduationproject-22b8c",
//   storageBucket: "graduationproject-22b8c.appspot.com",
//   messagingSenderId: "764813434020",
//   appId: "1:764813434020:web:e8a6523cb34df5be339a31",
//   measurementId: "G-QT70KJQRH1"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);



///////////////////// for firestore 

// const firebaseConfig = { ... }  // apiKey, authDomain, etc. (see above)

// const dbh = firebase.firestore();

// dbh.collection("characters").doc("mario").set({
//   employment: "plumber",
//   outfitColor: "red",
//   specialAttack: "fireball"
// }).catch(error =>console.log(error));



///////////////////////////






export default class App extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    isLoadingComplete: false,
  };

  render() {
    I18nManager.allowRTL(false); //work on ios only
    const isRTLAndroid = Platform.OS === "android" && I18nManager.isRTL; //work on android only
    if (isRTLAndroid) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      // Expo.Updates.reload();
    }
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        // <LoginScreen></LoginScreen>
        // <RegisterScreen></RegisterScreen>
        // <RegisterDoneScreen></RegisterDoneScreen>
        // <ForgetPasswordScreen></ForgetPasswordScreen>
        // <ChangePasswordScreen></ChangePasswordScreen>
        // <SplashScreen></SplashScreen>
        // <SliderScreen></SliderScreen>
        // <ProfileScreen></ProfileScreen>
        // <EditProfileScreen></EditProfileScreen>
        // <NotificationScreen></NotificationScreen>
        // <PolicyScreen></PolicyScreen>
        // <UseRuleScreen></UseRuleScreen>
        // <AboutAppScreen></AboutAppScreen>
        // <CommonQuestionScreen></CommonQuestionScreen>
        // <ContactScreen></ContactScreen>
        // <ContactDoneScreen></ContactDoneScreen>
        // <HomeScreen></HomeScreen>
        // <MostWantedScreen></MostWantedScreen>
        // <OffersScreen></OffersScreen>
        // <FavoriteScreen></FavoriteScreen>
        // <AddHallScreen></AddHallScreen>
        // <AddHallStep3Screen></AddHallStep3Screen>
        // <AddHallStep2Screen></AddHallStep2Screen>
        // <AddHallDoneScreen></AddHallDoneScreen>
        // <SearchScreen></SearchScreen>
        // <OrderDetailScreen></OrderDetailScreen>
        // <OrdersScreen></OrdersScreen>
       
       
       <FirebaseProvider value={Firebase}>
           <MyAppNavigator />
        </FirebaseProvider>

      );
    }
  }

  _loadResourcesAsync = async () => {
    try {
      return Promise.all([
        await Font.loadAsync({
          ...Icon.Ionicons.font,
          ...Icon.MaterialIcons.font,
          ...Icon.AntDesign.font,
          ...Icon.Entypo.font,
          ...Icon.EvilIcons.font,
          ...Icon.MaterialCommunityIcons.font,
          ...Icon.FontAwesome.font,
          ...Icon.Foundation.font,
          ...Icon.Octicons.font,
          cairo: require("./assets/fonts/Cairo-Regular.otf"),
          cairoBold: require("./assets/fonts/Cairo-Bold.otf"),
          tahoma:require('./assets/fonts/TAHOMA.otf'),
          tahomaBold:require('./assets/fonts/TAHOMA_BOLD.otf'),
          sansArabic:require('./assets/fonts/TheSansArabic-Plain.ttf'),
          sansArabicBold:require('./assets/fonts/TheSansArabic-Bold.ttf'),
          sansArabicExtraLight:require('./assets/fonts/TheSansArabic-ExtraLight.otf')
        }),
        await Asset.loadAsync([
          // Asset.fromModule(require("./assets/images/comment_icon.png")).uri,
        ]),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eb3345",
    justifyContent: "flex-end",
  }
});