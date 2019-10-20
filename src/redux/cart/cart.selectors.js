import {createSelector} from 'reselect';

const selectCart = state => state.cart;

//first arg, is an array of input selectors
//second arg, func that returns the value we want out of input selector
// cart arg in second arg, is each value of selectCart
//createSelector creates a memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart)=> cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem)=>accumulatedQuantity + cartItem.quantity,0)
)