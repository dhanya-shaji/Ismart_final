import React, { Component } from 'react'
import { Text, Image, TextInput, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class PlusMinusButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '1',
        };
    }

    handleMinus=()=>{
        // this.props.onPress();
        
    }

    handlePlus=()=>{
        // this.props.onPress();
        

    }

    render() {
        const {activeOpacity,mainContainer,minusButtonStyle,plusButtonStyle,textInputStyle,textInputPlaceholder,imageStyle,iconPath,}=this.props;
        return (           
            <View  style={mainContainer ? mainContainer : styles.mainContainer}>
                
                <TouchableOpacity onPress={this.handleMinus} activeOpacity={activeOpacity ? activeOpacity : 0.5} style={minusButtonStyle ? minusButtonStyle : styles.minusButtonStyle}>
                    <Image style={imageStyle ? imageStyle : styles.imageStyle} source={images.subtract}/>
                </TouchableOpacity>

                <TextInput style={textInputStyle ? textInputStyle : styles.textInputStyle} placeholder={textInputPlaceholder} placeholderTextColor = {colors.darkGrey}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />

                <TouchableOpacity onPress={this.handlePlus} activeOpacity={activeOpacity ? activeOpacity : 0.5} style={plusButtonStyle ? plusButtonStyle : styles.plusButtonStyle}>
                    <Image style={imageStyle ? imageStyle : styles.imageStyle} source={images.add} />
                </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:36,
        width:100,
        marginLeft:20,
        // borderColor:colors.black,
        // borderWidth:1,
        // backgroundColor:'white',
    },
    minusButtonStyle:{
        width:"33%", 
        height:"100%", 
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.searchBarGrey,
    },
    plusButtonStyle:{
        width:"33%", 
        height:"100%", 
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.searchBarGrey,
    },
    imageStyle:{
        width:"50%",
        height:"50%",
    },
    textInputStyle:{
        height:"100%", 
        width:"33%",
        backgroundColor:colors.white,
        // borderWidth:1,
        // borderColor:colors.darkGrey,
        fontSize:fontSize.small,
        color:colors.black,
    },
    
})