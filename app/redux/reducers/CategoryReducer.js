import { CategoryAction } from "../actions";

const initialState = {
    categoriesData: "",  
    isCategoriesDataLoaded: 0,
    productsData: "",  
    isProductsDataLoaded: 0,
    productByIdData: "",
    isProductByIdDataLoaded: 0,
    productsByCategoryData: "",  
    isProductsByCategoryDataLoaded: 0,
    productsByMasterTypeData: "",  
    isProductsByMasterTypeDataLoaded: 0,
    isSearchDataFound: 0,
    searchResult: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case CategoryAction.GET_ALL_CATEGORIES:
            return {
                ...state,
                isCategoriesDataLoaded: 0,
                categoriesData: ""
            };
        case CategoryAction.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                isCategoriesDataLoaded: 1,
                categoriesData: action.payload.data
            };
        case CategoryAction.GET_ALL_CATEGORIES_FAILED:
            return {
                ...state,
                isCategoriesDataLoaded: 2,
                categoriesData: ""
            };

        case CategoryAction.GET_ALL_PRODUCTS:
            return {
                ...state,
                isProductsDataLoaded: 0,
                productsData: ""
            };
        case CategoryAction.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                isProductsDataLoaded: 1,
                productsData: action.payload.data
            };
        case CategoryAction.GET_ALL_PRODUCTS_FAILED:
            return {
                ...state,
                isProductsDataLoaded: 2,
                productsData: ""
            };

        // GET_PRODUCT_BY_ID
        case CategoryAction.GET_PRODUCT_BY_ID:
            return {
                ...state,
                isProductByIdDataLoaded: 0,
                productByIdData: ""
            };
        case CategoryAction.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                isProductByIdDataLoaded: 1,
                productByIdData: action.payload.data
            };
        case CategoryAction.GET_PRODUCT_BY_ID_FAILED:
            return {
                ...state,
                isProductByIdDataLoaded: 2,
                productByIdData: ""
            };

        // GET_ALL_PRODUCTS_BY_CATEGORY
        case CategoryAction.GET_ALL_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                isProductsByCategoryDataLoaded: 0,
                productsByCategoryData: ""
            };
        case CategoryAction.GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                isProductsByCategoryDataLoaded: 1,
                productsByCategoryData: action.payload.data
            };
        case CategoryAction.GET_ALL_PRODUCTS_BY_CATEGORY_FAILED:
            return {
                ...state,
                isProductsByCategoryDataLoaded: 2,
                productsByCategoryData: ""
            };

        case CategoryAction.GET_ALL_PRODUCTS_BY_MASTER_TYPE:
            return {
                ...state,
                isProductsByMasterTypeDataLoaded: 0,
                productsByMasterTypeData: ""
            };
        case CategoryAction.GET_ALL_PRODUCTS_BY_MASTER_TYPE_SUCCESS:
            return {
                ...state,
                isProductsByMasterTypeDataLoaded: 1,
                productsByMasterTypeData: action.payload.data
            };
        case CategoryAction.GET_ALL_PRODUCTS_BY_MASTER_TYPE_FAILED:
            return {
                ...state,
                isProductsByMasterTypeDataLoaded: 2,
                productsByMasterTypeData: ""
            };

        //SEARCH PRODUCT
        case CategoryAction.SEARCH_PRODUCT:
            return {
                ...state,
                isSearchDataFound:0,
                searchResult:[]
               
            };
        case CategoryAction.SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                isSearchDataFound: 1,
                searchResult:action.payload.data
            };
        case CategoryAction.SEARCH_PRODUCT_FAILED:
            return {
                ...state,
                isSearchDataFound: 2,
                searchResult:[]
            };
         //SEARCH Category
         case CategoryAction.SEARCH_CATEGORY:
            return {
                ...state,
                isSearchDataFound:0,
                searchResult:[]
               
            };
        case CategoryAction.SEARCH_CATEGORY_SUCCESS:
            return {
                ...state,
                isSearchDataFound: 1,
                searchResult:action.payload.data
            };
        case CategoryAction.SEARCH_CATEGORY_FAILED:
            return {
                ...state,
                isSearchDataFound: 2,
                searchResult:[]
            };
        //Search Product By Category & Manufacture 
        //SEARCH PRODUCT
        case CategoryAction.SEARCH_PRODUCT_MASTER:
            return {
                ...state,
                isSearchDataFound:0,
                searchResult:[]
               
            };
        case CategoryAction.SEARCH_PRODUCT_MASTER_SUCCESS:
            return {
                ...state,
                isSearchDataFound: 1,
                searchResult:action.payload.data
            };
        case CategoryAction.SEARCH_PRODUCT_MASTER_FAILED:
            return {
                ...state,
                isSearchDataFound: 2,
                searchResult:[]
            };
        

        default:
            return {
                ...state
            };
    }
};