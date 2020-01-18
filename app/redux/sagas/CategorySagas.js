import { takeLatest, put, call } from "redux-saga/effects";
import { CategoryAction } from "../actions";
import { get, post, postLogin, authorizedGet, authorizePostFormData } from "../../config/apiConfig";

function* getAllCategories(action) {
    const reqdata=action.payload;
    
    console.log('getAllCategories');
    const apiResponse = yield call(get, "GetAllCatagory");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getAllCategoriesSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getAllCategoriesFailed(response));
    }
}

function* getAllProducts(action) {
    const reqdata=action.payload;
    
    console.log('getAllProducts');
    // const apiResponse = yield call(get, "GetAllProducts/");
    const apiResponse = yield call(get, "GetAllNewProducts/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getAllProductsSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getAllProductsFailed(response));
    }
}

function* getAllNewProducts(action) {
    const reqdata=action.payload;
    
    console.log('getAllProducts');
    const apiResponse = yield call(get, "GetAllNewProducts/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getAllProductsSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getAllProductsFailed(response));
    }
}

function* getProductById(action) {
    console.log('getProductById');
    
    const {productId}=action.payload;

    let str = "GetProductById?Id=" + productId;

    console.log(str);

    const apiResponse = yield call(get, "GetProductById?Id=" + productId);
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getProductByIdSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getProductByIdFailed(response));
    }
}

function* getAllProductsByCategory(action) {
    const reqdata=action.payload;
    
    console.log('getAllProductsByCategory');
    const apiResponse = yield call(get, "GetAllProductByCatagory/");
    
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getAllProductsByCategorySuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getAllProductsByCategoryFailed(response));
    }
}

function* getAllProductsByMasterType(action) {
    console.log('getAllProductsByMasterType');
    
    const {categoryId, type, sort,offset,count}=action.payload;

    let str = "GetAllProductsByMasterType/?Type=" + type + "&Id=" + categoryId + "&Sort=" + sort+"&Offset="+offset+"&Count="+count ;

   

    const apiResponse = yield call(get, str);
        
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.getAllProductsByMasterTypeSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.getAllProductsByMasterTypeFailed(response));
    }
}


//Search Product 
function* searchProduct(action) {
    const {search,offset,count}=action.payload;
    
    console.log('searchProduct');
    const apiResponse = yield call(get, "Search/?search="+search+"&Offset="+offset+"&Count="+count);
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.searchProductSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.searchProductFailed(response));
    }
}

//Search Category 
function* searchCategory(action) {
    const {search,offset,count}=action.payload;
    
    const apiResponse = yield call(get, "GetCatagoryBySearch/?search="+search+"&Offset="+offset+"&Count="+count);
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.searchCategorySuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.searchCategoryFailed(response));
    }
}

//Search Product By Category & Manufacture and prduct 
function* searchProductMaster(action) {
    const {categoryId, type, sort,offset,count,search}=action.payload;

    let str = "GetAllProductsBySearch/?Type=" + type + "&Id=" + categoryId + "&Sort=" + sort+"&Offset="+offset+"&Count="+count+"&ProductName="+search ;
    const apiResponse = yield call(get, str);
    if (apiResponse.resultCode === 1) {
        const response = apiResponse.response;
        yield put(CategoryAction.searchProductMasterSuccess(response)); 
    } else {
        const response = apiResponse.error;
        yield put(CategoryAction.searchProductMasterFailed(response));
    }
}
export default function* CategorySagas() {
   
    yield takeLatest(CategoryAction.GET_ALL_PRODUCTS, getAllProducts);
    yield takeLatest(CategoryAction.GET_ALL_PRODUCTS, getAllNewProducts);
    yield takeLatest(CategoryAction.GET_ALL_CATEGORIES, getAllCategories);
    yield takeLatest(CategoryAction.GET_PRODUCT_BY_ID, getProductById);
    yield takeLatest(CategoryAction.GET_ALL_PRODUCTS_BY_CATEGORY, getAllProductsByCategory);
    yield takeLatest(CategoryAction.GET_ALL_PRODUCTS_BY_MASTER_TYPE, getAllProductsByMasterType);
    yield takeLatest(CategoryAction.SEARCH_PRODUCT, searchProduct);
    yield takeLatest(CategoryAction.SEARCH_CATEGORY, searchCategory);
    yield takeLatest(CategoryAction.SEARCH_PRODUCT_MASTER, searchProductMaster);
        
}