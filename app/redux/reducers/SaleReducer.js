import { OrderAction, SaleAction } from "../actions";

const initialState = {
    
    orderByStaffIdData: "",
    isOrderByStaffIdDataLoaded: 0,
    acceptedOrderByStaffIdData: "",
    isAcceptedOrderByStaffIdDataLoaded: 0,
    isOrderAcceptStatus:0,
    isUpdateOrderStatus:0,
    saleErrorMessage:'',
};

export default (state = initialState, action) => {
    switch (action.type) {

        // GET_ALL_ORDER_BY_STAFF
        case SaleAction.GET_ALL_ORDER_BY_STAFF:
            return {
                ...state,
                isOrderByStaffIdDataLoaded: 0,
                orderByStaffIdData: "",
            };
        case SaleAction.GET_ALL_ORDER_BY_STAFF_SUCCESS:
            return {
                ...state,
                isOrderByStaffIdDataLoaded: 1,
                orderByStaffIdData: action.payload.data,
            };
        case SaleAction.GET_ALL_ORDER_BY_STAFF_FAILED:
            return {
                ...state,
                isOrderByStaffIdDataLoaded: 2,
                saleErrorMessage:action.payload.error,
                orderByStaffIdData: "",
            };

        // GET_ALL_ACCEPTED_ORDER_BY_STAFF
        case SaleAction.GET_ALL_ACCEPTED_ORDER_BY_STAFF:
            return {
                ...state,
                isAcceptedOrderByStaffIdDataLoaded: 0,
                acceptedOrderByStaffIdData: "",    
            };
        case SaleAction.GET_ALL_ACCEPTED_ORDER_BY_STAFF_SUCCESS:
            return {
                ...state,
                isAcceptedOrderByStaffIdDataLoaded: 1,
                acceptedOrderByStaffIdData: action.payload.data, 
            };
        case SaleAction.GET_ALL_ACCEPTED_ORDER_BY_STAFF_FAILED:
            return {
                ...state,
                isAcceptedOrderByStaffIdDataLoaded: 2,
                saleErrorMessage:action.payload.error,
                acceptedOrderByStaffIdData: "", 
            };

        // ORDER_ACCEPT_STATUS
        case SaleAction.ORDER_ACCEPT_STATUS:
            return {
                ...state,
                isOrderAcceptStatus: 0,
                // acceptedOrderByStaffIdData: "",    
            };
        case SaleAction.ORDER_ACCEPT_STATUS_SUCCESS:
            return {
                ...state,
                isOrderAcceptStatus: 1,
                // acceptedOrderByStaffIdData: action.payload.data, 
            };
        case SaleAction.ORDER_ACCEPT_STATUS_FAILED:
            return {
                ...state,
                isOrderAcceptStatus: 2,
                saleErrorMessage:action.payload.error,
                // acceptedOrderByStaffIdData: "", 
            };

        // UPDATE_ORDER_STATUS
        case SaleAction.UPDATE_ORDER_STATUS:
            return {
                ...state,
                isUpdateOrderStatus: 0,
                // acceptedOrderByStaffIdData: "",    
            };
        case SaleAction.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                isUpdateOrderStatus: 1,
                // acceptedOrderByStaffIdData: action.payload.data, 
            };
        case SaleAction.UPDATE_ORDER_STATUS_FAILED:
            return {
                ...state,
                isUpdateOrderStatus: 2,
                saleErrorMessage:action.payload.error,
                // acceptedOrderByStaffIdData: "", 
            };

        default:
            return {
                ...state
            };
    }
};