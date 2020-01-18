import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomIconInfoButton, PlusMinusButton } from '../Common/index';
import UserAvatar from 'react-native-user-avatar';
// import { RoundedButton, CustomButton } from './index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

//<UserAvatar size="80" name={item.title} />

export default class MessageItem extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const {mainContainer,title,message,messageTextStyle,IDTitleTextStyle,IDInfoTextStyle,IDTitle,IDInfo,
            addressTextStyle,address,timeTextStyle,time}=this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.leftContainer}>
                        <View><UserAvatar size="46" name={title} /></View>
                    </View>
                    <View style={styles.middleContainer}>
                        <View style={styles.customerInfoTextStyle}>
                            <Text style={IDTitleTextStyle ? IDTitleTextStyle : styles.IDTitleTextStyle} >{IDTitle}</Text>
                            <Text style={IDInfoTextStyle ? IDInfoTextStyle : styles.IDInfoTextStyle} >{IDInfo}</Text>
                        </View>
                        <Text numberOfLines={2} style={addressTextStyle ? addressTextStyle : styles.addressTextStyle} >{address}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={timeTextStyle ? timeTextStyle : styles.timeTextStyle} >{time}</Text>
                    </View>
                </View>
                <View style={styles.messageContainer}>
                    <View style={{width:"16%", height:"100%"}}>

                    </View>
                    <View style={{width:"84%", height:"100%",}}>
                        <Text numberOfLines={5} style={messageTextStyle ? messageTextStyle : styles.messageTextStyle} >{message}</Text>
                    </View>
                    
                </View>
                <View style={styles.buttonsContainer}>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.handlePress} title1Style={styles.viewButtonTextStyle} buttonStyle={styles.viewButtonStyle} title1="VIEW" />
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.handlePress} imageStyle={styles.returnButtonImageStyle} buttonStyle={styles.returnButtonStyle} iconPath={images.previous} />
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.handlePress} imageStyle={styles.removeButtonImageStyle} buttonStyle={styles.removeButtonStyle} iconPath={images.red_delete} />
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{        
        alignSelf:"center",
        backgroundColor:colors.white, 
        height:160, 
        width:"95%",
        marginRight:"5%",
        marginTop:8,
        marginBottom:8,
    },
    avatarContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        alignSelf:"center",
        width:"95%",
        height:"40%",
        // backgroundColor:colors.darkPurple,
    },
    messageContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        alignSelf:"center",
        width:"95%",
        height:"40%",
        // backgroundColor:colors.gold,
    },
    buttonsContainer:{
        width:"95%",
        height:"20%",
        alignSelf:"center",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",        
        // backgroundColor:colors.darkPurple,
    },

    leftContainer:{
        width:"16%",
        // backgroundColor:colors.blue
    },
    middleContainer:{
        width:"74%",
        // backgroundColor:colors.gold
    },
    rightContainer:{
        width:"10%",    
        // backgroundColor:colors.lightRed    
    },

    viewButtonTextStyle:{
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
    },

    viewButtonStyle:{
        height:"100%",
        width:40,
        marginRight:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:colors.gold,
    },
    
    returnButtonStyle:{
        height:"100%",
        width:30,
        marginRight:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:colors.gold,
    },

    returnButtonImageStyle:{
        height:16,
        width:16,
    },

    removeButtonStyle:{
        height:"100%",
        width:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:colors.gold,
    },

    removeButtonImageStyle:{
        height:16,
        width:16,
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

    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.navigationBarBlue,
        marginLeft:8,
    },

    timeTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
        marginBottom:14,
        alignSelf:"flex-end",
    },
    addressTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,        
    },    
    messageTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,        
    },

    imageStyle:{
        width:"100%",
        height:"100%",
    },

    discountTextStyle: {
        color:colors.red,
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        marginRight:12,
        marginBottom:10,
        // backgroundColor:colors.gold,
    },   
})