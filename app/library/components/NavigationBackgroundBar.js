import React, {Component} from 'react';
import {View, StyleSheet, Dimensions,Platform, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

// import commonStyles from '../../resources/styles';
 import {commonStyle} from '../../components/Common/CommonStyle';
import { CustomIconInfoButton, } from '../../components/Common/index';
import { onNavigation, } from '../../config/navigations';

import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

 class NavigationBackgroundBar extends Component {

    static propTypes = {
        prop: PropTypes
    }

    constructor(props) {
        super(props);
    }

    onCustomPress=()=>{

    }

    render() {
        return (
            <View style={styles.topNavigationBarStyle}>
                
            </View>
        );
    }
}
export default NavigationBackgroundBar;

const styles = StyleSheet.create({

    topNavigationBarStyle:{
        backgroundColor: colors.navigationBarBlue, 
        width:"100%", 
        height:64, 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems: "center",
        display:Platform.OS==='ios'?"none":'flex'
    },

})

