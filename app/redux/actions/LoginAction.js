
import { createAction } from "redux-actions";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const loginRequest = createAction(LOGIN_REQUEST);
export const staffLoginRequest = createAction(LOGIN_REQUEST);

export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const loginSuccess = createAction(LOGIN_REQUEST_SUCCESS);

export const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED";
export const loginFailed = createAction(LOGIN_REQUEST_FAILED);


export const GET_LOGIN_SHOPID = "GET_LOGIN_SHOPID";
export const getLoginShopId = createAction(GET_LOGIN_SHOPID);

export const GET_LOGIN_SHOPID_SUCCESS = "GET_LOGIN_SHOPID_SUCCESS";
export const getLoginShopIdSuccess = createAction(GET_LOGIN_SHOPID_SUCCESS);

export const GET_LOGIN_SHOPID_FAILED = "GET_LOGIN_SHOPID_FAILED";
export const getLoginShopIdFailed = createAction(GET_LOGIN_SHOPID_FAILED);