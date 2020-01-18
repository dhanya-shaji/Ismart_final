import { combineReducers } from "redux";

//Reducers
import LoginReducer from './LoginReducer';
import BrandReducer from "./BrandReducer";
import HomeReducer from "./HomeReducer";
import CategoryReducer from "./CategoryReducer";
import ShoppingCartReducer from "./ShoppingCartReducer";
import OrderReducer from "./OrderReducer";
import SaleReducer from "./SaleReducer"

export default combineReducers({
    login:LoginReducer,
    brand:BrandReducer,
    home:HomeReducer,
    category:CategoryReducer,
    shoppingcart:ShoppingCartReducer,
    order:OrderReducer,
    sale:SaleReducer,
});