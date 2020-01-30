import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {persistStore} from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [logger];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// Export for Redux persist: Lesson 126
// Technically, the exports on the const are not needed
export const store = createStore(rootReducer, applyMiddleware(...middlewares))
// Persistent version of store
export const persistor = persistStore(store);

export default {store, persistor};