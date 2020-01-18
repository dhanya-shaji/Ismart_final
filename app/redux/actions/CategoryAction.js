import { createAction } from "redux-actions";

// get all Categories 
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const getAllCategories = createAction(GET_ALL_CATEGORIES);

export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const getAllCategoriesSuccess = createAction(GET_ALL_CATEGORIES_SUCCESS);

export const GET_ALL_CATEGORIES_FAILED = "GET_ALL_CATEGORIES_FAILED";
export const getAllCategoriesFailed = createAction(GET_ALL_CATEGORIES_FAILED);

// get all Products 
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const getAllProducts = createAction(GET_ALL_PRODUCTS);

export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const getAllProductsSuccess = createAction(GET_ALL_PRODUCTS_SUCCESS);

export const GET_ALL_PRODUCTS_FAILED = "GET_ALL_PRODUCTS_FAILED";
export const getAllProductsFailed = createAction(GET_ALL_PRODUCTS_FAILED);

// get Product By Id
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const getProductById = createAction(GET_PRODUCT_BY_ID);

export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const getProductByIdSuccess = createAction(GET_PRODUCT_BY_ID_SUCCESS);

export const GET_PRODUCT_BY_ID_FAILED = "GET_PRODUCT_BY_ID_FAILED";
export const getProductByIdFailed = createAction(GET_PRODUCT_BY_ID_FAILED);

//get all Products By Category
export const GET_ALL_PRODUCTS_BY_CATEGORY = "GET_ALL_PRODUCTS_BY_CATEGORY";
export const getAllProductsByCategory = createAction(GET_ALL_PRODUCTS_BY_CATEGORY);

export const GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS = "GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS";
export const getAllProductsByCategorySuccess = createAction(GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS);

export const GET_ALL_PRODUCTS_BY_CATEGORY_FAILED = "GET_ALL_PRODUCTS_BY_CATEGORY_FAILED";
export const getAllProductsByCategoryFailed = createAction(GET_ALL_PRODUCTS_BY_CATEGORY_FAILED);

//get all Products By Master Type
export const GET_ALL_PRODUCTS_BY_MASTER_TYPE = "GET_ALL_PRODUCTS_BY_MASTER_TYPE";
export const getAllProductsByMasterType = createAction(GET_ALL_PRODUCTS_BY_MASTER_TYPE);

export const GET_ALL_PRODUCTS_BY_MASTER_TYPE_SUCCESS = "GET_ALL_PRODUCTS_BY_MASTER_TYPE_SUCCESS";
export const getAllProductsByMasterTypeSuccess = createAction(GET_ALL_PRODUCTS_BY_MASTER_TYPE_SUCCESS);

export const GET_ALL_PRODUCTS_BY_MASTER_TYPE_FAILED = "GET_ALL_PRODUCTS_BY_MASTER_TYPE_FAILED";
export const getAllProductsByMasterTypeFailed = createAction(GET_ALL_PRODUCTS_BY_MASTER_TYPE_FAILED);


//Search Product
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const searchProduct = createAction(SEARCH_PRODUCT);

export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";
export const searchProductSuccess = createAction(SEARCH_PRODUCT_SUCCESS);

export const SEARCH_PRODUCT_FAILED = "SEARCH_PRODUCT_FAILED";
export const searchProductFailed = createAction(SEARCH_PRODUCT_FAILED);

//Search Category
export const SEARCH_CATEGORY = "SEARCH_CATEGORY";
export const searchCategory = createAction(SEARCH_CATEGORY);

export const SEARCH_CATEGORY_SUCCESS = "SEARCH_CATEGORY_SUCCESS";
export const searchCategorySuccess = createAction(SEARCH_CATEGORY_SUCCESS);

export const SEARCH_CATEGORY_FAILED = "SEARCH_CATEGORY_FAILED";
export const searchCategoryFailed = createAction(SEARCH_CATEGORY_FAILED);


//Search Product By Category & Manufacture 
export const SEARCH_PRODUCT_MASTER = "SEARCH_PRODUCT_MASTER";
export const searchProductMaster = createAction(SEARCH_PRODUCT_MASTER);

export const SEARCH_PRODUCT_MASTER_SUCCESS = "SEARCH_PRODUCT_MASTER_SUCCESS";
export const searchProductMasterSuccess = createAction(SEARCH_PRODUCT_MASTER_SUCCESS);

export const SEARCH_PRODUCT_MASTER_FAILED = "SEARCH_PRODUCT_MASTER_FAILED";
export const searchProductMasterFailed = createAction(SEARCH_PRODUCT_MASTER_FAILED);