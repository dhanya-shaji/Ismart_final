import React, { Component } from 'react'
import { Text, Image, TextInput, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class TextInputButton extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        const {activeOpacity,textInputContainerStyle,textInputButtonStyle,textInputPlaceholder,imageStyle,iconPath,}=this.props;
        return (           
            <TouchableOpacity  activeOpacity={1} style={textInputContainerStyle ? textInputContainerStyle : styles.textInputContainerStyle}>
                <TextInput style={styles.textInputStyle}
                placeholder={textInputPlaceholder} placeholderTextColor = {colors.mediumGrey}
                //onChangeText={(text) => this.setState({text})}
                //value={this.state.text}
                />
                <TouchableOpacity onPress={this.handlePress} activeOpacity={0.7} style={textInputButtonStyle ? textInputButtonStyle : styles.textInputButtonStyle}>
                    <Image style={imageStyle ? imageStyle : styles.imageStyle} source={iconPath ? iconPath : images.paper_plane}/>
                </TouchableOpacity>
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
    textInputButtonStyle:{
        width:"20%", 
        height:"98%", 
        marginRight:3, 
        borderRadius:20, 
        alignItems:"center",
        justifyContent:"center",
    },
    imageStyle:{
        width:24,
        height:24,
    }
    
})