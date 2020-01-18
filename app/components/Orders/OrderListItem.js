import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomButton } from '../Common/index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class OrderListItem extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const { IDTitle,IDTitleTextStyle,IDInfo,IDInfoTextStyle,address,addressTextStyle,
        button1Style,button1Text,button1TextStyle,button2Style,button2Text,button2TextStyle,
        status,statusTextStyle,time,timeTextStyle }=this.props;
        return ( 
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.left1Container}>
                        <Text style={IDTitleTextStyle ? IDTitleTextStyle : styles.IDTitleTextStyle} >{IDTitle}</Text>
                        <Text style={IDInfoTextStyle ? IDInfoTextStyle : styles.IDInfoTextStyle} >{IDInfo}</Text>
                    </View>
                    <View style={styles.left2Container}>
                        <Text style={addressTextStyle ? addressTextStyle : styles.addressTextStyle} >{address}</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.right1Container}>
                        <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button1Style} buttonTextStyle={button1TextStyle} buttonText={button1Text} />
                        <CustomButton onPress={this.handlePress} activeOpacity={0.7} buttonStyle={button2Style} buttonTextStyle={button2TextStyle} buttonText={button2Text} />    
                    </View>
                    <View style={styles.right2Container}>
                        <Text style={statusTextStyle ? statusTextStyle : styles.statusTextStyle} >{status}</Text>
                        <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                    </View>
                </View>
            </View>
            // <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.handlePress} style={this.props.buttonStyle}><Text style={this.props.buttonTextStyle} >{this.props.buttonText}</Text></TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        marginTop:8,
        marginBottom:8, 
        backgroundColor:colors.white, 
        height:60,
        width:"90%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    leftContainer:{
        width:"50%",
        height:"100%",
        alignItems:"flex-start",
        justifyContent:"center",
    },
    left1Container:{
        width:"100%",
        height:"50%",
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    left2Container:{
        width:"100%",
        height:"50%",
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    rightContainer:{
        width:"50%",
        height:"100%",
        alignItems:"flex-end",
        justifyContent:"center",
    },
    right1Container:{
        width:"100%",
        height:"50%",
        flexDirection:"row",
        justifyContent:"flex-end",
    },
    right2Container:{
        width:"100%",
        height:"50%",
        flexDirection:"row",
        justifyContent:"flex-end",
    },
    IDTitleTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.black,        
    },
    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.navigationBarBlue,          
    },
    addressTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,  
    },
    statusTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
    },
    timeTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
    },
})