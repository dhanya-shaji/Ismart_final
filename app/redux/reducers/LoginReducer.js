import { LoginAction } from "../actions/";

const initialState = {
    isLoggedIn: 0,
    loginErrorMessage:'',
    isShopIdLoggedIn: 0,
    otpNumber:'',
    customerData:'',
    salesmanData:'',
};
export default function (state = initialState, action) {

    switch (action.type) {
        case LoginAction.LOGIN_REQUEST:
            return {
                ...state,
                isLoggedIn: 0,
                isShopIdLoggedIn: 0,
            };
        case LoginAction.LOGIN_REQUEST_FAILED:
            return {
                ...state,
                isLoggedIn: 2,
                loginErrorMessage:action.payload.error.data
            };
        case LoginAction.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                isLoggedIn: 1,
                salesmanData:action.payload.data,
            };

        case LoginAction.GET_LOGIN_SHOPID:
            return {
                ...state,
                isShopIdLoggedIn: 0,
            };

        case LoginAction.GET_LOGIN_SHOPID_FAILED:
            return {
                ...state,
                isShopIdLoggedIn: 2,
                loginErrorMessage:action.payload.error
            };

        case LoginAction.GET_LOGIN_SHOPID_SUCCESS:
            return {
                ...state,
                isShopIdLoggedIn: 1,
                customerData:action.payload.data,
                otpNumber:action.payload.OTP,
            };

        default:
            return {
                ...state
            };
    }
}