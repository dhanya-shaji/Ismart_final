import React, { Component } from 'react'
import { View, ImageBackground, Dimensions, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loginStyle } from './LoginStyle';
import LoginButton from './LoginButton';
import { RoundedButton } from '../Common/index';
import { onNavigateToLogin, onNavigateToDashBoard } from '../../config/navigations';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const {height,width} = Dimensions.get('window');

export class LoginOTP extends Component {
  
  constructor(props) {
    super(props);
    this.state = {otpEntered:'' , };
    console.log("LoginOTP otpNumber is", this.props.otpNumber);
    console.log("LoginOTP customer data is", this.props.customerData);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('validationData', (data) => {
        console.log("otpEntered is",data); 
        this.setState({ otpEntered: data });
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  onLoginOTPPress=()=>{
    if(this.state.otpEntered === this.props.otpNumber) {
      // alert("success");
      this.storeData();
      this.storeCustomerData();
      
      onNavigateToDashBoard();
    }
    else {
      alert("OTP validation failed!");
    }            
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('isCustomerLoggedIn', 'true');
      // await AsyncStorage.setItem('CustomerData', JSON.stringify(this.props.customerData));
      // await AsyncStorage.setItem('CustomerData', this.props.customerData);
      // AsyncStorage.setItem('CCUserInfo', JSON.stringify(responseJson.data.user_details));
    } catch (e) {
      // saving error
      console.log("error is ", e);
    }
  }

  storeCustomerData = async () => {
    try {
      await AsyncStorage.setItem('CustomerData', JSON.stringify(this.props.customerData));
      
    } catch (e) {
      // saving error
      console.log("error is ", e);
    }
  }

  fetchCustomerData = async () => {
    try {
      const value = await AsyncStorage.getItem('CustomerData');
      console.log("value is",value); 
      // if(value !== null) {
        // value previously stored
        // if('true' === value) {
        //     onNavigateToDashBoard();
        // }
      // }
    } catch(e) {
      // error reading value
      console.log("error is ", e);
    }
  }

  render() {
      return (  
        <ImageBackground style={ loginStyle.imageBackground } resizeMode='cover' source={images.loginOTP_screen}>
          <LoginButton keyboardType={"number-pad"} showButton={true} onPress={this.onLoginOTPPress} textInputPlaceholder="Enter OTP"  />
        </ImageBackground>
      );
  }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOTP)