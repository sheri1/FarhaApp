import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Firebase = {
  // auth aya

  auth:firebase.auth(),
  
  
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password ) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },

  // firestore
  // createNewUser: userData => {
  //   return firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(`${userData.uid}`)
  //     .set(userData)
  // }

  createUserDocument : async (user, additionalData) => {
    // If there is no user, let's not do this.
    if (!user) return;
    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = firebase.firestore().doc(`users/${user.uid}`);
    // Go and fetch a document from that location.
    const snapshot = await userRef.get();
    // If there isn't a document for that user. Let's use information
    // that we got from either Google or our sign up form.
    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user', console.error);
      }
    }
  },

  
  getUserDocument : async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get();
      return { uid, ...userDocument.data() };
    } catch (error) {
      console.error('Error fetching user', error.message);
    }
  }

}

export default Firebase