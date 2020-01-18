import { takeLatest, put, call } from "redux-saga/effects";
import { BrandAction } from "../actions";
import { get, post, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";

function* getAllBrands(action) {
    const reqdata=action.payload;
    // const apiResponse = yield call(authorizedGet, "GetAllBrands/",reqdata);
    // console.log('getAllBrands');
    const apiResponse = yield call(get, "GetAllBrands/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(BrandAction.getAllBrandsSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(BrandAction.getAllBrandsFailed(response));
    }
}

function* getAllManufacturers(action) {
    const reqdata=action.payload;
    
    const apiResponse = yield call(get, "GetAllManufacture/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(BrandAction.getAllManufacturersSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(BrandAction.getAllManufacturersFailed(response));
    }
}

function* getAllFeeds(action) {
    const reqdata=action.payload;
    console.log('getAllFeeds');
    
    const apiResponse = yield call(get, "GetAllFeeds/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(BrandAction.getAllFeedsSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(BrandAction.getAllFeedsFailed(response));
    }
}

function* getNewOrderList(action) {
    const reqdata=action.payload;
    console.log('getNewOrderList');
    
    const apiResponse = yield call(get, "GetNewOrderList/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(BrandAction.getNewOrderListSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(BrandAction.getNewOrderListFailed(response));
    }
}

export default function* BrandSagas() {
   
    yield takeLatest(BrandAction.GET_ALL_BRANDS, getAllBrands);
    yield takeLatest(BrandAction.GET_ALL_FEEDS, getAllFeeds);
    yield takeLatest(BrandAction.GET_NEW_ORDER_LIST, getNewOrderList);
    yield takeLatest(BrandAction.GET_ALL_MANUFACTURERS, getAllManufacturers);
}