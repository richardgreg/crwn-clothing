// any utils related to cart redux
// Lesson: Add multiple items to cart
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Check for existing cart item
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );
  
  // If item exists, add quantity and return a new array so component
  // re-renders, else just return cart item
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
      )
  }
  // Return a new array if item does not exist with base quant of 1
  // Subsequent cart items can reference the quant
  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // Check for existing cart item using find() which returns one item
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  // For single quantities: filter == delete item
  if (existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(
    cartItem =>
    // if they match, return a new object (...cartItem)
    // and decrease the quantity
    cartItem.id === cartItemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  );
};