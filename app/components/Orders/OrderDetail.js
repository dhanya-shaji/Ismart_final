import React, { Component } from 'react'
import { ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,Icon  } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import Moment from 'react-moment';

import { orderDetailStyle } from './OrderDetailStyle';

import { commonStyle} from '../Common/CommonStyle';
import { Navigation } from "react-native-navigation";
// import ShoppingCartItem from './ShoppingCartItem';
import { CustomIconInfoButton, CustomButton, TextInputButton } from '../Common/index';
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

//Action
import { OrderAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class OrderDetail extends Component {
    
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
            loggedCustomer:'',
            // orderByIdData:'',
            arrOrderItems:'',
            // appliancesData: [{ imageSource: images.charger1, discountPrice:"5,500.00", markedPrice:"12000.00", model:"DL-C17", companyName: 'LDNIO',  specification:'USB Car Charger 1000MA Output', description:'The quick brown fox jumps over the lazy dog. This is an extremely good product', }, 
            //                  { imageSource: images.charger2, discountPrice:"45,500.00", markedPrice:"50,000.00", model:"DC-254", companyName: 'TESSCO',  specification:'Single USB Charger 1000MA Output', description:'This is an extremely good product. The quick brown fox jumps over the lazy dog.',},
            //                  { imageSource: images.charger1, discountPrice:"5,500.00", markedPrice:"12000.00", model:"DL-C17", companyName: 'LDNIO',  specification:'USB Car Charger 1000MA Output', description:'The quick brown fox jumps over the lazy dog. This is an extremely good product', }, 
            //                  { imageSource: images.charger2, discountPrice:"45,500.00", markedPrice:"50,000.00", model:"DC-254", companyName: 'TESSCO',  specification:'Single USB Charger 1000MA Output', description:'This is an extremely good product. The quick brown fox jumps over the lazy dog.',},
            //                  { imageSource: images.charger1, discountPrice:"5,500.00", markedPrice:"12000.00", model:"DL-C17", companyName: 'LDNIO',  specification:'USB Car Charger 1000MA Output', description:'The quick brown fox jumps over the lazy dog. This is an extremely good product', }, 
            //                  { imageSource: images.charger2, discountPrice:"45,500.00", markedPrice:"50,000.00", model:"DC-254", companyName: 'TESSCO',  specification:'Single USB Charger 1000MA Output', description:'This is an extremely good product. The quick brown fox jumps over the lazy dog.',},                             
            //                 ],
            orderDetails: { orderNo:"CWCLT2013", address:'Cell World, Opp BMH Hospital, Calicut, Kerala-276003, cellworld@gmail.com, Contact: 09845332441', total:'40240.00', },                              
            tableHead: ['No', 'Item', 'Qty.', 'Price', 'Total'],
            tableData: [
                // ['1', 'AUX Cable iBell 10pcs board', '35', '100', '3500.00'],
                // ['2', 'Multi charger cables Oxy', '18', '30', '540.00' ],
                // ['3', 'USB data cables', '100', '40', '4000.00' ],
                // ['4', 'Portable Modem', '12', '2000', '30,000.00' ],
                // ['5', 'Car readers 3G', '20', '2000', '1000.00' ],
                // ['6', 'Car charger',  '120', '2000', '1200.00' ],
            ],                            
        };
        Navigation.events().bindComponent(this);
        this.setState({ spinner: true });
        this.fetchCustomerData();
        this.props.getOrderById({
            orderId: this.props.orderId,
        });
    }

    fetchCustomerData = async () => {
        try {
          const value = await AsyncStorage.getItem('CustomerData');
          console.log("value is ", value);
          if (value !== null) {
              this.setState({ loggedCustomer: JSON.parse(value) });
            }
            console.log("Profile CustomerData is",this.state.loggedCustomer); 
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    updateTableData=(orderByIdData)=> {
         console.log("orderByIdData is", orderByIdData);
        let arrTemp = [];
        this.setState({ tableData: [] });
        if(orderByIdData && orderByIdData.OrderItemList && orderByIdData.OrderItemList.length > 0) {
            for(i=0; i<orderByIdData.OrderItemList.length; i++) {
                let tempItem = [];
                let orderListItem = orderByIdData.OrderItemList[i];
                console.log("orderlistitem is", orderListItem);
                tempItem.push(orderListItem.OrderItemId);
                tempItem.push(orderListItem.ProductName);
                tempItem.push(orderListItem.Quantity);
                tempItem.push(orderListItem.SinglePrice);
                tempItem.push(orderListItem.Quantity * orderListItem.SinglePrice);
                arrTemp.push(tempItem);
            }
            console.log("arrTemp is", arrTemp);
            this.setState({ tableData: arrTemp});
        }
        return 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOrderByIdDataLoaded !== this.props.isOrderByIdDataLoaded ) {
            if (1 === nextProps.isOrderByIdDataLoaded || 2 === nextProps.isOrderByIdDataLoaded) {
                this.setState({ spinner: false });
            }
        }
        if (nextProps.orderByIdData !== this.props.orderByIdData ) {
            if(nextProps.orderByIdData && nextProps.orderByIdData.OrderItemList && nextProps.orderByIdData.OrderItemList.length > 0) {
                this.updateTableData(nextProps.orderByIdData);
            }
        }
    }

    componentDidMount() {
        addCommonListeners(this);   
    }

    componentDidUpdate() {
        
    }

    onCustomPress=()=>{

    }

    onProcessingPress=()=>{
        
    }

    updateSearch = search => {
        this.setState({ search });
    };

    getOrderStatus=(status)=>{
        if(status===1){
            return "Ordered"
        }else if(status===2){
            return "Ongoing"
        }else if(status===3){
            return "Pending"
        }else if(status===4){
            return "Deliverd"
        }else{
            return "Ordered"
        }
    }

    render() {
        console.disableYellowBox = true;
        const { search, } = this.state;
        let data = [{ value: 'Dispatched',}, { value: 'In Transit',}, { value: 'Delivered',}];
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search order no" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <View style={orderDetailStyle.headingTextContainer}>
                    <View style={orderDetailStyle.avatarContainer} >
                        <UserAvatar size="46" name="NO" />
                    </View>
                    <View style={{width:"60%", marginTop:-5, }}>
                        <Text style={orderDetailStyle.headingTextStyle}>{this.props.orderByIdData.OrderRefNo} </Text>
                        <Text numberOfLines={4} style={orderDetailStyle.subHeadingTextStyle}>{this.state.loggedCustomer.Address}</Text>
                    </View>
                    <CustomIconInfoButton activeOpacity={0.1} onPress={this.onProcessingPress} title1Style={orderDetailStyle.processingButtonTextStyle} buttonStyle={orderDetailStyle.processingButtonStyle} title1={this.getOrderStatus(this.props.orderByIdData.OrderStatus)} />
                </View>
               
                <ScrollView style={commonStyle.scrollContainer} >
                    <View style={orderDetailStyle.tableContainer1}>
                        <View style={styles.left1Container}>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
                                <Text style={styles.IDTitleTextStyle} >Order No: </Text>
                                <Text style={styles.IDInfoTextStyle} >{this.props.orderByIdData.OrderId}</Text>
                            </View>
                            <Text style={[styles.IDTitleTextStyle,{fontWeight:"normal"}]} >{this.props.orderByIdData.OrderDate}</Text>
                            {/* <Moment parse="YYYY-MM-DD HH:mm"> 1976-04-19 12:59 </Moment> */}

                        </View>
                        <View style={orderDetailStyle.tableContainer2}>
                            <Table borderStyle={orderDetailStyle.tableBorderStyle}>
                            <Row data={this.state.tableHead} style={orderDetailStyle.tableHeadingStyle} textStyle={orderDetailStyle.tableHeadingTextStyle}/>
                            <Rows data={this.state.tableData}  
                                style={orderDetailStyle.entryStyle} textStyle={orderDetailStyle.entryTextStyle}/>
                            </Table>
                        </View>
                        <View style={styles.left1Container}>
                            <Text style={styles.IDTitleTextStyle} >Total: </Text>
                            <Text style={styles.IDInfoTextStyle} >{this.props.orderByIdData.TotalPrice}</Text>
                        </View>
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentsStyle} >Comments: </Text>
                            <Text style={styles.commentContentStyle}>{this.props.orderByIdData.Comments}</Text>
                        </View>

                        <ScrollView style={commonStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.props.orderByIdData.AttachmentList && this.props.orderByIdData.AttachmentList.length > 0 ?  this.props.orderByIdData.AttachmentList.map((item,i) => (
                        <CustomIconInfoButton 
                        key={i} 
                        onPress={()=>console.log("haii")} 
                        activeOpacity={0.7} 
                        buttonStyle={orderDetailStyle.buttonStyle} 
                        imageStyle={orderDetailStyle.imageStyle} 
                        urlImage={item.Attchements} 
                         />
                        )):null}
                    </ScrollView>
                    </View>
                </ScrollView>

                <View style={{backgroundColor:colors.searchBarGrey}}>
                {/* <View style={orderDetailStyle.cartInfoContainer}> */}
                    {/* <View style={orderDetailStyle.statusButtonsContainer}> */}
                        {/* <Dropdown containerStyle={{height:"100%", width:"43%", marginTop:-40,
                            //flexDirection:"row-reverse",
                            //justifyContent:"space-between",
                            //alignItems:"center",
                            backgroundColor:colors.searchBarGrey, }} placeholder='Status' data={data}/> */}
                        {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} imageStyle={orderDetailStyle.dropdownButtonImageStyle} title1Style={orderDetailStyle.dropdownButtonTextStyle} buttonStyle={orderDetailStyle.dropdownButtonStyle} iconPath={images.dropdown_arrow} title1="Status" /> */}
                        {/* <TextInputButton onPress={this.onCustomPress} textInputContainerStyle={orderDetailStyle.textInputContainerStyle} textInputPlaceholder="Type here..."  />                        
                        <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} imageStyle={orderDetailStyle.attachButtonImageStyle} buttonStyle={orderDetailStyle.attachButtonStyle} iconPath={images.attachment} /> */}
                    {/* </View> */}
                    {/* <CustomButton onPress={this.onCustomPress} activeOpacity={0.7} buttonStyle={orderDetailStyle.checkoutButtonStyle} buttonTextStyle={orderDetailStyle.cartButtonTextStyle} buttonText="UPDATE" /> */}
                {/* </View> */}
                </View>
                
            </ImageBackground>
        )
    }
}

// {this.props.upcomingOrdersData && this.props.upcomingOrdersData.length > 0 ?  this.props.upcomingOrdersData.map((item,index) => (
//     <UpcomingOrderItem key={index} onPress={() => {this.onOrderPress(item.OrderId)} } IDTitle={orderText} IDInfo={item.OrderId} time={item.OrderDate} button1Text={acceptText} button2Text={rejectText} />
//     )):null}

const styles = StyleSheet.create({

    left1Container:{
        width:"100%",
        padding:5,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    commentContainer:{
        width:"100%",
        padding:5,
        flexDirection:'column',
        justifyContent:"space-between",
    }
    ,
    commentsStyle:{
        color:colors.darkGrey,
        fontSize:fontSize.xsmall
    },
    commentContentStyle:{
        color:colors.darkGrey,
        fontSize:fontSize.xxsmall
    }
    ,
    IDTitleTextStyle:{
        fontSize:fontSize.small, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.black,        
    },
    IDInfoTextStyle:{
        fontSize:fontSize.small, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.navigationBarBlue,
        marginLeft:5,          
    },
})

const mapStateToProps = (state) => ({
    orderByIdData: state.order.orderByIdData,
    isOrderByIdDataLoaded: state.order.isOrderByIdDataLoaded,    
})

const mapDispatchToProps = {
    ...OrderAction,    
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
