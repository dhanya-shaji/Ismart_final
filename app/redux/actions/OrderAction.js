import { createAction } from "redux-actions";

//get all orders
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const getAllOrders = createAction(GET_ALL_ORDERS);

export const GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS";
export const getAllOrdersSuccess = createAction(GET_ALL_ORDERS_SUCCESS);

export const GET_ALL_ORDERS_FAILED = "GET_ALL_ORDERS_FAILED";
export const getAllOrdersFailed = createAction(GET_ALL_ORDERS_FAILED);

// GET_ORDER_BY_ID
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const getOrderById = createAction(GET_ORDER_BY_ID);

export const GET_ORDER_BY_ID_SUCCESS = "GET_ORDER_BY_ID_SUCCESS";
export const getOrderByIdSuccess = createAction(GET_ORDER_BY_ID_SUCCESS);

export const GET_ORDER_BY_ID_FAILED = "GET_ORDER_BY_ID_FAILED";
export const getOrderByIdFailed = createAction(GET_ORDER_BY_ID_FAILED);

// GET_ALL_ORDER_BY_CUSTOMER_CODE
export const GET_ALL_ORDER_BY_CUSTOMER_CODE = "GET_ALL_ORDER_BY_CUSTOMER_CODE";
export const getAllOrderByCustomerCode = createAction(GET_ALL_ORDER_BY_CUSTOMER_CODE);

export const GET_ALL_ORDER_BY_CUSTOMER_CODE_SUCCESS = "GET_ALL_ORDER_BY_CUSTOMER_CODE_SUCCESS";
export const getAllOrderByCustomerCodeSuccess = createAction(GET_ALL_ORDER_BY_CUSTOMER_CODE_SUCCESS);

export const GET_ALL_ORDER_BY_CUSTOMER_CODE_FAILED = "GET_ALL_ORDER_BY_CUSTOMER_CODE_FAILED";
export const getAllOrderByCustomerCodeFailed = createAction(GET_ALL_ORDER_BY_CUSTOMER_CODE_FAILED);

// UPLOAD_ATTACHMENT_PIC
export const UPLOAD_ATTACHMENT_PIC = "UPLOAD_ATTACHMENT_PIC";
export const uploadAttachmentPic = createAction(UPLOAD_ATTACHMENT_PIC);

export const UPLOAD_ATTACHMENT_PIC_SUCCESS = "UPLOAD_ATTACHMENT_PIC_SUCCESS";
export const uploadAttachmentPicSuccess = createAction(UPLOAD_ATTACHMENT_PIC_SUCCESS);

export const UPLOAD_ATTACHMENT_PIC_FAILED = "UPLOAD_ATTACHMENT_PIC_FAILED";
export const uploadAttachmentPicFailed = createAction(UPLOAD_ATTACHMENT_PIC_FAILED);

// SAVE_ORDER_DETAILS
export const SAVE_ORDER_DETAILS="SAVE_ORDER_DETAILS";
export const saveOrderDetails=createAction(SAVE_ORDER_DETAILS);

export const SAVE_ORDER_DETAILS_SUCCESS="SAVE_ORDER_DETAILS_SUCCESS";
export const saveOrderDetailsSuccess=createAction(SAVE_ORDER_DETAILS_SUCCESS);

export const SAVE_ORDER_DETAILS_FAIL="SAVE_ORDER_DETAILS_FAIL";
export const saveOrderDetailsFail=createAction(SAVE_ORDER_DETAILS_FAIL);