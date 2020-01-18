import { HomeAction } from "../actions";

const initialState = {
    feedsData: "",  
    isFeedsLoaded: 0,
    mostOrderedProductList:[],
    isMostOrderedProductLoaded:0,
    notificationCount:0

};

export default (state = initialState, action) => {
    switch (action.type) {
        case HomeAction.GET_ALL_FEEDS:
            return {
                ...state,
                isFeedsLoaded: 0,
                feedsData: ""
            };
        case HomeAction.GET_ALL_FEEDS_SUCCESS:
            return {
                ...state,
                isFeedsLoaded: 1,
                feedsData: action.payload.data
            };
        case HomeAction.GET_ALL_FEEDS_FAILED:
            return {
                ...state,
                isFeedsLoaded: 2,
                feedsData: ""
            };
            case HomeAction.GET_MOST_ORDERED_PRODUCT:
                return {
                    ...state,
                    isMostOrderedProductLoaded: 0,
                    mostOrderedProductList:[],
                  
                };
            case HomeAction.GET_MOST_ORDERED_PRODUCT_SUCCESS:
                return {
                    ...state,
                    isMostOrderedProductLoaded: 1,
                    mostOrderedProductList: action.payload.data
                };
            case HomeAction.GET_MOST_ORDERED_PRODUCT_FAILED:
                return {
                    ...state,
                    isMostOrderedProductLoaded: 2,
                    mostOrderedProductList: []
                };

                case HomeAction.CHECK_IF_CUSTOMER_EXIST_OR_NOT:
                return {
                    ...state,
                    isCustomerActive:0
                  
                };
            case HomeAction.CHECK_IF_CUSTOMER_EXIST_OR_NOT_SUCCESS:
                return {
                    ...state,
                    isCustomerActive:action.payload.data,

                   
                };
            case HomeAction.CHECK_IF_CUSTOMER_EXIST_OR_NOT_FAILED:
                return {
                    ...state,
                    isCustomerActive:action.payload.data,
                };

            case HomeAction.NOTIFICATION_COUNT:{
                return{
                    ...state,
                   
                }
            }
            case HomeAction.NOTIFICATION_COUNT_INCREMENT:{
                    return{
                        ...state,
                        notificationCount:parseInt(state.notificationCount)+1
                    }
            }
            case HomeAction.NOTIFICATION_COUNT_REMOVE:{
                return{
                    ...state,
                    notificationCount:0
                }
            }


        default:
            return {
                ...state
            };
    }
};