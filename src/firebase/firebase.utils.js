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

// For storing user data
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // Create new user from our user auth object
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // Might need userRef for something
  return userRef;
}

// Lesson 159
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Create collection using the collection key
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  // loop through the array and batch the calls together
  objectsToAdd.forEach(obj => {
    // get document at an empty string i.e. give me a new object in this collection
    // and randomly generate an id
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // fire off batch call using commit
  return await batch.commit();
};

// Get the whole snapshot and convert to an object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase),
      id: doc.id,
      title,
      items
    }
  });
  console.log(transformedCollection);
}

// Firebase configuration
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prommpt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
