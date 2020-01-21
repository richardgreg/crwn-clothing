import {createSelector} from "reselect";

const selectCart = state => state.cart;

// input selector: one layer deep
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// input selector: One layer deep
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

// selector accumulating cart items
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

// selector for calculating tota; cart items
export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
