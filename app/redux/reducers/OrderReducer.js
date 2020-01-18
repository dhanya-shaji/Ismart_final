import { OrderAction } from "../actions";

const initialState = {
    ordersData: "",  
    isOrdersLoaded: 0,
    orderByIdData: "",
    isOrderByIdDataLoaded: 0,
    isOrderSaved:0,
    orderId:'',
    uploadImageId:'',
    uploadErrorMessage: '',
    isAttachmentPicUploadSucess:0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OrderAction.GET_ALL_ORDERS:
            return {
                ...state,
                isOrdersLoaded: 0,
                ordersData: ""
            };
        case OrderAction.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                isOrdersLoaded: 1,
                ordersData: action.payload.data
            };
        case OrderAction.GET_ALL_ORDERS_FAILED:
            return {
                ...state,
                isOrdersLoaded: 2,
                ordersData: ""
            };

        // GET_ORDER_BY_ID
        case OrderAction.GET_ORDER_BY_ID:
            return {
                ...state,
                isOrderByIdDataLoaded: 0,
                orderByIdData: "",
            };
        case OrderAction.GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                isOrderByIdDataLoaded: 1,
                orderByIdData: action.payload.data,
            };
        case OrderAction.GET_ORDER_BY_ID_FAILED:
            return {
                ...state,
                isOrderByIdDataLoaded: 2,
                orderByIdData: "",
            };

        // GET_ORDER_BY_CUSTOMER_CODE
        case OrderAction.GET_ALL_ORDER_BY_CUSTOMER_CODE:
            return {
                ...state,
                isOrderByCustomerCodeDataLoaded: 0,
                orderByCustomerCodeData: "",
            };
        case OrderAction.GET_ALL_ORDER_BY_CUSTOMER_CODE_SUCCESS:
            return {
                ...state,
                isOrderByCustomerCodeDataLoaded: 1,
                orderByCustomerCodeData: action.payload.data,
            };
        case OrderAction.GET_ALL_ORDER_BY_CUSTOMER_CODE_FAILED:
            return {
                ...state,
                isOrderByCustomerCodeDataLoaded: 2,
                orderByCustomerCodeData: "",
            };

        // UPLOAD_ATTACHMENT_PIC
        case OrderAction.UPLOAD_ATTACHMENT_PIC:
            return {
                ...state,
                isAttachmentPicUploadSucess: 0,
            };
        case OrderAction.UPLOAD_ATTACHMENT_PIC_SUCCESS:
            return {
                ...state,     
                uploadImageId:action.payload.data,
                isAttachmentPicUploadSucess: 1,
            };
        case OrderAction.UPLOAD_ATTACHMENT_PIC_FAILED:
            return {
                ...state,
                uploadErrorMessage: "Error in upload! Please upload file with size less than 1 MB",
                isAttachmentPicUploadSucess: 2,
            };

        case OrderAction.SAVE_ORDER_DETAILS:
            return {
                ...state,
                isOrderSaved: 0,
            };
        case OrderAction.SAVE_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                isOrderSaved: 1,
                orderId:action.payload.data,
            };
        case OrderAction.SAVE_ORDER_DETAILS_FAIL:
            return {
                ...state,
                isOrderSaved: 2,
                orderId:action.payload.data,
            };

        default:
            return {
                ...state
            };
    }
};