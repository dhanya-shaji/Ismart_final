import { takeLatest, put, call } from "redux-saga/effects";
import { SaleAction } from "../actions";
import { get, post, fileUpload, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";


function* getAllOrderByStaff(action) {
    console.log('getAllOrderByStaff');
    
    const {staffId,} = action.payload;

    let str = "GetAllOrderByStaff?StaffId=" + staffId ;

    console.log(str);

    const apiResponse = yield call(get, "GetAllOrderByStaff?StaffId=" + staffId );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(SaleAction.getAllOrderByStaffSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(SaleAction.getAllOrderByStaffFailed(apiResponse));
    }
}

function* getAllAcceptedOrderByStaff(action) {
    console.log('getAllAcceptedOrderByStaff');
    
    const {staffId,} = action.payload;

    let str = "GetAllAcceptedOrderByStaff?StaffId=" + staffId ;

    console.log(str);

    const apiResponse = yield call(get, "GetAllAcceptedOrderByStaff?StaffId=" + staffId );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(SaleAction.getAllAcceptedOrderByStaffSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(SaleAction.getAllAcceptedOrderByStaffFailed(apiResponse));
    }
}

function* orderAcceptStatus(action) {
    console.log('orderAcceptStatus');
    
    const {status,staffId,orderId} = action.payload;

    let str = "OrderAcceptStatus?status=" + status + "&staffId=" + staffId + "&orderId=" + orderId ;

    console.log(str);

    const apiResponse = yield call(get, "OrderAcceptStatus?status=" + status + "&staffId=" + staffId + "&orderId=" + orderId );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(SaleAction.orderAcceptStatusSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(SaleAction.orderAcceptStatusFailed(apiResponse));
    }
}

function* updateOrderStatus(action) {
    console.log('updateOrderStatus');
    
    const {staffId,orderId,status} = action.payload;

    // UpdateOrderStatus?StaffId=2&OrderId=2&Status=4

    let str = "UpdateOrderStatus?StaffId=" + staffId  + "&OrderId=" + orderId  + "&Status=" + status   ;

    console.log(str);

    const apiResponse = yield call(get, "UpdateOrderStatus?StaffId=" + staffId + "&OrderId=" + orderId + "&Status=" + status );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(SaleAction.updateOrderStatusSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(SaleAction.updateOrderStatusFailed(apiResponse));
    }
}

export default function* OrderSagas() {
   
    yield takeLatest(SaleAction.GET_ALL_ORDER_BY_STAFF, getAllOrderByStaff);
    yield takeLatest(SaleAction.GET_ALL_ACCEPTED_ORDER_BY_STAFF, getAllAcceptedOrderByStaff);
    yield takeLatest(SaleAction.ORDER_ACCEPT_STATUS, orderAcceptStatus);
    yield takeLatest(SaleAction.UPDATE_ORDER_STATUS, updateOrderStatus);
}