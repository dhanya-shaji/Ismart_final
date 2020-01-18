import React, { Component } from 'react'
import { ImageBackground, RefreshControl, Image, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';

import { ordersListStyle } from './OrdersListStyle';
import { commonStyle} from '../Common/CommonStyle';
import OrderListItem from './OrderListItem';
import UpcomingOrderItem from './UpcomingOrderItem';
import { CustomIconInfoButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners } from '../../config/navigations';

//Action
import { OrderAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const orderText = "Order No:";
const acceptText = "Accept";
const rejectText = "Reject";

export class UpcomingOrders extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }

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

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner: false,
            refreshing: false,
            loggedCustomer:'',
            upcomingOrdersData: [],
        };
        Navigation.events().bindComponent(this);
        this.setState({ spinner: true });
        this.fetchCustomerData();
        
    }

    componentDidMount() {
        addCommonListeners(this); 
        this.setState({ spinner: true });
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOrderByCustomerCodeDataLoaded !== this.props.isOrderByCustomerCodeDataLoaded) {
            if (1 === nextProps.isOrderByCustomerCodeDataLoaded || 2 === nextProps.isOrderByCustomerCodeDataLoaded) {
                this.setState({ spinner: false });
                this.setState({refreshing: false});
            }
        }        

        if (nextProps.orderByCustomerCodeData !== this.props.orderByCustomerCodeData ) {
            console.log("orderByCustomerCodeData is", nextProps.orderByCustomerCodeData);
            // if(nextProps.orderByIdData && nextProps.orderByIdData.OrderItemList && nextProps.orderByIdData.OrderItemList.length > 0) {
            //     this.updateTableData(nextProps.orderByIdData);
            // }
        }
    }

    onCustomPress=()=>{

    }
    
    fetchCustomerData = async () => {
        try {     
          const value = await AsyncStorage.getItem('CustomerData');
          console.log("fetchCustomerData value is",value); 
          if (value !== null) {
              this.setState({ loggedCustomer: JSON.parse(value) });
            }
            console.log("CustomerData is",this.state.loggedCustomer.CustomerCode); 
            this.props.getAllOrderByCustomerCode({
                customerCode: this.state.loggedCustomer.CustomerCode,
            });
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }
    
    onOrderPress=(orderId)=>{
        onNavigation(
            "navigation.ismart.OrderDetail",
            // "Order Detail",
            "",
            this.props.componentId,
            // this.prop,
            {orderId: orderId},
        )                
    }

    _onRefresh = () => {
      this.setState({refreshing: true});
      this.props.getAllOrderByCustomerCode({
        customerCode: this.state.loggedCustomer.CustomerCode,
      });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search Products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />

                <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/> } >
                    <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                    <View style={ordersListStyle.headingTextContainer}>
                        <Text style={[ordersListStyle.headingTextStyle,{marginTop:0}]}>Upcoming Orders</Text>
                        {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} imageStyle={ordersListStyle.newButtonImageStyle} title1Style={ordersListStyle.newButtonTextStyle} buttonStyle={ordersListStyle.newButtonStyle} iconPath={images.new} title1="NEW" /> */}
                    </View>

                    <ScrollView style={ordersListStyle.scrollContainer} >
                        {this.props.orderByCustomerCodeData && this.props.orderByCustomerCodeData.length > 0 ?  this.props.orderByCustomerCodeData.map((item,index) => (
                        <UpcomingOrderItem key={index} gotoOrderDetail={ () => {this.onOrderPress(item.OrderId)} } onPress={() => { } } IDTitle={orderText} IDInfo={item.OrderRefNo} time={item.OrderDates} button1Text={acceptText} button2Text={rejectText} />
                        )):<View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>List is empty!</Text></View>}
                    </ScrollView>

                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    upcomingOrdersData: state.order.ordersData,
    isOrdersLoaded: state.order.isOrdersLoaded,
    orderByCustomerCodeData: state.order.orderByCustomerCodeData,
    isOrderByCustomerCodeDataLoaded: state.order.isOrderByCustomerCodeDataLoaded,
})

const mapDispatchToProps = {
    ...OrderAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders)

            