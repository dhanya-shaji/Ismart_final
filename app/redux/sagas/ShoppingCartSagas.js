import { takeLatest, put, call } from "redux-saga/effects";
import { ShoppingCartAction } from "../actions";
import { get, post, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";

// function* getShoppingCartItems(action) {
//     yield put({ type: ShoppingCartAction.getShoppingCartItems});
// }

function* saveShoppingCartItems(action) {
    console.log('saveShoppingCartItems');
    
    const {shoppingCartData}=action.payload;
    console.log(shoppingCartData);

    yield put(ShoppingCartAction.saveShoppingCartItemsSuccess(shoppingCartData));
}

export default function* ShoppingCartSagas() {
   
    // yield takeLatest(ShoppingCartAction.GET_SHOPPING_CART_ITEMS, getShoppingCartItems);
    yield takeLatest(ShoppingCartAction.SAVE_SHOPPING_CART_ITEMS, saveShoppingCartItems);
}





// function* saveShoppingCartItems(action) {

//     const {shoppingCartData}=action.payload;
//     yield put({ type: ShoppingCartAction.SAVE_SHOPPING_CART_ITEMS, shoppingCartData: shoppingCartData, });
// }

// const apiResponse = yield call(get, "GetAllProductsByMasterType/?Type=" + type + "&Id=" + categoryId);
        
    // if (apiResponse.resultCode === 1) {
    //     const response = apiResponse.response;
    //     yield put(CategoryAction.getAllProductsByMasterTypeSuccess(response)); 
    // } else {
    //     const response = apiResponse.error;
    //     yield put(CategoryAction.getAllProductsByMasterTypeFailed(response));
    // }