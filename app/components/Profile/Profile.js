import React, { Component } from 'react'
import { ImageBackground, Image, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { profileStyle } from './ProfileStyle';
import { commonStyle} from '../Common/CommonStyle';
import ProfileItem from './ProfileItem';
import { CustomIconInfoButton, CustomButton } from '../Common/index';

import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigateToLogin } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

// Action
import { OrderAction } from '../../redux/actions';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class Profile extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }

    // 

    static get options() {
        return {
          topBar: {
            title: {
              text: 'Dashboard',
            },
            // Configure your button style here
            leftButtons: [
              {
                id: "SideDrawer",
                icon:images.menu_white,
              }
            ],
          }
        };
    }

    navigationButtonPressed({ buttonId }) {
      if(buttonId==='SideDrawer'){
        try {
          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              },
            },
          });  
        } catch (error) {
          //
        }
    }
    }


    componentDidMount() {
        addCommonListeners(this);
        
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isOrderByCustomerCodeDataLoaded !== this.props.isOrderByCustomerCodeDataLoaded) {
          if (1 === nextProps.isOrderByCustomerCodeDataLoaded || 2 === nextProps.isOrderByCustomerCodeDataLoaded) {
              // this.setState({ spinner: false });
          }
      }        

      if (nextProps.orderByCustomerCodeData !== this.props.orderByCustomerCodeData ) {
          console.log("orderByCustomerCodeData is", nextProps.orderByCustomerCodeData);
          // if(nextProps.orderByIdData && nextProps.orderByIdData.OrderItemList && nextProps.orderByIdData.OrderItemList.length > 0) {
          //     this.updateTableData(nextProps.orderByIdData);
          // }
      }
    }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loggedCustomer:'',
            profileData: { title:'Phone 4U', orders:'34', address:'Mobile phone and accessories, M.G Road, Near Padma theatre, Ernakulam', imageSource:"https://media.glassdoor.com/sqll/517973/the-mobilestore-squarelogo-1425968302175.png", 
                              name: 'Mohammed Haneef', role:'Partner', phoneNumbers:'0484 23 41 222, 09846 223344', email:'support@phone4u.com', website:'www.phone4u.com'},  
        };
        Navigation.events().bindComponent(this);
        this.fetchCustomerData();
    }

    fetchCustomerData = async () => {
        try {
            // console.log("fetchCustomerData");
          const value = await AsyncStorage.getItem('CustomerData');
          if (value !== null) {
              this.setState({ loggedCustomer: JSON.parse(value) });
            }
            console.log("Profile CustomerData is",this.state.loggedCustomer); 
            this.props.getAllOrderByCustomerCode({
              customerCode: this.state.loggedCustomer.CustomerCode,
            });
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    onCustomPress=()=>{

    }

    onLogoutPress=()=>{
        // try {
        //     AsyncStorage.setItem('isCustomerLoggedIn', 'false');
        //     AsyncStorage.setItem('CustomerData', null);
        //   } catch (e) {
        //     // saving error
        //     console.log("error is ", e);
        //   }
        // onNavigateToLogin();
        alert("Coming Soon..");
    }

    navigateToScreen=(screenName)=>{
        onNavigation( screenName, "", this.props.componentId, this.prop,        )
    }

    

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <View style={profileStyle.headingTextContainer}>
                    <Text style={profileStyle.headingTextStyle}>Profile </Text>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onLogoutPress} title1Style={profileStyle.logoutButtonTextStyle} buttonStyle={profileStyle.logoutButtonStyle} title1="Service" />
                </View>
                <ScrollView style={commonStyle.scrollContainer} >
                    <ProfileItem onPress={this.onCustomPress} title={this.state.loggedCustomer.ShopName} orders={this.props.orderByCustomerCodeData ? this.props.orderByCustomerCodeData.length : 0} phoneNumbers={this.state.loggedCustomer.PhoneNumber} email={this.state.loggedCustomer.EmailId} website={this.state.profileData.website} address={this.state.loggedCustomer.Address} name={this.state.loggedCustomer.CustomerName} role={this.state.profileData.role} imageSource={this.state.loggedCustomer.CustomerImge} customerData={this.props.isCustomerActive}  />
                </ScrollView>                 
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
  orderByCustomerCodeData: state.order.orderByCustomerCodeData,
  isOrderByCustomerCodeDataLoaded: state.order.isOrderByCustomerCodeDataLoaded,    
  isCustomerActive:state.home.isCustomerActive
})

const mapDispatchToProps = {
  ...OrderAction,    
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
