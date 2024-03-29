import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomIconInfoButton, CustomButton, PlusMinusButton } from '../Common/index';

import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class PreviousSaleOrderItem extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    getTotalItems=(totalItems)=>{
        var str = "";
        str = totalItems + " Items";
        return str;
    }

    getTotalAmount=(totalAmount)=>{
        var str = "";
        str = "INR " + totalAmount;
        return str;
    }

    handleOrderDetailPress=()=>{
        this.props.gotoOrderDetail();
    }

    render() {
        const {mainContainer,IDTitle,IDTitleTextStyle,IDInfo,IDInfoTextStyle,time,timeTextStyle,address,addressTextStyle,
                status,statusTextStyle,button1Style,button1Text,button1TextStyle,button2Style,button2Text,button2TextStyle}=this.props;
        var strTotalItems = this.getTotalItems(button1Text);
        var strTotalAmount = this.getTotalAmount(button2Text);
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={this.handleOrderDetailPress} style={styles.customerInfoTextStyle}>
                            <Text style={IDTitleTextStyle ? IDTitleTextStyle : styles.IDTitleTextStyle} >{IDTitle}</Text>
                            <Text numberOfLines={1} style={IDInfoTextStyle ? IDInfoTextStyle : styles.IDInfoTextStyle} >{IDInfo}</Text>
                        </TouchableOpacity>
                        <Text numberOfLines={2} style={addressTextStyle ? addressTextStyle : styles.addressTextStyle} >{address}</Text>
                    </View>

                    <View style={styles.rightContainer}>
                        <View style={styles.rightButtonsContainer}>
                            <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button1Style ? button1Style : styles.button1Style} buttonTextStyle={button1TextStyle ? button1TextStyle : styles.button1TextStyle} buttonText={strTotalItems} />
                            <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button2Style ? button2Style : styles.button2Style} buttonTextStyle={button2TextStyle ? button2TextStyle : styles.button2TextStyle} buttonText={strTotalAmount} />
                        </View>
                        <View style={styles.rightTextContainer}>
                            <Text style={statusTextStyle ? statusTextStyle : styles.statusTextStyle} >{status}</Text>
                            <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        // flexDirection:"row",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor:colors.white, 
        height:65, 
        width:"95%",
        marginRight:"5%",
        // marginTop:8,
        // marginBottom:8,
    },
    subContainer:{
        flexDirection:"row",
        width:"95%",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"space-between",
        // backgroundColor:colors.darkPurple,
        marginTop:15,
        height:"100%",
    },

    leftContainer:{
        width:"50%",
        height:"100%",
        // flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        // backgroundColor:colors.blue,
    },
    customerInfoTextStyle:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start",
        marginTop:5,
    },
    rightButtonsContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-end",
        height:"50%",
        width:"100%",
    },
    rightTextContainer:{
        flexDirection:"row", 
        alignItems:"flex-start",
        justifyContent:"space-between",
        height:"50%",
        width:"100%",
    },
    rightContainer:{
        width:"50%",
        height:"100%",
        //flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        // backgroundColor:colors.darkPurple,
    },
    IDTitleTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.black,        
    },
    timeTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,  
        marginTop:2,      
    },
    statusTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
        paddingLeft:3,
    },
    addressTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,        
    },
    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.navigationBarBlue,
        marginLeft:8,
        flex:1,
    },
    button1Style:{
        width:"47%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginRight:8,
        backgroundColor:colors.lightRed,
    },
    button1TextStyle:{
        fontSize:fontsize.xxsmall,
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.white,
    },
    button2Style:{
        width:"47%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.lightGrey,
    },
    button2TextStyle:{
        fontSize:fontsize.xxsmall,
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.black,
    },

})