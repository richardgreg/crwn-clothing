import {takeLatest, put, all, call} from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
} from "./user.action";

import {
  auth, googleProvider, createUserProfileDocument
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth) {
  try{
    const userRef = yield call(createUserProfileDocument, userAuth);
    // get the snapshot
    const userSnapshot = yield userRef.get();
    // Pass the data and trigger success
    // put() puts stuff back into our regular redux flow
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    // load user in
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  }catch (error) {
    yield put(signInFailure(error));
    }
};

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* onGoogleSignInStart() {
  // Listen to sign-in start
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
  // Listen to sign-in start
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
};