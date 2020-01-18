import React, { Component } from 'react'
import { Text, Image, TextInput, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';
import { EventRegister } from 'react-native-event-listeners';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class LoginButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            text:'',
        };
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const {activeOpacity,showButton,isPassword,isNumber, keyboardType, textInputContainerStyle,loginButtonStyle,textInputPlaceholder,imageStyle,iconPath,}=this.props;
        return (           
            <TouchableOpacity  activeOpacity={1} style={textInputContainerStyle ? textInputContainerStyle : styles.textInputContainerStyle}>
                <TextInput autoCapitalize="none" autoCorrect={false} style={styles.textInputStyle}  secureTextEntry={ isPassword ? isPassword : false}
                placeholder={textInputPlaceholder} placeholderTextColor = {colors.mediumGrey}
                onChangeText={(text) => { this.setState({ text: text }); EventRegister.emit('validationData', text); isPassword ? EventRegister.emit('passwordData', text) : EventRegister.emit('usernameData', text);  } }
                value={this.state.text}
                />
                {showButton === true ? <TouchableOpacity onPress={this.handlePress} activeOpacity={0.7} style={loginButtonStyle ? loginButtonStyle : styles.loginButtonStyle}>
                    <Image style={imageStyle ? imageStyle : styles.imageStyle} source={iconPath ? iconPath : images.right_arrow}/>
                </TouchableOpacity> : null}
            </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({

    textInputContainerStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:40,
        width:200,
        marginTop:200,
        backgroundColor:'white',
        borderRadius:20,
        borderColor:colors.mediumGrey,
        borderWidth:1,
    },
    textInputStyle:{
        paddingLeft:10,  
        height:"100%", 
        width:"78%"
    },
    loginButtonStyle:{
        width:"20%", 
        height:"98%", 
        marginRight:3, 
        borderRadius:20, 
        alignItems:"center",
        justifyContent:"center",
    },
    imageStyle:{
        width:32,
        height:32,
    }
    
})