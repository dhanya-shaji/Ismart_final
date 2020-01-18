import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet,ToastAndroid, Platform} from 'react-native';
import { connect } from 'react-redux'
import NumericInput from 'react-native-numeric-input';
import { CustomIconInfoButton, PlusMinusButton } from '../Common/index';
import { EventRegister } from 'react-native-event-listeners';
// import { RoundedButton, CustomButton } from './index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';
import { ShoppingCartAction } from '../../redux/actions';
import Toast from 'react-native-simple-toast';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ProductListItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: parseInt(this.props.quantity,10),
            shoppingCartData:this.props.shoppingCartData ? this.props.shoppingCartData : [],
        };
    }

    handleProductDetailPress=()=>{
        this.props.onProductDetailPress(this.props.productItem);
    }

    handleAddToCartPress=()=>{
        this.props.onAddToCartPress(this.props.productItem);
    }

    onAddToCart=()=>{
        const{count,shoppingCartData}=this.state;
        const productItem=this.props.productItem;
        console.log("product id issssss ");
        console.log(productItem.ProductId);
        // alert("Item added to shopping cart!");
        productItem.Quantity = count;
        let arrTemp = this.props.shoppingCartData;
        var isItemAlreadyExistsInArray = false;
        for(i=0; i<arrTemp.length; i++) {
            let tempItem = arrTemp[i];
            if(tempItem.ProductId === productItem.ProductId) {
                // alert("item is the same");
                isItemAlreadyExistsInArray = true;
                let existingCount = parseInt(tempItem.Quantity, 10);
                existingCount=parseInt(count)+parseInt(existingCount);
                tempItem.Quantity = existingCount.toString();
                arrTemp[i] = tempItem;
                break;
            } 
        }
        if(!isItemAlreadyExistsInArray){
            arrTemp.push(productItem);
        }
        this.setState({ 
            shoppingCartData: arrTemp,
            
        });
        
        console.log("shopping cart");
        console.log(this.state.shoppingCartData);
        this.props.saveShoppingCartItems({
            shoppingCartData: this.state.shoppingCartData,
          });
        var totalItems = this.getTotalItems();
        EventRegister.emit('updateShoppingCartItemsCount', totalItems); 
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
    render() {
        const {activeOpacity,mainContainer,imageStyle,urlImage,iconPath,quantity,
            productItem,discountPrice,discountTextStyle,markedPrice,markedPriceTextStyle,
                modelTextStyle,companyName,companyNameTextStyle,
                specification,specificationTextStyle,description,descriptionTextStyle}=this.props;
        return (
            <View  
            style={mainContainer ? mainContainer : styles.mainContainer}>
                                
                               
                <View style={styles.leftContainer}>
                <TouchableOpacity 
                onPress={this.handleProductDetailPress} 
                activeOpacity={activeOpacity ? activeOpacity : 0.7}
                >
                    <Image resizeMode="stretch" style={imageStyle ? imageStyle : styles.imageStyle} source={iconPath ? iconPath : {uri:urlImage}}/>
                    <View style={styles.priceStyle}>
                        <Text style={discountTextStyle ? discountTextStyle : styles.discountTextStyle} >{"Item Code:"+productItem.SUK}</Text>
                        {/* <Text style={markedPriceTextStyle ? markedPriceTextStyle : styles.markedPriceTextStyle} >{markedPrice}</Text> */}
                    </View>
                    <Text style={modelTextStyle ? modelTextStyle : styles.modelTextStyle} >{productItem.ManufactureName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={companyNameTextStyle ? companyNameTextStyle : styles.companyNameTextStyle} numberOfLines={2} >{companyName}</Text>
                    <View style={[styles.priceStyle,{marginTop:8,marginBottom:3}]}>
                        <Text style={discountTextStyle ? discountTextStyle : [styles.discountTextStyle,{fontSize:fontSize.large,marginLeft:15,}]} >₹ {discountPrice+" + GST"}</Text>
                        {/* <Text style={markedPriceTextStyle ? markedPriceTextStyle : [styles.markedPriceTextStyle,{fontSize:fontSize.large,marginRight:15,}]} >INR {markedPrice}</Text> */}
                    </View>
                    {/* <Text style={specificationTextStyle ? specificationTextStyle : styles.specificationTextStyle} >{specification}</Text>
                    <Text style={descriptionTextStyle ? descriptionTextStyle : styles.descriptionTextStyle} >{description}</Text> */}
                    <View style={styles.buttonsContainer}>
                        <NumericInput 
                            value={this.state.count} 
                            onChange={value => { this.setState({count:value}); } }
                            containerStyle={{marginLeft:8}}
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
                        />
                        <CustomIconInfoButton activeOpacity={0.7} onPress={this.onAddToCart} title1Style={styles.cartButtonTextStyle} buttonStyle={styles.cartButtonStyle} title1="ADD TO CART" />
                        
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData,
   
})

const mapDispatchToProps = {
    ...ShoppingCartAction
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListItem)
const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"space-between",
        // backgroundColor:colors.white, 
        height:170, 
        width:"100%",
        margin:5,
    },
    leftContainer:{
        width:"35%",
        height:"100%",
        backgroundColor:colors.white,
        margin:5
    },
    rightContainer:{
        width:"65%",
        height:"100%",
        // backgroundColor:colors.darkPurple,
    },
    priceStyle:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between",
        marginTop:5,
    },
    buttonsContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between",
        marginTop:20,
        // backgroundColor:colors.darkPurple
    },
    imageStyle:{
        width:"99%",
        height:100,
    },
    discountTextStyle: {
        color:colors.blue,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:8,
    },
    markedPriceTextStyle: {
        color:colors.darkGrey,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        margin:8,
       
    },
    modelTextStyle: {
        color:colors.black,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:8,
        
    },
    companyNameTextStyle: {
        color:colors.black,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
        marginTop:15,
        width:'80%',
        fontWeight:'bold'

    },
    specificationTextStyle: {
        color:colors.black,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
    },
    descriptionTextStyle: {
        color:colors.black,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
        marginRight:15,
        marginTop:15,
    },
    cartButtonStyle:{
        height:30,
        width:90,
        marginRight:15,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.navigationBarBlue,
    },
    cartButtonTextStyle:{
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
        alignSelf:"center",
        textAlign:"center",
    },
    plusMinusButtonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"flex-end",
        height:40,
        width:90,
        marginRight:15,
    },
})