import firebase from 'firebase';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBPtaa2K_8m54ikNQCK_TW7XZ8g1Dw0eE4",
    authDomain: "react-native-firebase-5ed25.firebaseapp.com",
    projectId: "react-native-firebase-5ed25",
    storageBucket: "react-native-firebase-5ed25.appspot.com",
    messagingSenderId: "44520852036",
    appId: "1:44520852036:web:217ba7a5771c6e468f8a11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();

  export default {
    firebase,
    db
  }