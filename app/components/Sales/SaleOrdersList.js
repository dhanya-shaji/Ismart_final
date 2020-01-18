import React, { Component } from 'react'
import { ImageBackground, Image, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";
import SplashScreen from 'react-native-splash-screen'
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { saleOrdersListStyle } from './SaleOrdersListStyle';
import { commonStyle} from '../Common/CommonStyle';
import UpcomingSaleOrderItem from './UpcomingSaleOrderItem';
import PreviousSaleOrderItem from './PreviousSaleOrderItem';
import CustomerNotificationItem from './CustomerNotificationItem';
import { CustomIconInfoButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, } from '../../config/navigations';

//Action
import { SaleAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const orderText = "Order No:";
const acceptText = "Accept";
const rejectText = "Reject";
const customerId = "Customer Id: "
// import BackgroundJob from 'react-native-background-job';
// const backgroundJob = {
//     jobKey: "myJob",
//     job: () => console.log("Running in background")
//    };
    
//    BackgroundJob.register(backgroundJob);


export class SaleOrdersList extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner: false,
            loggedSalesman: '',
            acceptItem: '',
            timer:null,
            upcomingOrdersData: [],
            previousOrdersData:[],

             notificationsData: [],

        };
        Navigation.events().bindComponent(this);
        this.fetchSalesmanData();
        // console.log("Profile 2 SalesmanData is",this.state.loggedSalesman); 
        // this.props.getAllOrderByStaff({
        //     staffId: this.state.loggedSalesman.StaffId,
        // });
    }

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


    componentWillMount() {
        SplashScreen.hide();
        // this.getData();
    }

    

    fetchSalesmanData = async () => {
        try {
            // console.log("fetchStaffData");
          const value = await AsyncStorage.getItem('SalesmanData');
          console.log("value is", value); 
          if (value !== null) {
              this.setState({ loggedSalesman: JSON.parse(value) });
            }
            // console.log("Profile 1 SalesmanData is",this.state.loggedSalesman); 
            // EventRegister.emit('updateSalesmanData', this.state.loggedSalesman);  
            
            this.props.getAllOrderByStaff({
                staffId: this.state.loggedSalesman.StaffId,
            });
            this.props.getAllAcceptedOrderByStaff({
                staffId: this.state.loggedSalesman.StaffId,
            });
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    componentDidMount() {
        let timer = setInterval(this.tick, 60000);
    
        this.setState({ spinner: true,timer });
        
    }

    componentWillUnmount() {
        // this.clearInterval(this.state.timer);

    }

    componentWillReceiveProps(nextProps) {
        // alert("nextprops is");
        console.log("next props isOrderByStaffIdDataLoaded is", nextProps.isOrderByStaffIdDataLoaded);
        if (nextProps.isOrderByStaffIdDataLoaded !== this.props.isOrderByStaffIdDataLoaded) {
            if (1 === nextProps.isOrderByStaffIdDataLoaded || 2 === nextProps.isOrderByStaffIdDataLoaded) {
                this.setState({ spinner: false });
            }
        }
        if (nextProps.upcomingOrdersData !== this.props.upcomingOrdersData ) {
            if(nextProps.upcomingOrdersData && nextProps.upcomingOrdersData.length > 0) {
                console.log("upcoming orders", nextProps.upcomingOrdersData);
                this.setState({ upcomingOrdersData: nextProps.upcomingOrdersData });
                console.log("upcomingOrdersData is", this.state.upcomingOrdersData);
            }
        }               

        if (nextProps.isAcceptedOrderByStaffIdDataLoaded !== this.props.isAcceptedOrderByStaffIdDataLoaded) {
            if (1 === nextProps.isAcceptedOrderByStaffIdDataLoaded || 2 === nextProps.isAcceptedOrderByStaffIdDataLoaded) {
                this.setState({ spinner: false });
            }
        }
        if (nextProps.previousOrdersData !== this.props.previousOrdersData ) {
            if(nextProps.previousOrdersData && nextProps.previousOrdersData.length > 0) {
                console.log("previous orders", nextProps.previousOrdersData);
                this.setState({ previousOrdersData: nextProps.previousOrdersData });
                console.log("previousOrdersData is", this.state.previousOrdersData);
            }
        }  

        if (nextProps.isOrderAcceptStatus !== this.props.isOrderAcceptStatus) {
            if (1 === nextProps.isOrderAcceptStatus || 2 === nextProps.isOrderAcceptStatus) {
                this.setState({ spinner: false });
                this.fetchSalesmanData();
            }
            if(1 === nextProps.isOrderAcceptStatus) {
                alert("Success!");
                console.log("acceptItem is ", this.state.acceptItem);
                if(this.state.acceptItem ) {
                    onNavigation( "navigation.ismart.SaleOrderDetail", "Order List", this.props.componentId, {orderId: this.state.acceptItem.OrderId},);     
                }
            }
        }        
    }


  tick =() => {
    this.props.getAllOrderByStaff({
        staffId: this.state.loggedSalesman.StaffId,
    });
    console.log("order triggred",this.props.upcomingOrdersData);
  }
    onOrderDetailPress=(item)=>{
        console.log("orderId is ", item.OrderId); 
        onNavigation( "navigation.ismart.SaleOrderDetail", "Order List", this.props.componentId, {orderId: item.OrderId},);         
    }

    onCustomPress=()=>{ 
        
    }

    onStatusPress=(item,status)=>{

        console.log("status is ", status);
        if("1" === status) {
            this.setState({ acceptItem: item });
        } else {
            this.setState({ acceptItem: '' });
        }
        console.log("acceptItem orderId is ", item.OrderId);

        this.setState({ spinner: true });

        this.props.orderAcceptStatus({
            status: status,
            staffId: this.state.loggedSalesman.StaffId,
            orderId: item.OrderId,
        });                  
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        console.disableYellowBox = true;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                {/* <SearchBar placeholder="Search Products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}

                <ScrollView>
                    <View style={saleOrdersListStyle.headingTextContainer}>
                        <Text style={saleOrdersListStyle.headingTextStyle}>Upcoming Orders</Text>
                    </View>
                    <ScrollView style={saleOrdersListStyle.scrollContainer} >
                        {this.props.upcomingOrdersData && this.props.upcomingOrdersData.length > 0 ?  this.props.upcomingOrdersData.map((item,index) => (
                        <UpcomingSaleOrderItem key={index} onPressAccept={() => { this.setState({ acceptItem: item }); this.onStatusPress(item,"1");}} onPressReject={() => {this.onStatusPress(item,"2");}} gotoOrderDetail={() => {this.onOrderDetailPress(item);}} IDTitle={orderText} IDInfo={item.OrderRefNo} time={item.OrderDates} button1Text={acceptText} button2Text={rejectText} />
                        )):null}
                    </ScrollView>

                    <View style={saleOrdersListStyle.headingTextContainer}>
                        <Text style={saleOrdersListStyle.headingTextStyle}>Previous Orders</Text>
                    </View>
                    <ScrollView style={saleOrdersListStyle.scrollContainer} >
                        {this.state.previousOrdersData && this.state.previousOrdersData.length > 0 ?  this.state.previousOrdersData.map((item,index) => (
                        <PreviousSaleOrderItem key={index} onPress={this.onCustomPress} gotoOrderDetail={() => {this.onOrderDetailPress(item);}} status={item.status} address={item.address} IDTitle={orderText} IDInfo={item.OrderRefNo} time={item.OrderDates} button1Text={item.TotalItem} button2Text={item.TotalPrice} />
                        )):null}
                    </ScrollView>
                    
                    <View style={saleOrdersListStyle.headingTextContainer}>
                        {/* <Text style={saleOrdersListStyle.headingTextStyle}>Notifications</Text> */}
                        <Text style={saleOrdersListStyle.headingTextStyle}></Text>
                    </View>
                    {/* <ScrollView style={saleOrdersListStyle.scrollContainer} >
                        {this.state.notificationsData && this.state.notificationsData.length > 0 ?  this.state.notificationsData.map((item,index) => (
                        <CustomerNotificationItem key={index} onPress={this.onCustomPress} IDTitle={item.IDTitle} IDInfo={item.IDInfo} description={item.description} time={item.time} />
                        )):null}
                    </ScrollView> */}

                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    upcomingOrdersData: state.sale.orderByStaffIdData,
    isOrderByStaffIdDataLoaded: state.sale.isOrderByStaffIdDataLoaded,
    previousOrdersData: state.sale.acceptedOrderByStaffIdData,
    isAcceptedOrderByStaffIdDataLoaded: state.sale.isAcceptedOrderByStaffIdDataLoaded,
    isOrderAcceptStatus: state.sale.isOrderAcceptStatus,
})

const mapDispatchToProps = {
    ...SaleAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleOrdersList)

           // upcomingOrders: [{ IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"4 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Order No:", IDInfo:"CWCLT2017", time:"6 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", time:"7 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", time:"10 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"13 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"15 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"17 minutes ago", button1Text:"Accept", button2Text:"Reject" },
            //                 ],
            // previousOrders: [{ IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"4 minutes ago", button1Text:"33 Items", button2Text:"21,050.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"6 minutes ago", button1Text:"5 Items", button2Text:"3,900.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"7 minutes ago", button1Text:"3 Items", button2Text:"1,500.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"10 minutes ago", button1Text:"8 Items", button2Text:"4,500.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"13 minutes ago", button1Text:"2 Items", button2Text:"5,500.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"15 minutes ago", button1Text:"9 Items", button2Text:"6,500.00" },
            //                 { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"17 minutes ago", button1Text:"7 Items", button2Text:"7,500.00" },
            //                 ],
