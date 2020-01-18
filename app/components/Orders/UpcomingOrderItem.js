import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomIconInfoButton, CustomButton, PlusMinusButton } from '../Common/index';

import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class UpcomingOrderItem extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    handleOrderDetailPress=()=>{
        this.props.gotoOrderDetail();
    }

    render() {
        const {mainContainer,IDTitle,IDTitleTextStyle,IDInfo,IDInfoTextStyle,time,timeTextStyle,
                button1Style,button1Text,button1TextStyle,button2Style,button2Text,button2TextStyle}=this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                <View style={styles.subContainer1}>
                    <TouchableOpacity  onPress={this.handleOrderDetailPress} style={styles.leftContainer}>
                        <Text style={IDTitleTextStyle ? IDTitleTextStyle : styles.IDTitleTextStyle} >{IDTitle}</Text>
                        <Text style={IDInfoTextStyle ? IDInfoTextStyle : styles.IDInfoTextStyle} >{IDInfo}</Text>
                    </TouchableOpacity>

                    <View style={styles.rightContainer}>
                        <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                        {/* <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button1Style ? button1Style : styles.button1Style} buttonTextStyle={button1TextStyle ? button1TextStyle : styles.button1TextStyle} buttonText={button1Text} />
                        <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button2Style ? button2Style : styles.button2Style} buttonTextStyle={button2TextStyle ? button2TextStyle : styles.button2TextStyle} buttonText={button2Text} />  */}
                    </View>
                </View>
                {/* <View style={styles.subContainer2}>
                    <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                </View>                 */}
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
        // borderWidth:1,
        // borderColor:colors.black,
        // height:65, 
        height:30,
        width:"95%",
        marginRight:"5%",
        // marginTop:8,
        marginBottom:5,
    },
    subContainer1:{
        flexDirection:"row",
        width:"95%",
        alignSelf:"center",
        justifyContent:"space-between",
        // backgroundColor:colors.darkPurple,
        // marginTop:15,
        // height:"50%",
        height:"100%",
    },
    subContainer2:{
        flexDirection:"row",
        width:"95%",
        alignSelf:"center",
        justifyContent:"flex-end",
        // backgroundColor:colors.blue,
        // marginTop:10,
        height:"50%",
    },
    leftContainer:{
        width:"50%",
        height:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    rightContainer:{
        width:"50%",
        height:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",

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
        // fontWeight:"bold",
        color:colors.darkGrey,
        // marginTop:5,
        marginTop:0,
    },
    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.navigationBarBlue,
        marginLeft:8,
    },
    button1Style:{
        width:"47%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginRight:8,
        backgroundColor:colors.navigationBarBlue,
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
        color:colors.lightRed,
    },

})