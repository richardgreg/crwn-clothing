import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// Type is the action type
// Payload can be anything you want it to be
export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})