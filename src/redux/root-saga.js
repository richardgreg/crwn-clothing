import {all, call} from "redux-saga/effects";

import {fetchCollectionsStart} from "./shop/shop.sagas";

export default function* rootSaga() {
  // all() takes in an amount of sagas an calls them all at once
  yield all([
    call(fetchCollectionsStart)
  ])
}