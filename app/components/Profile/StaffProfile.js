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
import { onNavigation, addCommonListeners, onNavigateToLoginSalesman } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class StaffProfile extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }

    // 

    static get options() {
        return {
          topBar: {
            title: {
              text: '',
            },
            // Configure your button style here
            leftButtons: [
              {
                id: "SalesSideDrawer",
                icon:images.menu_white,
              }
            ],
          }
        };
    }

    navigationButtonPressed({ buttonId }) {
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

    componentDidMount() {
        addCommonListeners(this);
        
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            logged:'',
            loggedSalesman:'',
            profileData: { title:'Phone 4U', orders:'34', address:'Mobile phone and accessories, M.G Road, Near Padma theatre, Ernakulam', imageSource:"https://media.glassdoor.com/sqll/517973/the-mobilestore-squarelogo-1425968302175.png", 
                              name: 'Mohammed Haneef', role:'', phoneNumbers:'0484 23 41 222, 09846 223344', email:'support@phone4u.com', website:'www.phone4u.com'},  
        };
        Navigation.events().bindComponent(this);
        this.fetchSalesmanData();
    }

    fetchSalesmanData = async () => {
        try {
            // console.log("fetchStaffData");
          const value = await AsyncStorage.getItem('SalesmanData');
          if (value !== null) {
              this.setState({ loggedSalesman: JSON.parse(value) });
            }
            // console.log("Profile SalesmanData is",this.state.loggedSalesman); 
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    onCustomPress=()=>{

    }

    onLogoutPress=()=>{
        try {
            AsyncStorage.setItem('isStaffLoggedIn', 'false');
            AsyncStorage.setItem('SalesmanData', null);
          } catch (e) {
            // saving error
            console.log("error is ", e);
          }
          onNavigateToLoginSalesman();
    }

    navigateToScreen=(screenName)=>{
        onNavigation( screenName, "", this.props.componentId, this.prop,        )
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <View style={profileStyle.headingTextContainer}>
                    <Text style={profileStyle.headingTextStyle}>Profile </Text>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onLogoutPress} title1Style={profileStyle.logoutButtonTextStyle} buttonStyle={profileStyle.logoutButtonStyle} title1="LOGOUT" />
                </View>
                <ScrollView style={commonStyle.scrollContainer} >
                    <ProfileItem onPress={this.onCustomPress} title={this.state.loggedSalesman.Name} orders={this.state.profileData.orders} phoneNumbers={this.state.loggedSalesman.PhoneNumber} email={this.state.loggedSalesman.EmailId} website={this.state.profileData.website} address={this.state.loggedSalesman.Address} name={this.state.loggedSalesman.Name} role={this.state.profileData.role} imageSource={this.state.loggedSalesman.IDProofImage} />
                </ScrollView>                 
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)
