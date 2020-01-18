import React, { Component } from 'react'
import { ImageBackground,Platform,Image,ToastAndroid, TouchableOpacity, ScrollView, View, Text, Dimensions,Modal } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from "react-native-loading-spinner-overlay";
import cloneDeep from 'lodash/cloneDeep';
import ImageViewer from 'react-native-image-zoom-viewer';
import Toast from 'react-native-simple-toast';



import { productListStyle } from './ProductListStyle';
import { commonStyle} from '../Common/CommonStyle';
import ProductListItem from './ProductListItem';
import { CustomIconInfoButton, PlusMinusButton, CustomButton } from '../Common/index';

import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';
import { productDetailStyle } from './ProductDetailStyle';

//Action
import { CategoryAction } from "../../redux/actions/index";
import { ShoppingCartAction } from "../../redux/actions/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

let eventSubscription;

export class ProductDetail extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            shoppingCartData:this.props.shoppingCartData ? this.props.shoppingCartData : [],
            productDetails: this.props.productDetails ? this.props.productDetails  : [],
            count: this.props.productDetails && this.props.productDetails.Quantity ? parseInt(this.props.productDetails.Quantity,10) : 1,
            isImageViewVisible:false,
            productImages:[],
            imageIndex:0
        };
        // this.register();
        // this.props.getAllProductsByMasterType({
        //     categoryId: this.props.categoryId,
        //     type: this.props.type,
        //   });
        Navigation.events().bindComponent(this);
        this.setState({ spinner: true });
        this.props.getProductById({
            productId: this.props.productId,
        });
    }

   

    componentWillMount() {
        this.setState({ spinner: true });
        var totalItems = this.getTotalItems();
        totalItems === 0 ? EventRegister.emit('updateShoppingCartItemsCount', '') : EventRegister.emit('updateShoppingCartItemsCount', totalItems);        
    }

    componentDidMount() {
        addCommonListeners(this);
        Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
              visible: false,
              ...Platform.select({ android: { drawBehind: true } })
            },
          });
    }



   

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.isProductByIdDataLoaded !== this.props.isProductByIdDataLoaded) {
            
            if (1 === nextProps.isProductByIdDataLoaded) {

                //Bind Gallery Images
                const productImages=[];
                productImages.push({url:nextProps.productByIdData.ProductImage});
                if(nextProps.productByIdData.File&&nextProps.productByIdData.File.length>0){
                    nextProps.productByIdData.File.map((imgItem,index)=>{
                        productImages.push({url:imgItem});
                    })
                }
                this.setState({ 
                    spinner: false,
                    productImages 
                });
                console.log(productImages)
            }else if(2 === nextProps.isProductByIdDataLoaded){
                this.setState({ spinner: false });
            }
        }

        if (nextProps.productByIdData !== this.props.productByIdData ) {
            if(nextProps.productByIdData && nextProps.productByIdData.length > 0) {
                
                this.setState({ spinner: false });
                // this.setState({ feedsData:nextProps.feedsData });
            }
        }
    }

    getTotalItems=()=>{
        var itemsCount = 0;
        for(i=0; i<this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount +  parseInt(tempItem.Quantity, 10);
        }
        console.log('items count is '); console.log(itemsCount);
        return itemsCount;
    }

    onAddToCartPress=()=>{
       
        
        let productItem = this.state.productDetails;
        // let productItem = cloneDeep(this.state.productDetails);
        let arrTemp = this.state.shoppingCartData;
        console.log("shopping car data");
        console.log(this.state.shoppingCartData);

        // proceed to add item to shopping cart
        var isItemAlreadyExistsInArray = false;
        for(i=0; i<arrTemp.length; i++) {
            let tempItem = arrTemp[i];
            if(tempItem.ProductId == productItem.ProductId) {
                // item is the same, so assign same quantity in shopping cart
                isItemAlreadyExistsInArray = true;
                var count = parseInt(tempItem.Quantity, 10);
                // console.log("count before"); console.log(count);
                var productItemCount =  parseInt(productItem.Quantity, 10);
                // console.log("count to increment"); console.log(productItemCount);
                // count = count + productItemCount;
                count = productItemCount;
                // console.log("count after"); console.log(count);
                tempItem.Quantity = count.toString();
                arrTemp[i] = tempItem;
                break;
            } 
        }
        if(!isItemAlreadyExistsInArray){
            arrTemp.push(productItem);
        }
        this.setState({ shoppingCartData: arrTemp});
        console.log("shopping cart");
        console.log(this.state.shoppingCartData);
        this.props.saveShoppingCartItems({
            shoppingCartData: this.state.shoppingCartData,
          });
        var totalItems = this.getTotalItems();
        let tostMsg=productItem.ProductName+" added successfully ";
        if(Platform.OS==='ios'){
            Toast.show(tostMsg);
        }else{
           
            ToastAndroid.show(tostMsg,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
                );
        }
        
        EventRegister.emit('updateShoppingCartItemsCount', totalItems);
    }

    onShoppingCartPress=()=>{

        let arrTemp = this.state.shoppingCartData;
        if(arrTemp && arrTemp.length > 0 ) {

        } else {
            alert("Shopping cart is empty!");
            return;            
        }

        // onNavigationPopToRoot(this.props.componentId);
        onNavigation(
            "navigation.ismart.ShoppingCart",
            // "Shopping Cart",
            "Checkout Here",
            this.props.componentId,
            this.prop,        
        )    
    }

    updateSearch = search => {
        this.setState({ search });
    };
    toggleImage = () => {
        
       console.log(this.state.isImageViewVisible);
        this.setState({ 
            isImageViewVisible: !this.state.isImageViewVisible,
           
        })
      }
    

    render() {
        const { search,productImages } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Car Charger" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                {/* //productByIdData */}
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <ScrollView>                     
                    <Text style={productDetailStyle.headingTextStyle}>{ this.props.productByIdData.ProductName } </Text>
                    <Text style={productDetailStyle.subHeadingTextStyle}> { this.props.productByIdData.ManufactureName } </Text>
                    <View style={productDetailStyle.subContainer}>
                       
                    <TouchableOpacity   onPress={this.toggleImage}>
                    
                    <Image 
                    style={productDetailStyle.productImageStyle} 
                    onPress={this.toggleImage} 
                    source={{uri:this.props.productByIdData.ProductImage}} 
                    
                    />
                    </TouchableOpacity>
                   
                  
                        
                       
                    </View> 
                    <ScrollView style={commonStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.props.productByIdData.File && this.props.productByIdData.File.length > 0 ?  this.props.productByIdData.File.map((item,i) => (
                        <CustomIconInfoButton 
                        key={i} 
                        onPress={this.toggleImage} 
                        activeOpacity={0.7} 
                        buttonStyle={productDetailStyle.buttonStyle} 
                        imageStyle={productDetailStyle.imageStyle} 
                        urlImage={item} 
                         />
                        )):null}
                    </ScrollView>
                    <View style={{marginBottom:8}}>
                        <View style={productDetailStyle.priceStyle}>
                            <Text style={ productDetailStyle.discountTextStyle } >₹ {this.props.productByIdData ? this.props.productByIdData.Price+" + GST" : ""}</Text>
                            
                        </View>
                        
                        <Text style={ productDetailStyle.descriptionTextStyle} >{this.props.productByIdData ? this.props.productByIdData.Description : ""}</Text>
                    </View>
                    <View>
                    <View style={productDetailStyle.rightContainer}>
                            <NumericInput 
                                value={this.state.count} 
                                onChange={value => { 
                                    this.setState({count:value}); 

                                    // update quantity in product details
                                    let productItem = this.state.productDetails;
                                    productItem.Quantity = value.toString();
                                    this.setState({productDetails:productItem}); 
                                    console.log(this.state.productDetails);
                                } }
                                containerStyle={{marginRight:8}}
                                totalWidth={90} 
                                totalHeight={30} 
                                iconSize={25}
                                step={1}
                                minValue={1}                       
                                textColor={colors.textBlack} 
                                borderColor={colors.mediumGrey}
                                iconStyle={{ color: colors.textBlack }} 
                                upDownButtonsBackgroundColor={colors.white}
                                rightButtonBackgroundColor={colors.searchBarGrey} 
                                leftButtonBackgroundColor={colors.searchBarGrey}
                                textColor={colors.textBlack} 
                            />                            
                        </View>
                    </View>
                    
                </ScrollView>
                <View>
                
                </View>
                <View style={productDetailStyle.cartButtonsContainer}>
                    <CustomButton onPress={this.onAddToCartPress} activeOpacity={0.7} buttonStyle={productDetailStyle.cartButtonStyle} buttonTextStyle={productDetailStyle.cartButtonTextStyle} buttonText="ADD TO CART" />
                    {/* <CustomButton onPress={this.onShoppingCartPress} activeOpacity={0.7} buttonStyle={[productDetailStyle.cartButtonStyle,{backgroundColor:colors.lightRed,}]} buttonTextStyle={productDetailStyle.cartButtonTextStyle} buttonText="BUY NOW" /> */}
                </View>
                <Modal 
                    visible={this.state.isImageViewVisible}
                    animationType="slide" 
                    transparent={true}
                    onRequestClose={this.toggleImage}
                    >
                <ImageViewer 
                imageUrls={productImages} 
                enableImageZoom={true}
                index={this.state.imageIndex}
                />
            </Modal>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    productByIdData: state.category.productByIdData,
    isProductByIdDataLoaded: state.category.isProductByIdDataLoaded,
    shoppingCartData:state.shoppingcart.shoppingCartData, 
    productsByMasterTypeData: state.category.productsByMasterTypeData,
    isProductsByMasterTypeDataLoaded: state.category.isProductsByMasterTypeDataLoaded,
})

const mapDispatchToProps = {
    ...CategoryAction,
    ...ShoppingCartAction, 
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
