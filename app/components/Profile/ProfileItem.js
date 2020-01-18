import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { CustomIconInfoButton, CustomButton, PlusMinusButton } from '../Common/index';
import UserAvatar from 'react-native-user-avatar';
// import { RoundedButton, CustomButton } from './index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';
import images from '../../resources/images';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

//<UserAvatar size="80" name={item.title} />

export default class ProfileItem extends Component {

    constructor(props){
        super(props);
        // console.log(,'Haiiiii')
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const {mainContainer,imageSource,title,address,name,role,orders,phoneNumbers,email,website}=this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                <View style={styles.avatarContainer}>
                    <View>
                        <UserAvatar name="Pr" size="120" src={imageSource} />
                        {/* <Image style={styles.plusImageStyle} source={images.plus_blue}/>  */}
                    </View>
                    <View style={styles.avatarInfoContainer}>
                        <Text style={styles.orderTextStyle}>{orders}</Text>
                        <Text style={[styles.avatarInfoTextStyle,{marginTop:0}]}>Orders</Text>
                    </View>
                    <View style={styles.avatarInfoContainer}>
                        <Image style={styles.avatarInfoImageStyle} source={images.location}/> 
                        <Text style={styles.avatarInfoTextStyle}>Location</Text>
                    </View>
                    <View style={styles.avatarInfoContainer}>
                        <Image style={styles.avatarInfoImageStyle} source={images.phone_call}/> 
                        <Text style={styles.avatarInfoTextStyle}>Call</Text>
                    </View>
                </View>
                <Text style={styles.titleTextStyle}>{title}</Text>
                <Text numberOfLines={2} style={styles.addressTextStyle}>{address}</Text>
                <View style={styles.infoContainer}>
                    <Image style={styles.imageStyle} source={images.user}/>
                    <Text style={[styles.infoTextStyle,{fontWeight:'bold'}]}>{name}</Text>
                    <Text style={[styles.infoTextStyle,{marginLeft:3}]}>({role})</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Image style={styles.imageStyle} source={images.phone_call}/>
                    <Text style={styles.infoTextStyle}>{phoneNumbers}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Image style={styles.imageStyle} source={images.email}/> 
                    <Text style={styles.infoTextStyle}>{email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Image style={styles.imageStyle} source={images.internet}/> 
                    <Text style={styles.infoTextStyle}>{website}</Text>
                </View>
                {/* <CustomButton activeOpacity={0.7} onPress={this.handlePress} buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} buttonText="EDIT PROFILE" /> */}
                {this.props.customerData!==undefined&&
                <View style={{
                    margin:20,
                   
                }}>
                   
                    
                     <Text style={styles.extraFieldStyle}>{this.props.customerData.Field1}</Text>
                     <Text style={styles.extraFieldStyle}>{this.props.customerData.Field2}</Text>
                     <Text style={styles.extraFieldStyle}>{this.props.customerData.Field3}</Text>
                    
                </View>
    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{        
        alignSelf:"center",
        backgroundColor:colors.white, 
        height:'100%', 
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
        height:150,
        // backgroundColor:colors.darkPurple,
    },
    titleTextStyle:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack,
        marginLeft:8,
        marginTop:8,  
        fontWeight:'bold'
    },
    orderTextStyle:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack, 
        fontWeight:'bold'
    },
    addressTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack,
        marginLeft:8,
        marginTop:8, 
        width:300,
        // backgroundColor:colors.gold,
    },
    avatarInfoContainer:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        // backgroundColor:colors.lightRed,
    },
    avatarInfoTextStyle:{
        marginTop:4,
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack,
        alignSelf:"center",
    },
    plusImageStyle:{ 
        height:32, 
        width:32,
        position:"absolute",
        marginLeft:90,
        marginTop:80,
    },
    avatarInfoImageStyle:{ 
        height:16, 
        width:16,
        marginTop:6,
    },
    infoContainer:{
        marginTop:8,
        height:36,
        width:"95%",
        flexDirection:"row",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"flex-start",
        // backgroundColor:colors.lightRed,
    },
    imageStyle:{ 
        height:16, 
        width:16,
    },
    infoTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack,
        marginLeft:8,
        alignSelf:"center",
        // backgroundColor:colors.gold,
    },
    buttonStyle:{
        marginTop:8,
        marginLeft:8,
        height:40,
        width:150,
        borderColor:colors.textBlack,
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.textBlack,
        alignSelf:"center",
    },
    extraFieldStyle:{
        fontSize:fontSize.large,
        marginLeft:15,
        marginVertical:10,
        color:colors.lightRed
    }
   
})