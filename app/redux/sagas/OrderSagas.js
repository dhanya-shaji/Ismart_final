import { takeLatest, put, call } from "redux-saga/effects";
import { OrderAction } from "../actions";
import { get, post, fileUpload, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";

function* getAllOrders(action) {
    const reqdata=action.payload;
    
    const apiResponse = yield call(get, "GetAllOrderList/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(OrderAction.getAllOrdersSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(OrderAction.getAllOrdersFailed(response));
    }
}

function* getOrderById(action) {
    console.log('getOrderById');
    
    const {orderId,} = action.payload;

    let str = "GetOrderById?OrderId=" + orderId ;

    console.log(str);

    const apiResponse = yield call(get, "GetOrderById?OrderId=" + orderId );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(OrderAction.getOrderByIdSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(OrderAction.getOrderByIdFailed(apiResponse));
    }
}

function* getAllOrderByCustomerCode(action) {
    console.log('getOrderByCustomerCode');
    
    const {customerCode,} = action.payload;

    let str = "GetAllOrderByCustomerCode?CustomerCode=" + customerCode ;

    console.log(str);

    const apiResponse = yield call(get, "GetAllOrderByCustomerCode?CustomerCode=" + customerCode );
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(OrderAction.getAllOrderByCustomerCodeSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(OrderAction.getAllOrderByCustomerCodeFailed(apiResponse));
    }
}

//Upload Image 
function* uploadAttachmentPic(action) {
    const {uploadPic,OrderId,Source}=action.payload;
    console.log("uploadAttachmentPic");
    console.log(uploadPic);
    
    // http://workforceapi.com/ismart/IsmartApi/FileUpload?file={System.Web.HttpPostedFileWrapper}
    const apiResponse = yield call(fileUpload, "FileUpload?OrderId="+OrderId+"&Source="+Source,uploadPic);

    console.log("api response is ", apiResponse)
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(OrderAction.uploadAttachmentPicSuccess(response));
    } else {
        const response = apiResponse.error;
        yield put(OrderAction.uploadAttachmentPicFailed(response));
    }
}

function* saveOrderDetails(action){

    const {customerCode, attachment,totalPrice,comments,totalItem,orderList,cartDetails}=action.payload;

    // let formdata = new FormData(); 
    // formdata.append("CustomerCode",customerCode);
    // formdata.append("Attachement",attachment);
    // formdata.append("TotalPrice",totalPrice);
    // formdata.append("Comments",comments);
    // formdata.append("TotalItem",totalItem);
    // formdata.append("OrderList", orderList);

    const apiResponse = yield call(post, "SaveOrderDetails/",cartDetails);
   
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(OrderAction.saveOrderDetailsSuccess(response));
    } else {
        const response = apiResponse.error;
        yield put(OrderAction.saveOrderDetailsFail(response));
    }
}

export default function* OrderSagas() {
   
    yield takeLatest(OrderAction.GET_ALL_ORDERS, getAllOrders);
    yield takeLatest(OrderAction.GET_ORDER_BY_ID, getOrderById);
    yield takeLatest(OrderAction.GET_ALL_ORDER_BY_CUSTOMER_CODE, getAllOrderByCustomerCode);
    yield takeLatest(OrderAction.UPLOAD_ATTACHMENT_PIC, uploadAttachmentPic);
    yield takeLatest(OrderAction.SAVE_ORDER_DETAILS, saveOrderDetails);
}