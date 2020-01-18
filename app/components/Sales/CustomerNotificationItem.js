import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomIconInfoButton, CustomButton, PlusMinusButton } from '../Common/index';

import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class CustomerNotificationItem extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const {mainContainer,IDTitle,IDTitleTextStyle,IDInfo,IDInfoTextStyle,time,timeTextStyle,description,descriptionTextStyle,}=this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                <View style={styles.subContainer1}>
                    <View style={styles.customerInfoTextStyle}>
                        <Text style={IDTitleTextStyle ? IDTitleTextStyle : styles.IDTitleTextStyle} >{IDTitle}</Text>
                        <Text style={IDInfoTextStyle ? IDInfoTextStyle : styles.IDInfoTextStyle} >{IDInfo}</Text>
                    </View>
                    <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                </View>
                <View style={styles.subContainer2}>
                    <Text numberOfLines={2} style={descriptionTextStyle ? descriptionTextStyle : styles.descriptionTextStyle} >{description}</Text>
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
        height:70, 
        width:"95%",
        marginRight:"5%",
        // marginTop:8,
        // marginBottom:8,
    },
    subContainer1:{
        flexDirection:"row",
        width:"95%",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"space-between",
        // backgroundColor:colors.darkPurple,
        marginTop:15,
        height:"50%",
    },
    subContainer2:{
        flexDirection:"row",
        width:"95%",
        alignSelf:"center",
        justifyContent:"flex-start",
        // backgroundColor:colors.blue,
        // marginTop:15,
        height:"50%",
    },
    customerInfoTextStyle:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start"
    },
    
    IDTitleTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.black,        
    },
    timeTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,        
    },
    descriptionTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
        // paddingBottom:5,
        // backgroundColor:colors.blue,
    },
    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.navigationBarBlue,
        marginLeft:8,
    },
})