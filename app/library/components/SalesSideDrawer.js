import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners'

// import commonStyles from '../../resources/styles';
 import {commonStyle} from '../../components/Common/CommonStyle';
import { CustomIconInfoButton, } from '../../components/Common/index';
import { onNavigation, HideSideDrawer, onNavigateToLoginSalesman} from '../../config/navigations';

import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const profile = "profile";
const orders = "orders";
const logout = "logout";

 class SaleSideDrawer extends Component {

    static propTypes = {
        componentId: PropTypes.string,
        // prop: PropTypes,
    }

    constructor(props) {
        super(props);
        this.state = {
            activeComponentId: '',
            visible: false
        };
    }

    onCancel() {
        console.log("CANCEL")
        this.setState({visible:false});
      }
      onOpen() {
        console.log("OPEN")
        this.setState({visible:true});
      }

    onCustomPress=()=>{

    }

    navigateToScreen=(screenName)=>{
        onNavigation( screenName, "", this.props.componentId, this.prop,        )
    }

    onClick = (screenPrefix) => {

        HideSideDrawer(this.props.componentId);
        if (profile === screenPrefix) {
            EventRegister.emit('gotoProfile', 'it works!!!');
            // this.navigateToScreen("navigation.ismart.Profile");
        }
        else if(orders === screenPrefix) {
            EventRegister.emit('gotoOrders', 'it works!!!');
            // this.navigateToScreen("navigation.ismart.UpcomingOrders");
        }
        else if(logout === screenPrefix) {
            try {
                AsyncStorage.setItem('isStaffLoggedIn', 'false');
                AsyncStorage.setItem('SalesmanData', null);
              } catch (e) {
                // saving error
                console.log("error is ", e);
              }
            onNavigateToLoginSalesman();
        }
    }

    render() {
        return (
            <View style = { styles.container }>
                {/* <View > */}
                {/* <TouchableOpacity activeOpacity={0.7} style={styles.iconContainer} onPress={() => { this.onClick(profile) }}>
                    <Image source={images.profile_white} style={styles.drawerImage} />
                    <Text style={styles.iconText}> Profile </Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity activeOpacity={0.7} style={styles.iconContainer} onPress={() => { this.onClick(orders) }}>
                    <Image source={images.list_white} style={styles.drawerImage} />
                    <Text style={styles.iconText}> Orders </Text>
                </TouchableOpacity> */}
                <TouchableOpacity activeOpacity={0.7} style={styles.iconContainer} onPress={() => { this.onClick(logout) }}>
                    <Image source={images.logout} style={styles.drawerImage} />
                    <Text style={styles.iconText}> Logout </Text>
                </TouchableOpacity>
                {/* </View> */}
                {/* <Text> SideDrawer </Text> */}
            </View>
        );
    }
}
export default SaleSideDrawer;

const styles = StyleSheet.create({

    // container: {
    //     marginTop: 55,
    //     backgroundColor: colors.lightRed,
    //     width: deviceWidth * 0.8,
    //     height: deviceHeight * 0.8
    // },
    container:{
        backgroundColor:colors.lightRed,
        flex: 1,
        width:200,
        marginTop:57,
        height:deviceHeight-20
    },
    iconContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        height:60,
        // borderWidth:1,
        // borderColor:colors.white,
        // paddingTop:10,
        // paddingLeft:5,
    },
    iconText:{
        color:colors.white,
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        marginLeft:8,
    },
    drawerImage:{
        height:24,
        width:24,
        marginLeft:8,
    },

})

