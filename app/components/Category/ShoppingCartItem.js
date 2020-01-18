import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import NumericInput from 'react-native-numeric-input';
import { CustomIconInfoButton, PlusMinusButton } from '../Common/index';
// import { RoundedButton, CustomButton } from './index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';

//Action
import { ShoppingCartAction } from "../../redux/actions/index";

import { EventRegister } from 'react-native-event-listeners';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class ShoppingCartItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            count: parseInt(this.props.quantity,10),
            shoppingCartData : this.props.shoppingCartData,
        };
        console.log(this.state.shoppingCartData);
    }

    handlePress=()=>{
        this.props.onRemovePress(this.props.productId);
    }

    handleUpdateShoppingCart(){
        this.props.onUpdateShoppingCartPress('placeholder for x');
     }
     getTotalItems=()=>{
        var itemsCount = 0;
        for(i=0; i<this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount +  parseInt(tempItem.Quantity, 10);
        }
        EventRegister.emit('updateShoppingCartItemsCount', itemsCount); 
    }





     
    render() {
        const {mainContainer,imageStyle,urlImage,iconPath,discountPrice,discountTextStyle,companyName,companyNameTextStyle,
                quantity,productId,specification,specificationTextStyle,quantityTextStyle,}=this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>

                <View style={styles.leftContainer}>
                    <Image resizeMode="contain" style={imageStyle ? imageStyle : styles.imageStyle} source={iconPath ? iconPath : {uri:urlImage}}/>                    
                </View>

                <View style={styles.middleContainer}>
                    <Text style={companyNameTextStyle ? companyNameTextStyle : styles.companyNameTextStyle} >{companyName}</Text>
                    <Text style={specificationTextStyle ? specificationTextStyle : styles.specificationTextStyle} >{specification}</Text>
                    <Text style={quantityTextStyle ? quantityTextStyle : styles.quantityTextStyle} >Quantity: {this.state.count}</Text>
                    {/* <PlusMinusButton onPress={this.handlePress} mainContainer={styles.plusMinusButtonContainer} /> */}
                    <NumericInput 
                        value={this.state.count} 
                        // onChange={ this.setState({ count: value}) }
                        onChange={value => {
                            this.setState({count:value});
                            // updating the count in shopping cart in case the item already exists in shopping cart
                            let arrTemp = this.state.shoppingCartData;
                            for(i=0; i<arrTemp.length; i++) {
                                let tempItem = arrTemp[i];
                                if(tempItem.ProductId == productId) {
                                    tempItem.Quantity = this.state.count.toString();
                                    arrTemp[i] = tempItem;
                                    this.setState({ shoppingCartData: arrTemp});
                                    this.props.saveShoppingCartItems({
                                        shoppingCartData: this.state.shoppingCartData,
                                    });
                                    this.handleUpdateShoppingCart();
                                    this.getTotalItems();
                                    break;
                                } 
                            }
                        } } 
                        containerStyle={{marginLeft:15, marginTop:10}}
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
                </View>
                
                <View style={styles.rightContainer}>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.handlePress} imageStyle={styles.removeButtonImageStyle} title1Style={styles.removeButtonTextStyle} buttonStyle={styles.removeButtonStyle} iconPath={images.delete} title1="Remove" />
                    <Text style={discountTextStyle ? discountTextStyle : styles.discountTextStyle} >INR {discountPrice}</Text>
                </View>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData, 
})

const mapDispatchToProps = {
    ...ShoppingCartAction,     
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartItem)

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"space-between",
        backgroundColor:colors.white, 
        height:130, 
        width:"95%",
        marginRight:"5%",
        marginTop:8,
        marginBottom:8,
    },
    leftContainer:{
        width:"25%",
        height:"100%",
    },
    middleContainer:{
        width:"50%",
        height:"100%",
    },
    rightContainer:{
        width:"25%",
        height:"100%",
        alignItems:"flex-end",
        justifyContent:"space-between",
        // backgroundColor:colors.darkPurple,
    },
    imageStyle:{
        width:"100%",
        height:"100%",
    },
    plusMinusButtonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:40,
        width:90,
        marginLeft:15,
        marginTop:10,
        borderColor:colors.mediumGrey,
        borderWidth:1,
    },
    discountTextStyle: {
        color:colors.blue,
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        marginRight:12,
        marginBottom:10,
        // backgroundColor:colors.gold,
    },

    companyNameTextStyle: {
        color:colors.black,
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
        marginTop:15,
    },
    specificationTextStyle: {
        color:colors.black,
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
    },
    quantityTextStyle: {
        color:colors.black,
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
    },
    removeButtonStyle:{
        height:30,
        width:80,
        marginTop:12,
        marginRight:15,
        flexDirection:"row-reverse",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:colors.gold,
    },
    removeButtonTextStyle:{
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
        marginRight:3,
    },
    removeButtonImageStyle:{
        height:16,
        width:16,

    },
})