import { fork, all } from 'redux-saga/effects';

import LoginSagas from './LoginSagas';
import BrandSagas from './BrandSagas';
import CategorySagas from './CategorySagas';
import ShoppingCartSagas from './ShoppingCartSagas';
import OrderSagas from './OrderSagas';
import SaleSagas from './SaleSagas';
import HomeSagas from './HomeSagas'
export default function* sagas(){
    yield all([fork(LoginSagas)]);
    yield all([fork(BrandSagas)]);
    yield all([fork(CategorySagas)]);
    yield all([fork(ShoppingCartSagas)]);
    yield all([fork(OrderSagas)]);
    yield all([fork(SaleSagas)]);
    yield all([fork(HomeSagas)]);
}