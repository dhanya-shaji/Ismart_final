import { takeLatest, put, call } from "redux-saga/effects";
import { HomeAction } from "../actions";
import { get, post, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";
import { checkIfCustomerExistOfNotFailed } from "../actions/HomeAction";

function* getAllFeeds(action) {
    const reqdata=action.payload;
    console.log('getAllFeeds');
    
    const apiResponse = yield call(get, "GetAllFeeds/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(HomeAction.getAllFeedsSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(HomeAction.getAllFeedsFailed(response));
    }
}

function* getMostOrderedProduct(action) {
    const reqdata=action.payload;
    
    
    const apiResponse = yield call(get, "GetCountOfMostOrderedProduct/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(HomeAction.getMostOrderedProductSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(HomeAction.getMostOrderedProductFailed(response));
    }
}

function* checkIfCustomerExistOfNot(action) {
    const {customer_code}=action.payload;
    
    
    const apiResponse = yield call(get, "IsActiveCustomer?CustomerCode="+customer_code);
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(HomeAction.checkIfCustomerExistOfNotSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(HomeAction.checkIfCustomerExistOfNotFailed(response));
    }
}

function* notificationCount(action){
    const {type}=action.payload;
    if(type==='inc'){
        yield put(HomeAction.notificationCountIncrement());
    }else{
        yield put(HomeAction.notificationCountRemove());
    }
}

export default function* HomeSagas() {
   
    yield takeLatest(HomeAction.GET_ALL_FEEDS, getAllFeeds);
    yield takeLatest(HomeAction.GET_MOST_ORDERED_PRODUCT, getMostOrderedProduct);
    yield takeLatest(HomeAction.CHECK_IF_CUSTOMER_EXIST_OR_NOT, checkIfCustomerExistOfNot);
    yield takeLatest(HomeAction.NOTIFICATION_COUNT, notificationCount);

}