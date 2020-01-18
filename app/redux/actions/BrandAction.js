import { createAction } from "redux-actions";

//get all brands
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const getAllBrands = createAction(GET_ALL_BRANDS);

export const GET_ALL_BRANDS_SUCCESS = "GET_ALL_BRANDS_SUCCESS";
export const getAllBrandsSuccess = createAction(GET_ALL_BRANDS_SUCCESS);

export const GET_ALL_BRANDS_FAILED = "GET_ALL_BRANDS_FAILED";
export const getAllBrandsFailed = createAction(GET_ALL_BRANDS_FAILED);

//get all manufacturers
export const GET_ALL_MANUFACTURERS = "GET_ALL_MANUFACTURERS";
export const getAllManufacturers = createAction(GET_ALL_MANUFACTURERS);

export const GET_ALL_MANUFACTURERS_SUCCESS = "GET_ALL_MANUFACTURERS_SUCCESS";
export const getAllManufacturersSuccess = createAction(GET_ALL_MANUFACTURERS_SUCCESS);

export const GET_ALL_MANUFACTURERS_FAILED = "GET_ALL_MANUFACTURERS_FAILED";
export const getAllManufacturersFailed = createAction(GET_ALL_MANUFACTURERS_FAILED);

//get all feeds
export const GET_ALL_FEEDS = "GET_ALL_FEEDS";
export const getAllFeeds = createAction(GET_ALL_FEEDS);

export const GET_ALL_FEEDS_SUCCESS = "GET_ALL_FEEDS_SUCCESS";
export const getAllFeedsSuccess = createAction(GET_ALL_FEEDS_SUCCESS);

export const GET_ALL_FEEDS_FAILED = "GET_ALL_FEEDS_FAILED";
export const getAllFeedsFailed = createAction(GET_ALL_FEEDS_FAILED);

// GetNewOrderList
export const GET_NEW_ORDER_LIST = "GET_NEW_ORDER_LIST";
export const getNewOrderList = createAction(GET_NEW_ORDER_LIST);

export const GET_NEW_ORDER_LIST_SUCCESS = "GET_NEW_ORDER_LIST_SUCCESS";
export const getNewOrderListSuccess = createAction(GET_NEW_ORDER_LIST_SUCCESS);

export const GET_NEW_ORDER_LIST_FAILED = "GET_NEW_ORDER_LIST_FAILED";
export const getNewOrderListFailed = createAction(GET_NEW_ORDER_LIST_FAILED);