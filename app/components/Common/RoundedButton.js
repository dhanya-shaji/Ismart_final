import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';

export default class Button extends Component {
    constructor(props){
        super(props);
        
    }
    handlePress=()=>{
        this.props.onPress();
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={[
                        styles.mainContainer,this.props.containerStyle]
                    }>
                    <Text style={
                        styles.textStyle
                    }> {this.props.title} </Text>
                    </View>
                
                </TouchableOpacity>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:colors.blue,
        borderRadius:23,
        
    },
    textStyle:{
        color:colors.white,
        margin:10,
        fontSize:fontSize.xxLarge,
        fontWeight:'bold'

    }
})

