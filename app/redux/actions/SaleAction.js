import { createAction } from "redux-actions";

// GET_ALL_ORDER_BY_STAFF
export const GET_ALL_ORDER_BY_STAFF = "GET_ALL_ORDER_BY_STAFF";
export const getAllOrderByStaff = createAction(GET_ALL_ORDER_BY_STAFF);

export const GET_ALL_ORDER_BY_STAFF_SUCCESS = "GET_ALL_ORDER_BY_STAFF_SUCCESS";
export const getAllOrderByStaffSuccess = createAction(GET_ALL_ORDER_BY_STAFF_SUCCESS);

export const GET_ALL_ORDER_BY_STAFF_FAILED = "GET_ALL_ORDER_BY_STAFF_FAILED";
export const getAllOrderByStaffFailed = createAction(GET_ALL_ORDER_BY_STAFF_FAILED);

// GET_ALL_ACCEPTED_ORDER_BY_STAFF
export const GET_ALL_ACCEPTED_ORDER_BY_STAFF = "GET_ALL_ACCEPTED_ORDER_BY_STAFF";
export const getAllAcceptedOrderByStaff = createAction(GET_ALL_ACCEPTED_ORDER_BY_STAFF);

export const GET_ALL_ACCEPTED_ORDER_BY_STAFF_SUCCESS = "GET_ALL_ACCEPTED_ORDER_BY_STAFF_SUCCESS";
export const getAllAcceptedOrderByStaffSuccess = createAction(GET_ALL_ACCEPTED_ORDER_BY_STAFF_SUCCESS);

export const GET_ALL_ACCEPTED_ORDER_BY_STAFF_FAILED = "GET_ALL_ACCEPTED_ORDER_BY_STAFF_FAILED";
export const getAllAcceptedOrderByStaffFailed = createAction(GET_ALL_ACCEPTED_ORDER_BY_STAFF_FAILED);

// ORDER_ACCEPT_STATUS
export const ORDER_ACCEPT_STATUS = "ORDER_ACCEPT_STATUS";
export const orderAcceptStatus = createAction(ORDER_ACCEPT_STATUS);

export const ORDER_ACCEPT_STATUS_SUCCESS = "ORDER_ACCEPT_STATUS_SUCCESS";
export const orderAcceptStatusSuccess = createAction(ORDER_ACCEPT_STATUS_SUCCESS);

export const ORDER_ACCEPT_STATUS_FAILED = "ORDER_ACCEPT_STATUS_FAILED";
export const orderAcceptStatusFailed = createAction(ORDER_ACCEPT_STATUS_FAILED);

// UPDATE_ORDER_STATUS
export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const updateOrderStatus = createAction(UPDATE_ORDER_STATUS);

export const UPDATE_ORDER_STATUS_SUCCESS = "UPDATE_ORDER_STATUS_SUCCESS";
export const updateOrderStatusSuccess = createAction(UPDATE_ORDER_STATUS_SUCCESS);

export const UPDATE_ORDER_STATUS_FAILED = "UPDATE_ORDER_STATUS_FAILED";
export const updateOrderStatusFailed = createAction(UPDATE_ORDER_STATUS_FAILED);
