import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD3N426afFp_LZ8UCnJoruNa6QrzW3DDL8",
    authDomain: "crwn-db-a9422.firebaseapp.com",
    databaseURL: "https://crwn-db-a9422.firebaseio.com",
    projectId: "crwn-db-a9422",
    storageBucket: "crwn-db-a9422.appspot.com",
    messagingSenderId: "983365132743",
    appId: "1:983365132743:web:3f371686660e7074aeb9e2",
    measurementId: "G-6SLKE2MRRR"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prommpt:"select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;