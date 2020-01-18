import { ShoppingCartAction } from "../actions";

const initialState = {
    shoppingCartData:[],  
};

export default (state = initialState, action) => {
    switch (action.type) {
                
        case ShoppingCartAction.SAVE_SHOPPING_CART_ITEMS_SUCCESS:
            return {
                ...state,
                shoppingCartData:action.payload,
            };

        default:
            return {
                ...state
            };
    }
};