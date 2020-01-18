import { BrandAction } from "../actions";

const initialState = {
    brandsData: "",  
    isBrandsLoaded: 0,
    feedsData: "",  
    isFeedsLoaded: 0,
    manufacturersData: "",  
    isManufacturersLoaded: 0,
    isNewOrdersLoaded: 0,
    newOrdersData: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        // GET_ALL_BRANDS
        case BrandAction.GET_ALL_BRANDS:
            return {
                ...state,
                isBrandsLoaded: 0,
                brandsData: ""
            };
        case BrandAction.GET_ALL_BRANDS_SUCCESS:
            return {
                ...state,
                isBrandsLoaded: 1,
                brandsData: action.payload.data
            };
        case BrandAction.GET_ALL_BRANDS_FAILED:
            return {
                ...state,
                isBrandsLoaded: 2,
                brandsData: ""
            };

        // GET_ALL_FEEDS
        case BrandAction.GET_ALL_FEEDS:
            return {
                ...state,
                isFeedsLoaded: 0,
                feedsData: ""
            };
        case BrandAction.GET_ALL_FEEDS_SUCCESS:
            return {
                ...state,
                isFeedsLoaded: 1,
                feedsData: action.payload.data
            };
        case BrandAction.GET_ALL_FEEDS_FAILED:
            return {
                ...state,
                isFeedsLoaded: 2,
                feedsData: ""
            };
            
        // GET_NEW_ORDER_LIST
        case BrandAction.GET_NEW_ORDER_LIST:
            return {
                ...state,
                isNewOrdersLoaded: 0,
                newOrdersData: "",
            };
        case BrandAction.GET_NEW_ORDER_LIST_SUCCESS:
            return {
                ...state,
                isNewOrdersLoaded: 1,
                newOrdersData: action.payload.data,
            };
        case BrandAction.GET_NEW_ORDER_LIST_FAILED:
            return {
                ...state,
                isNewOrdersLoaded: 2,
                newOrdersData: "",
            };

        // GET_ALL_MANUFACTURERS
        case BrandAction.GET_ALL_MANUFACTURERS:
            return {
                ...state,
                isManufacturersLoaded: 0,
                manufacturersData: ""
            };
        case BrandAction.GET_ALL_MANUFACTURERS_SUCCESS:
            return {
                ...state,
                isManufacturersLoaded: 1,
                manufacturersData: action.payload.data
            };
        case BrandAction.GET_ALL_MANUFACTURERS_FAILED:
            return {
                ...state,
                isManufacturersLoaded: 2,
                manufacturersData: ""
            };

        default:
            return {
                ...state
            };
    }
};