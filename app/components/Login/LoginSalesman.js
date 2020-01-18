import React, { Component } from 'react'
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info';
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { loginStyle } from './LoginStyle';
import { commonStyle} from '../Common/CommonStyle';
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

export class LoginSalesman extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            spinner: false,
            fcmToken:''
        };
    }
    
    componentWillMount() {
        SplashScreen.hide();
    }

    componentDidMount() {
        SplashScreen.hide();
        this.listener = EventRegister.addEventListener('usernameData', (data) => {
            console.log("username is",data); 
            this.setState({ username: data });
        });
        this.listener = EventRegister.addEventListener('passwordData', (data) => {
            console.log("password is",data); 
            this.setState({ password: data });
        })
        
        this.checkFCMPermission();
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }


   

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
            if (1 === nextProps.isLoggedIn || 2 === nextProps.isLoggedIn) {
                this.setState({ spinner: false });
            }
            if (1 === nextProps.isLoggedIn && nextProps.salesmanData) {

                this.storeData();
                this.storeSalesmanData(nextProps.salesmanData);
                onNavigateToOrdersTab();
            } 
            else if(2 === nextProps.isLoggedIn) {
                alert("Staff login failed!");
                console.log("loginErrorMessage : ", nextProps.loginErrorMessage);
            }
        }
    }

    onClickSubmit = () => {
        
        if(this.state.username.length == 0) {
            alert("Username is empty!");
            return;
        }
        if(this.state.password.length == 0) {
            alert("Password is empty!");
            return;
        }

        this.setState({ spinner: true });
        console.log("username", this.state.username); 
        console.log("password", this.state.password); 
         let loginRequest={"UserName":this.state.username,"Password":this.state.password,"FcmToken":this.state.fcmToken,"DeviceId":'123'};
        this.props.staffLoginRequest({
            loginDetails:JSON.stringify(loginRequest),
        });
    };

    storeData = async () => {
        try {
          await AsyncStorage.setItem('isStaffLoggedIn', 'true');
        } catch (e) {
          // saving error
          console.log("error is ", e);
        }
    }
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

    storeSalesmanData = async (salesmanData) => {
        try {
          await AsyncStorage.setItem('SalesmanData', JSON.stringify(salesmanData));
          
        } catch (e) {
          // saving error
          console.log("error is ", e);
        }
    }

    onOrderPress=()=>{
        onNavigateToOrdersTab();             
    }

    onCustomPress=()=>{
             
    }

    render() {
        console.disableYellowBox = true;
        return (
            <ImageBackground style={ loginStyle.imageBackground } resizeMode='cover' source={images.login_screen}>
                <Spinner visible={this.state.spinner} textContent={"Processing..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <LoginButton keyboardType={"visible-password"} onPress={() => {}} textInputContainerStyle={loginStyle.loginInputContainerStyle} textInputPlaceholder="Username"  />
                <LoginButton onPress={() => { } } keyboardType={"default"} isPassword={true} textInputContainerStyle={loginStyle.passwordInputContainerStyle} textInputPlaceholder="Password"  />
                <TouchableOpacity activeOpacity={0.7} style={loginStyle.submitButtonStyle} 
                    onPress={this.onClickSubmit} >
                    <Text style={loginStyle.submitButtonTextStyle}>Login</Text>
                </TouchableOpacity>
                {/* <View style={loginStyle.buttonsContainer}>
                    <CustomIconInfoButton onPress={this.onCustomPress} activeOpacity={0.7} buttonStyle={loginStyle.iconButtonStyle} imageStyle={loginStyle.imageStyle} iconPath={images.list} title1Style={loginStyle.title1Style}  title1="Order" />
                    <CustomIconInfoButton onPress={this.onOrderPress} activeOpacity={0.7} buttonStyle={loginStyle.iconButtonStyle} imageStyle={loginStyle.imageStyle} iconPath={images.sales} title1Style={loginStyle.title1Style}  title1="Sales" />
                </View> */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn,
    loginErrorMessage: state.login.loginErrorMessage,
    salesmanData:state.login.salesmanData,
  });
  
const mapDispatchToProps = {
    ...LoginAction
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginSalesman)
