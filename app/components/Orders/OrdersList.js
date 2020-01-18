import React, { Component } from 'react'
import { ImageBackground, Image, TouchableOpacity, ScrollView, View, RefreshControl, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';

import { ordersListStyle } from './OrdersListStyle';
import { commonStyle} from '../Common/CommonStyle';
import UpcomingOrderItem from './UpcomingOrderItem';
import PreviousOrderItem from './PreviousOrderItem';
import CustomerNotificationItem from './CustomerNotificationItem';
import { CustomIconInfoButton } from '../Common/index';
import { onNavigation, } from '../../config/navigations';

//Action
import { OrderAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class OrdersList extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            upcomingOrdersData: [],
            previousOrdersData:[],

            upcomingOrders: [{ IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"4 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Order No:", IDInfo:"CWCLT2017", time:"6 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", time:"7 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", time:"10 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"13 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"15 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            { IDTitle:"Order No:", IDInfo:"CWCLT2013", time:"17 minutes ago", button1Text:"Accept", button2Text:"Reject" },
                            ],
            previousOrders: [{ IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"4 minutes ago", button1Text:"33 Items", button2Text:"21,050.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"6 minutes ago", button1Text:"5 Items", button2Text:"3,900.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"7 minutes ago", button1Text:"3 Items", button2Text:"1,500.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"10 minutes ago", button1Text:"8 Items", button2Text:"4,500.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"13 minutes ago", button1Text:"2 Items", button2Text:"5,500.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0030", status:'In Transit', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"15 minutes ago", button1Text:"9 Items", button2Text:"6,500.00" },
                            { IDTitle:"Customer Id:", IDInfo:"TSKTKL0029", status:'Dispatched', address:'Ambuj Tailors, Temple Road, Thayankari. Pin - 670491', time:"17 minutes ago", button1Text:"7 Items", button2Text:"7,500.00" },
                            ],
            notificationsData: [{ IDTitle:"Customer Id:", IDInfo:"VTKTKL0029", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"4 minutes ago", },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0030", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"6 minutes ago",  },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0029", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"7 minutes ago",  },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0030", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"10 minutes ago", },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0029", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"13 minutes ago",  },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0030", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"15 minutes ago",  },
                            { IDTitle:"Customer Id:", IDInfo:"VTKTKL0029", description:'The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.', time:"17 minutes ago",  },
                            ],

        };
        this.props.getAllOrders();
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        
    }

    onCustomPress=()=>{
        onNavigation(
            "navigation.ismart.OrderDetail",
            // "Order Detail",
            "",
            this.props.componentId,
            this.prop,        
        )             
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                <SearchBar placeholder="Search Products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} />

                <ScrollView>

                    <View style={ordersListStyle.headingTextContainer}>
                        <Text style={ordersListStyle.headingTextStyle}>Upcoming Orders</Text>
                    </View>

                    <ScrollView style={ordersListStyle.scrollContainer} >
                        {this.state.upcomingOrders && this.state.upcomingOrders.length > 0 ?  this.state.upcomingOrders.map((item,index) => (
                        <UpcomingOrderItem key={index} onPress={this.onCustomPress} IDTitle={item.IDTitle} IDInfo={item.IDInfo} time={item.time} button1Text={item.button1Text} button2Text={item.button2Text} />
                        )):null}
                    </ScrollView>

                    <View style={ordersListStyle.headingTextContainer}>
                        <Text style={ordersListStyle.headingTextStyle}>Previous Orders</Text>
                    </View>
                    <ScrollView style={ordersListStyle.scrollContainer} >
                        {this.state.previousOrders && this.state.previousOrders.length > 0 ?  this.state.previousOrders.map((item,index) => (
                        <PreviousOrderItem key={index} onPress={this.onCustomPress} status={item.status} address={item.address} IDTitle={item.IDTitle} IDInfo={item.IDInfo} time={item.time} button1Text={item.button1Text} button2Text={item.button2Text} />
                        )):null}
                    </ScrollView>
                    
                    <View style={ordersListStyle.headingTextContainer}>
                        <Text style={ordersListStyle.headingTextStyle}>Notifications</Text>
                    </View>
                    <ScrollView style={ordersListStyle.scrollContainer} >
                        {this.state.notificationsData && this.state.notificationsData.length > 0 ?  this.state.notificationsData.map((item,index) => (
                        <CustomerNotificationItem key={index} onPress={this.onCustomPress} IDTitle={item.IDTitle} IDInfo={item.IDInfo} description={item.description} time={item.time} />
                        )):null}
                    </ScrollView>

                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    upcomingOrdersData: state.order.ordersData,
})

const mapDispatchToProps = {
    ...OrderAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)
