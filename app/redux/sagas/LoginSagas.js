import { takeLatest, put, call } from "redux-saga/effects";
import { LoginAction } from "../actions";
import { get, post, postLogin } from "../../config/apiConfig";



function* getLoginShopId(action) {
    console.log('getLoginShopId');
    
    const {loginDetails} = action.payload;
    // const {deviceId}=action.payload;
    
    // let formdata = new FormData(); 
    // formdata.append("CustomerCode", shopId);
    // formdata.append("DeviceId", deviceId);
    // formdata.append("FcmToken", fcmToken);
    // let str = "UserLogin?CustomerCode=" + shopId + "&DeviceId=" + deviceId+"&FcmToken="+fcmToken;
    console.log(loginDetails,'login details');
   

    const apiResponse = yield call(post,'UserLoginV1/',loginDetails);
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(LoginAction.getLoginShopIdSuccess(response)); 
    } else {
        
        yield put(LoginAction.getLoginShopIdFailed(apiResponse));
    }
}

function* staffLoginRequest(action) {
    console.log('staffLoginRequest');
    
    const {loginDetails} = action.payload;

    let str = "StaffLoginV1/";
    console.log(str);

    const apiResponse = yield call(post,str,loginDetails);
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(LoginAction.loginSuccess(response));
    } else {
       
        yield put(LoginAction.loginFailed(apiResponse));
    }
}

export default function* LoginSagas() {
   
    // yield takeLatest(LoginAction.LOGIN_REQUEST, loginRequest);
    yield takeLatest(LoginAction.GET_LOGIN_SHOPID, getLoginShopId);
    yield takeLatest(LoginAction.LOGIN_REQUEST, staffLoginRequest);
}