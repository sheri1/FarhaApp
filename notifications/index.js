import React, { Component } from "react";
import  * as firebase from 'firebase';;
// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo';

  import { Form } from "native-base";
const registerPushNotification = async () => {
        
      //check for existing permission 
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      //check the state of existing permisson (آخذ اذن اليوزر لو فش بيرميشن)
      if (existingStatus !== 'granted') {
         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
         finalStatus = status;
       }
       // if no permission exit the function 
       if (finalStatus !== 'granted') {
         alert('Failed to get push token for push notification!');
         return;
       }
 
       //get push notification token 
       let token = await Notifications.getExpoPushTokenAsync();
       console.log(token);
 
       //add token to firebase
       let uid = firebase.auth().currentUser.uid;
      //  firebase.database().ref("users").child(uid).update({
      //    expoPushToken : token
      //  });

      firebase.firestore().collection('users').doc(uid).update({
        expoPushToken : token

       });

}
export { registerPushNotification };


