import React, { Component } from 'react'
import { ImageBackground, RefreshControl, Image, TouchableOpacity, ScrollView, View, Text, Dimensions, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar, ListItem } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from "react-native-loading-spinner-overlay";

import { productListStyle } from '../Category/ProductListStyle';
import { commonStyle } from '../Common/CommonStyle';
import ProductListItem from '../Category/ProductListItem';
import { CustomIconInfoButton, } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

//Action
import { CategoryAction } from "../../redux/actions/index";
import { ShoppingCartAction } from "../../redux/actions/index";


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class SearchPageMaster extends Component {

    static propTypes = {
        searchText: PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner: false,
            refreshing: false,
            searchResult: [],
            shoppingCartData: this.props.shoppingCartData ? this.props.shoppingCartData : [],
            isSearchListFound: 0,
            offset: 1,
            count: 1000,
            resultMgs: '',
            // shoppingCartData : this.props.shoppingCartData,
        };
        Navigation.events().bindComponent(this);

    }

    componentWillMount() {
        // this.search.focus();

        var totalItems = this.getTotalItems();
        totalItems === 0 ? EventRegister.emit('updateShoppingCartItemsCount', '') : EventRegister.emit('updateShoppingCartItemsCount', totalItems);
    }
    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
                visible: false,
                ...Platform.select({ android: { drawBehind: true } })
            },
        });
        this.search.focus();
    }


    componentWillReceiveProps(nextProps) {
        const {searchResult,offset}=this.state;
        if (this.props.isSearchDataFound !== nextProps.isSearchDataFound) {
            if (nextProps.isSearchDataFound === 1) {
                this.setState({
                    searchResult:offset==1?nextProps.searchResult:[...searchResult,...nextProps.searchResult],
                    spinner: false,
                    isSearchListFound: 0,
                    resultMsg: '',
                    refreshing:false
                })
            } else if (nextProps.isSearchDataFound === 2) {
                this.setState({
                    searchResult: [],
                    spinner: false,
                    isSearchListFound: 2,
                    resultMsg: 'No Record Found..',
                    refreshing:false

                })
            }
        }
    }



    onProductDetail=(productItem) =>{
        console.log(productItem, "productItem is ");
        productItem.Quantity = "1";
        onNavigation("navigation.ismart.ProductDetail", "Product Details", this.props.componentId, { productDetails: productItem, productId: productItem.ProductId, categoryId: productItem.CatagoryId, type: "Cata", })
    }

    getTotalItems = () => {
        var itemsCount = 0;
        for (i = 0; i < this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount + parseInt(tempItem.Quantity, 10);
        }
        // console.log(itemsCount);
        return itemsCount;
    }

    

    updateSearch = search => {
        this.setState({ 
            search,
             spinner: true, 
             resultMgs: 'Loading...',
             offset:1
        });
        console.log("search is", search);
        this.props.searchProductMaster({
            categoryId: this.props.categoryId,
            type: this.props.type,
            sort: this.props.sortType==='null'?'desc':this.props.sortType==='desc'?'asc':'desc', 
            offset:1,
            count:this.state.count,
            search:search

        })
    };

    loadProductList=()=>{
        const {sortType,offset,count,search}=this.state;
        this.props.searchProductMaster({
            categoryId: this.props.categoryId,
            type: this.props.type,
            sort: this.props.sortType==='null'?'desc':this.props.sortType==='desc'?'asc':'desc', 
            offset:offset,
            count:count,
            search:search

        })
    }
    _onScrollLoadData=()=>{
        const {offset,search}=this.state;
       
        if(search===""){
            this.setState({
                offset:offset+1,
                refreshing:true,
            },()=>{
                console.log("offset123",this.state.offset)
                this.loadProductList();
            })
        }else{
            this.setState({
                offset:offset,
                refreshing:true,
            },()=>{
                console.log("offset123",this.state.offset)
                this.loadProductList();
            })
        }
        
        
    }
    
    _renderProductList=({item})=>(
        <ProductListItem 
                        key={item.ProductId} 
                        onProductDetailPress={this.onProductDetail} 
                        onAddToCartPress={this.onAddToCart} 
                        urlImage={item.ProductImage} 
                        productItem={item} 
                        quantity={item.Quantity ? item.Quantity : "1"} 
                        discountPrice={item.Price} 
                        markedPrice={item.Price} 
                        model={item.ModelId} 
                        companyName={item.ProductName} 
                        specification="" //{item.SUK} 
                        description={item.Description} 
                        />     
    )
    
    render() {
        const { search, resultMgs } = this.state;
        return (
            <ImageBackground style={commonStyle.imageBackground} resizeMode='cover' source={images.background}>
                <SearchBar
                    
                    placeholder="Search here"
                    showLoading={this.state.spinner}
                    onChangeText={this.updateSearch}
                    value={search}
                    autoCorrect={false}
                    ref={search => this.search = search}
                    inputContainerStyle={commonStyle.searchBarInputContainerStyle}
                    containerStyle={commonStyle.searchBarContainerStyle} />


                {/* <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={}/> } >  */}
                <View style={productListStyle.scrollContainer}  >
                    {this.state.searchResult && this.state.searchResult.length > 0 ?
                        <FlatList
                            data={this.state.searchResult}
                            renderItem={this._renderProductList}
                            keyExtractor={item => item.SUK + "-" + item.ProductName}
                            onEndReached={this._onScrollLoadData}
                            refreshing={this.state.refreshing}
                            // onEndThreshold={-100}
                            onEndReachedThreshold={1}


                        />

                    : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.props.isSearchDataFound===2?"No Record Found":resultMgs}</Text></View>}
                </View>
                {/* </ScrollView> */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData: state.shoppingcart.shoppingCartData,
    searchResult: state.category.searchResult,
    isSearchDataFound: state.category.isSearchDataFound

})

const mapDispatchToProps = {
    ...CategoryAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageMaster)

