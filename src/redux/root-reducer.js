import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
// local storage object from window browser
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// Config for persistence storage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);