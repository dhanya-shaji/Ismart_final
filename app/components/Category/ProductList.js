import React, { Component } from 'react'
import { ImageBackground, Platform,TouchableHighlight, Image, TouchableOpacity, ScrollView, View, Text, Dimensions, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from "react-native-loading-spinner-overlay";

import { productListStyle } from './ProductListStyle';
import { commonStyle} from '../Common/CommonStyle';
import ProductListItem from './ProductListItem';
import { CustomIconInfoButton, } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';




import { Button} from 'react-native-paper';
import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

//Action
import { CategoryAction } from "../../redux/actions/index";
import { ShoppingCartAction } from "../../redux/actions/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class ProductList extends Component {
    
  
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner: false,
            refreshing: false,
            sortType:"null",
            productsByMasterTypeData: [],
            shoppingCartData:this.props.shoppingCartData ? this.props.shoppingCartData : [],
            isProductLitsLoaded:0,
            offset:1,
            count:50,
            

            // shoppingCartData : this.props.shoppingCartData,
        };
        Navigation.events().bindComponent(this);
        // this.loadProductList();
    }
    static get options() {
        return {
          topBar: {
            title: {
              text: 'Dashboard',
            },
            // Configure your button style here
            leftButtons: [
              {
                id: "SideDrawer",
                icon:images.menu_white,
              }
            ],
          }
        };
    }

    navigationButtonPressed({ buttonId }) {
        try {
          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              },
            },
          });  
        } catch (error) {
          //
        }
    }

    loadProductList=()=>{
        const {sortType,offset,count}=this.state;
        this.props.getAllProductsByMasterType({
            categoryId: this.props.categoryId,
            type: this.props.type,
            sort: sortType,
            offset:offset,
            count:count

          });
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getAllProductsByMasterType({
            categoryId: this.props.categoryId,
            type: this.props.type,
            sort: this.state.sortType,
            offset:this.state.offset,
            count:this.state.count
        });
    }
    _onScrollLoadData=()=>{
        const {offset}=this.state;
       
        this.setState({
            offset:offset+1,
            refreshing:true,
        },()=>{
            console.log("offset123",this.state.offset)
            this.loadProductList();
        })
        
        
    }
    

    componentWillMount() {
        this.setState({ spinner: true });
        var totalItems = this.getTotalItems();
        totalItems === 0 ? EventRegister.emit('updateShoppingCartItemsCount', '') : EventRegister.emit('updateShoppingCartItemsCount', totalItems);        
        
    }

    componentDidMount() {
        addCommonListeners(this);
       this.loadProductList();
       Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          visible: false,
          ...Platform.select({ android: { drawBehind: true } })
        },
      });
    }

    componentWillReceiveProps(nextProps) {
        const{offset,productsByMasterTypeData}=this.state;
        if (nextProps.isProductsByMasterTypeDataLoaded !== this.props.isProductsByMasterTypeDataLoaded) {
            if (1 === nextProps.isProductsByMasterTypeDataLoaded) {
                this.setState({ 
                    spinner: false,
                    refreshing: false ,
                    isProductLitsLoaded:1,
                    productsByMasterTypeData:offset===1?nextProps.productsByMasterTypeData:[...productsByMasterTypeData,...nextProps.productsByMasterTypeData],
                });
                
            }else if(2 === nextProps.isProductsByMasterTypeDataLoaded){
                this.setState({ 
                    spinner: false,
                    refreshing: false ,
                    isProductLitsLoaded:2,
                    productsByMasterTypeData:[]
                });
            }
        }
        // if (nextProps.productsByMasterTypeData !== this.props.productsByMasterTypeData ) {
        //     if(nextProps.productsByMasterTypeData && nextProps.productsByMasterTypeData.length > 0) {
        //         this.setState({ productsByMasterTypeData:nextProps.productsByMasterTypeData });
        //     }
        // }
    }
    
    componentWillUnmount() {
        // EventRegister.removeEventListener(this.listener)
    }

    onSortPress=()=>{
        // alert("sort")      
       
        this.setState({ spinner: true });
        const{sortType} = this.state;
        this.setState({ 
            sortType: sortType==='null'?'asc':sortType==='asc'?'desc':'asc', 
        },()=>{
            this.props.getAllProductsByMasterType({
                categoryId: this.props.categoryId,
                type: this.props.type,
                sort: sortType==='null'?'asc':sortType==='asc'?'desc':'asc', 
                offset:this.state.offset,
                count:this.state.count
            });
        });
        this.flatListRef.scrollToIndex({animated: true,index:0});
        //this.ListView_Ref.scrollToOffset({ offset: 0,  animated: true });

       
    }

    onProductDetail=(productItem)=>{
        console.log("productItem is "); console.log(productItem);
        productItem.Quantity = "1";
        onNavigation( "navigation.ismart.ProductDetail",productItem.ProductName, this.props.componentId, {productDetails: productItem, productId: productItem.ProductId, categoryId: productItem.CatagoryId,  type:"Cata", }, )
    }

    getTotalItems=()=>{
        var itemsCount = 0;
        for(i=0; i<this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount +  parseInt(tempItem.Quantity, 10);
        }
        // console.log(itemsCount);
        return itemsCount;
    }

    
    updateSearch =() => {
        onNavigation("navigation.ismart.SearchPageMaster","Search Products",this.props.componentId,{
            categoryId:this.props.categoryId,
            type: this.props.type,
            sortType:this.state.sort,
        })

        
    }
    _renderFooterList=()=>{
        <TouchableOpacity onPress={()=>{alert("haiii");}}>
            <Text>Load More</Text>
        </TouchableOpacity>
    }
    _renderProductList=({item})=>(
        <ProductListItem 
                        key={item.ProductId+item.SUK} 
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
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                  <TouchableOpacity onPress={()=>this.updateSearch()}>
                <Button icon="search-web" color={colors.textBlack} mode="text" style={commonStyle.searchBarInputContainerStyle }>
  Search Products..
</Button>
               
                </TouchableOpacity>
                
                <View style={productListStyle.headingTextContainer}>
                    <Text style={productListStyle.headingTextStyle}>{this.props.categoryName}</Text>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onSortPress} imageStyle={productListStyle.sortButtonImageStyle} title1Style={productListStyle.sortButtonTextStyle} buttonStyle={productListStyle.sortButtonStyle} iconPath={images.sort} title1="SORT" />
                </View> 
                
                        
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                {/* <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={}/> } >  */}
                    <View style={productListStyle.scrollContainer}  >
                        {this.state.productsByMasterTypeData && this.state.productsByMasterTypeData.length > 0 ?  
                        <FlatList
                            data={this.state.productsByMasterTypeData}
                            ref={(ref) => { this.flatListRef = ref; }}
                            renderItem={this._renderProductList}
                            keyExtractor={item=>item.SUK+'-'+item.ProductId}
                            onRefresh={this._onRefresh}
                            onEndReached={this._onScrollLoadData}
                            refreshing={this.state.refreshing}
                            // onEndThreshold={-100}
                            onEndReachedThreshold={1}
                            FooterComponent={this._renderFooterList}
                            style={{
                                marginBottom:130
                            }}
                           
                        />
                        
                        :<View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.state.isProductLitsLoaded===0?'Loading...':'List is empty!'}</Text></View>}
                    </View>                                       
                {/* </ScrollView> */}
                
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData,
    productsByMasterTypeData: state.category.productsByMasterTypeData,
    isProductsByMasterTypeDataLoaded: state.category.isProductsByMasterTypeDataLoaded,  
})

const mapDispatchToProps = {
    ...CategoryAction,
    ...ShoppingCartAction, 
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

// appliancesData: [{ imageSource: images.charger1, discountPrice:"5,500.00", markedPrice:"12000.00", model:"DL-C17", companyName: 'LDNIO',  specification:'USB Car Charger 1000MA Output', description:'The quick brown fox jumps over the lazy dog. This is an extremely good product', }, 
            //                  { imageSource: images.charger2, discountPrice:"9,500.00", markedPrice:"14,000.00", model:"DC-254", companyName: 'TESSCO',  specification:'Single USB Charger 1000MA Output', description:'This is an extremely good product. The quick brown fox jumps over the lazy dog.',},                             
            //                 ],