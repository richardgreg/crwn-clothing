import {takeLatest, call, put, all} from "redux-saga/effects";

import {
  firestore, convertCollectionsSnapshotToMap
}from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess, fetchCollectionsFailure
}from "./shop.action";

import ShopActionTypes from "./shop.types";

// Performs our Async fxn
export function* fetchCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    // call is the code, effect inside of the generator fxn that invokes the
    // method. It takes a fxn as an arg and a scnd arg which is an arg for the
    // first arg
    const collectionsMap = yield call (convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error))
  }
  
  // REDUX THUNK!!!
  // Send us a snapshot Whenever the collectionRef updates or runs for the
  // first time
  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   })
  //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

// Pause when a specific action type that we want comes in
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
};

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
};
