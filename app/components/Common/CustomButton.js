import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class CustomButton extends Component {

    constructor(props){
        super(props);
    }

    handlePress=()=>{
        this.props.onPress();
    }

    render() {
        return (           
            <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.handlePress} style={this.props.buttonStyle}><Text style={this.props.buttonTextStyle} >{this.props.buttonText}</Text></TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        marginTop:10, 
        borderRadius:8, 
        backgroundColor:colors.white, 
        height:80,
        width:"90%" 
    },
    
})