import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableNativeFeedback, Dimensions, StyleSheet} from 'react-native';
import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class CustomIconInfoButton extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }
    handlePlusImagePress=()=>{
        this.props.onPlusImagePress();
    }

    render() {
        const {activeOpacity,buttonStyle,plusImageStyle,imageStyle,iconPath,urlImage,plusImage,title1,title2,title3,title1Style,title2Style,title3Style}=this.props;
        return (           
            <TouchableOpacity activeOpacity={activeOpacity} onPress={this.handlePress} style={buttonStyle}>
                <Image style={imageStyle ? imageStyle : styles.imageStyle} source={iconPath ? iconPath : {uri:urlImage}}/>
                <TouchableWithoutFeedback  activeOpacity={activeOpacity} onPress={this.handlePlusImagePress}>
                    <Image  style={plusImageStyle ? plusImageStyle : styles.plusImageStyle} source={plusImage}/>
                </TouchableWithoutFeedback >
                <Text style={title1Style ? title1Style : styles.title1Style } >{title1}</Text>
                <Text numberOfLines={3} style={title2Style ? title2Style : styles.title2Style } >{title2}</Text>
                <Text numberOfLines={3} style={title3Style ? title3Style : styles.title3Style } >{title3}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
    // imageStyle:{
    //     marginTop:0, 
    //     height:24, 
    //     width:24
    // },

    title1Style:{ 
        fontSize:fontSize.small,
        color:colors.darkGrey, 
    }, 
    title2Style:{ 
        fontSize:fontSize.xLarge, 
        fontWeight:'bold',
        color:colors.darkGrey,
    }, 
    title3Style:{ 
        fontSize:fontSize.xsmall, 
        // fontWeight:'bold',
        color:colors.darkGrey,
    }, 
})