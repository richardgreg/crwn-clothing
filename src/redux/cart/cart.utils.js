// any utils related to cart redux
// Lesson: Add multiple items to cart
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Check for existing cart item
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
    );
  
  // If item exists, add quantity and return a new array so component
  // re-renders, else just return cary item
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
      )
  }
  // Return a neww array if item does not exist with base quant of 1
  // Subsequent cart items can reference the quant
  return [...cartItems, {...cartItemToAdd, quantity: 1}];
}