import React, { Component } from 'react'
import { ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,Icon  } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';
import Moment from 'react-moment';

import { orderDetailStyle } from '../Orders/OrderDetailStyle';
import { commonStyle} from '../Common/CommonStyle';
// import ShoppingCartItem from './ShoppingCartItem';
import { Navigation } from "react-native-navigation";
import { CustomIconInfoButton, CustomButton, TextInputButton } from '../Common/index';
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

//Action
import { OrderAction, SaleAction } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const strDelivered = "Delivered";
const strPending = "Pending";

const filePickerOptions = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export class OrderDetail extends Component {
    
    // static propTypes = {
    //     prop: PropTypes
    // }

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

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dropDownValue:'',
            spinner: false,
            loggedCustomer:'',
            uploadImage: '',
            uploadImageId:'',
            uploadImageSourceData: {},
            uploadInProgress: false, 
            uploadProgress: 0,

            // orderByIdData:'',
            arrOrderItems:'',
            
            orderDetails: { orderNo:"CWCLT2013", address:'Cell World, Opp BMH Hospital, Calicut, Kerala-276003, cellworld@gmail.com, Contact: 09845332441', total:'40240.00', },                              
            tableHead: ['No', 'Item', 'Qty.', 'Price', 'Total'],
            tableData: [
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
        if (nextProps.isUpdateOrderStatus !== this.props.isUpdateOrderStatus ) {
            if (1 === nextProps.isUpdateOrderStatus || 2 === nextProps.isUpdateOrderStatus) {
                this.setState({ spinner: false });
            }
            if(1 === nextProps.isUpdateOrderStatus) {
                alert("Order successfully updated!");
            }
        }
        if (nextProps.isAttachmentPicUploadSucess !== this.props.isAttachmentPicUploadSucess) {
            this.setState({ spinner: false });
            if(1 === nextProps.isAttachmentPicUploadSucess) {
                alert("Image uploaded!");
                this.setState({ uploadImageId: nextProps.uploadImageId});
                console.log("uploadImageId is", nextProps.uploadImageId );
            }
            else {
                alert("Error in upload!");
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

    handleChange = (value,index,data) => {
        // this.setState({
        //     value: event.target.value
        // });
    }

    onAttachmentPress=()=>{

        ImagePicker.showImagePicker(filePickerOptions, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');    
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = response.uri;
               
                console.log("response is", response);

                this.setState({
                uploadImage: source,
                spinner:true
                });

                this.props.uploadAttachmentPic({
                    uploadPic: response,
                    Source:'Staff',
                    OrderId:this.props.orderId
                });
            }
          });
    }

    onUpdatePress=()=>{

        console.log("this.state.dropDownValue is", this.state.dropDownValue);

        if(0 === this.state.dropDownValue.length) {
            alert("Select status from drop down!");
            return;
        }

        if(strDelivered === this.state.dropDownValue) {
            status = "4";
        }
        else if(strPending === this.state.dropDownValue) {
            status = "3";
        }

        console.log("this.state.dropDownValue is", this.state.dropDownValue);

        this.setState({ spinner: true });
        console.log("status is ", status);

        this.props.updateOrderStatus({
            staffId: this.props.orderByIdData.StaffId,
            orderId: this.props.orderByIdData.OrderId,
            status: status,
        });

    }

    onProcessingPress=()=>{
        
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        console.disableYellowBox = true;
        const { search, } = this.state;
        const { dropDownValue } = this.state;
        let dropDownData = [{ value: 'Pending',}, { value: 'Delivered',}];
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search order no" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <View style={orderDetailStyle.headingTextContainer}>
                    <View style={orderDetailStyle.avatarContainer} >
                        <UserAvatar size="46" name="CV" />
                    </View>
                    <View style={{width:"60%", marginTop:-5, }}>
                        <Text style={orderDetailStyle.headingTextStyle}>{this.props.orderByIdData.OrderRefNo} </Text>
                        <Text numberOfLines={4} style={orderDetailStyle.subHeadingTextStyle}>{this.state.loggedCustomer.Address}</Text>
                    </View>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onProcessingPress} title1Style={orderDetailStyle.processingButtonTextStyle} buttonStyle={orderDetailStyle.processingButtonStyle} //title1="Processing" 
                    />
                </View>
               
                <ScrollView style={commonStyle.scrollContainer} >
                    <View style={orderDetailStyle.tableContainer1}>
                        <View style={styles.left1Container}>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
                                <Text style={styles.IDTitleTextStyle} >Order No: </Text>
                                <Text style={styles.IDInfoTextStyle} >{this.props.orderByIdData.OrderRefNo}</Text>
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
                    </View>
                </ScrollView>

                <View style={{backgroundColor:colors.searchBarGrey}}>
                <View style={orderDetailStyle.cartInfoContainer}>
                    <View style={orderDetailStyle.statusButtonsContainer}>
                        <Dropdown containerStyle={{height:"100%", width:"43%", marginTop:-40,
                            //flexDirection:"row-reverse",
                            //justifyContent:"space-between",
                            //alignItems:"center",
                            backgroundColor:"transparent" }} placeholder='Status'  ref='picker'
                            onChangeText={(value) => {
                                console.log(value); // gives new value OK
                                this.setState({ dropDownValue: value });
                                console.log("dropDownValue is", )
                                setTimeout(() => {
                                  let me = this.refs['picker'];
                                  console.log('selected item', me.selectedItem(), me.selectedIndex()); // gives previous item & index
                                }, 100);
                              }}
                            value={dropDownValue} data={dropDownData}/>
                        {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} imageStyle={orderDetailStyle.dropdownButtonImageStyle} title1Style={orderDetailStyle.dropdownButtonTextStyle} buttonStyle={orderDetailStyle.dropdownButtonStyle} iconPath={images.dropdown_arrow} title1="Status" /> */}
                        <TextInputButton onPress={this.onCustomPress} textInputContainerStyle={orderDetailStyle.textInputContainerStyle} textInputPlaceholder="Type here..."  />                        
                        <CustomIconInfoButton activeOpacity={0.7} onPress={this.onAttachmentPress} imageStyle={orderDetailStyle.attachButtonImageStyle} buttonStyle={orderDetailStyle.attachButtonStyle} iconPath={images.attachment} />
                    </View>
                    <CustomButton onPress={() => { this.onUpdatePress(); } } activeOpacity={0.7} buttonStyle={orderDetailStyle.checkoutButtonStyle} buttonTextStyle={orderDetailStyle.cartButtonTextStyle} buttonText="UPDATE" />
                </View>
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

    IDTitleTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.black,        
    },
    IDInfoTextStyle:{
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.navigationBarBlue,
        marginLeft:5,          
    },
})

const mapStateToProps = (state) => ({
    orderByIdData: state.order.orderByIdData,
    isOrderByIdDataLoaded: state.order.isOrderByIdDataLoaded,
    isUpdateOrderStatus: state.sale.isUpdateOrderStatus,
    saleErrorMessage: state.sale.saleErrorMessage,
    uploadImageId: state.order.uploadImageId,
    isAttachmentPicUploadSucess: state.order.isAttachmentPicUploadSucess,
})

const mapDispatchToProps = {
    ...OrderAction,
    ...SaleAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
