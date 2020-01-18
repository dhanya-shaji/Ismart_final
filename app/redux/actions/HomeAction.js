import { createAction } from "redux-actions";

//get all feeds
export const GET_ALL_FEEDS = "GET_ALL_FEEDS";
export const getAllFeeds = createAction(GET_ALL_FEEDS);

export const GET_ALL_FEEDS_SUCCESS = "GET_ALL_FEEDS_SUCCESS";
export const getAllFeedsSuccess = createAction(GET_ALL_FEEDS_SUCCESS);

export const GET_ALL_FEEDS_FAILED = "GET_ALL_FEEDS_FAILED";
export const getAllFeedsFailed = createAction(GET_ALL_FEEDS_FAILED);


//get all most ordered products 
export const GET_MOST_ORDERED_PRODUCT = "GET_MOST_ORDERED_PRODUCT";
export const getMostOrderedProduct = createAction(GET_MOST_ORDERED_PRODUCT);

export const GET_MOST_ORDERED_PRODUCT_SUCCESS = "GET_MOST_ORDERED_PRODUCT_SUCCESS";
export const getMostOrderedProductSuccess = createAction(GET_MOST_ORDERED_PRODUCT_SUCCESS);

export const GET_MOST_ORDERED_PRODUCT_FAILED = "GET_MOST_ORDERED_PRODUCT_FAILED";
export const getMostOrderedProductFailed = createAction(GET_MOST_ORDERED_PRODUCT_FAILED);

//get all most ordered products 
export const CHECK_IF_CUSTOMER_EXIST_OR_NOT = "CHECK_IF_CUSTOMER_EXIST_OR_NOT";
export const checkIfCustomerExistOfNot = createAction(CHECK_IF_CUSTOMER_EXIST_OR_NOT);

export const CHECK_IF_CUSTOMER_EXIST_OR_NOT_SUCCESS = "CHECK_IF_CUSTOMER_EXIST_OR_NOT_SUCCESS";
export const checkIfCustomerExistOfNotSuccess = createAction(CHECK_IF_CUSTOMER_EXIST_OR_NOT_SUCCESS);

export const CHECK_IF_CUSTOMER_EXIST_OR_NOT_FAILED = "CHECK_IF_CUSTOMER_EXIST_OR_NOT_FAILED";
export const checkIfCustomerExistOfNotFailed = createAction(CHECK_IF_CUSTOMER_EXIST_OR_NOT_FAILED);


//Notification Count
export const NOTIFICATION_COUNT = "NOTIFICATION_COUNT";
export const notificationCount = createAction(NOTIFICATION_COUNT);

export const NOTIFICATION_COUNT_INCREMENT = "NOTIFICATION_COUNT_INCREMENT";
export const notificationCountIncrement = createAction(NOTIFICATION_COUNT_INCREMENT);

export const NOTIFICATION_COUNT_REMOVE = "NOTIFICATION_COUNT_REMOVE";
export const notificationCountRemove = createAction(NOTIFICATION_COUNT_REMOVE);

