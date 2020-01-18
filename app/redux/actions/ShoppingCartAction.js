import { createAction } from "redux-actions";

//get save and fetch shopping cart info
// export const GET_SHOPPING_CART_ITEMS = "GET_SHOPPING_CART_ITEMS";
// export const getShoppingCartItems = createAction(GET_SHOPPING_CART_ITEMS);

export const SAVE_SHOPPING_CART_ITEMS = "SAVE_SHOPPING_CART_ITEMS";
export const saveShoppingCartItems = createAction(SAVE_SHOPPING_CART_ITEMS);

export const SAVE_SHOPPING_CART_ITEMS_SUCCESS = "SAVE_SHOPPING_CART_ITEMS_SUCCESS";
export const saveShoppingCartItemsSuccess = createAction(SAVE_SHOPPING_CART_ITEMS_SUCCESS);
