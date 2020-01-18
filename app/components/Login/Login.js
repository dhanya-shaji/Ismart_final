import React, { Component } from 'react'
import { View, ImageBackground, Alert, Dimensions,Platform } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { loginStyle } from './LoginStyle';
import { commonStyle } from '../Common/CommonStyle';
import LoginButton from './LoginButton';
import { RoundedButton, CustomIconInfoButton } from '../Common/index';
import { onNavigation, onNavigateToLogin, onNavigateToLoginOTP, onNavigateToOrdersTab, onNavigateToDashBoard } from '../../config/navigations';

//Action
import { LoginAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';
//Firebase 
import firebase, { RemoteMessage } from 'react-native-firebase';
import type, { Notification, NotificationOpen } from 'react-native-firebase';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class Login extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    constructor(props) {
        super(props);
        this.state = {
            deviceId: '',
            shopId: '',
            spinner: false,
            fcmToken: '',
            // otpData:'',
        };

    }

    componentWillMount() {
        SplashScreen.hide();
        this.getData();
    }

    componentDidMount() {
        SplashScreen.hide();
        this.listener = EventRegister.addEventListener('validationData', (data) => {
            console.log("getShopId is", data);
            this.setState({ shopId: data });
        })
        this.getdeviceId();
        this.checkFCMPermission();

    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('isCustomerLoggedIn');
            console.log("value is", value);
            if (value !== null) {
                // value previously stored
                if ('true' === value) {
                    onNavigateToDashBoard();
                }
            }
        } catch (e) {
            // error reading value
            console.log("error is ", e);
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.isShopIdLoggedIn !== this.props.isShopIdLoggedIn) {
            if (1 === nextProps.isShopIdLoggedIn || 2 === nextProps.isShopIdLoggedIn) {
                this.setState({ spinner: false });
            }
            if (1 === nextProps.isShopIdLoggedIn) {

                onNavigateToLoginOTP(this.props.componentId, { deviceId: this.state.deviceId, shopId: this.state.shopId, customerData: nextProps.customerData, otpNumber: nextProps.otpNumber });
            }
            else if (2 === nextProps.isShopIdLoggedIn) {
                // alert(nextProps.loginErrorMessage.data);
                alert("Error :" + nextProps.loginErrorMessage);
            }
        }
    }

    //Getting the Unique Id from here
    getdeviceId = () => {

        this.setState({ deviceId: DeviceInfo.getUniqueId() });
        console.log("Device Unique ID", DeviceInfo.getUniqueId());
    };

    onClickSubmit = () => {

        if (this.state.shopId.length == 0) {
            alert("Customer code is empty!");
            return;
        }

        this.setState({ spinner: true });
        console.log("Shop ID", this.state.shopId);
        let loginRequest={"CustomerCode":this.state.shopId,"DeviceId":this.state.deviceId,"FcmToken":this.state.fcmToken};
        this.props.getLoginShopId({
            loginDetails:JSON.stringify(loginRequest),
        });
    };
    async checkFCMPermission(){
        const enabled = await firebase.messaging().hasPermission();
        
            if (enabled) {

               this.getFCMToken();

               this.notificationListener = firebase
      .notifications()
      .onNotification(async notification => {
        // Display your notification
        await firebase.notifications().displayNotification(notification);
      });
            } else {
                try {
                    await firebase.messaging().requestPermission();
                } catch (error) {
                    Alert.alert(
                        "Unable to access the Notification permission. Please enable the Notification Permission from the settings"
                    );
                }
            }
        
    }
    

    async getFCMToken() {

        // let fcmToken = await AsyncStorage.getItem('fcmToken');
        let fcmToken = await firebase.messaging().getToken();
        console.log('fcmToken-before', fcmToken);
        if (fcmToken) {
            this.setState({
                fcmToken
            })
        } else {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {

                this.setState({
                    fcmToken
                })
            }
        }
        

    }

    onLoginPress = () => {
        onNavigateToDashBoard();
    }

    onLoginOTPPress = () => {
        onNavigateToLoginOTP();
    }

    onOrderPress = () => {
        onNavigateToOrdersTab();
    }

    onCustomPress = () => {

    }

    render() {
        console.disableYellowBox = true;
        return (
            <ImageBackground style={loginStyle.imageBackground} resizeMode='cover' source={images.login_screen}>
                <Spinner visible={this.state.spinner} textContent={"Processing..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <LoginButton keyboardType={"number-pad"} showButton={true} onPress={this.onClickSubmit} textInputContainerStyle={[loginStyle.loginInputContainerStyle, { marginTop: deviceHeight / 2 - 150, }]} textInputPlaceholder="Customer code" />
                {/* <View style={loginStyle.buttonsContainer}>
                    <CustomIconInfoButton onPress={this.onCustomPress} activeOpacity={0.7} buttonStyle={loginStyle.iconButtonStyle} imageStyle={loginStyle.imageStyle} iconPath={images.list} title1Style={loginStyle.title1Style}  title1="Order" />
                    <CustomIconInfoButton onPress={this.onOrderPress} activeOpacity={0.7} buttonStyle={loginStyle.iconButtonStyle} imageStyle={loginStyle.imageStyle} iconPath={images.sales} title1Style={loginStyle.title1Style}  title1="Sales" />
                </View> */}
            </ImageBackground>
        )
    } 
}

const mapStateToProps = state => ({
    isShopIdLoggedIn: state.login.isShopIdLoggedIn,
    loginErrorMessage: state.login.loginErrorMessage,
    customerData: state.login.customerData,
    otpNumber: state.login.otpNumber,
    loginErrorMessage: state.login.loginErrorMessage
});

const mapDispatchToProps = {
    ...LoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
