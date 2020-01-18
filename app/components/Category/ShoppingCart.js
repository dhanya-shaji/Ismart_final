import React, { Component } from 'react'
import { ImageBackground, Alert, TextInput, Image, TouchableOpacity, Keyboard, ScrollView, View, Text, Dimensions, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";
import ImagePicker from 'react-native-image-picker';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { shoppingCartStyle } from './ShoppingCartStyle';
import { dashboardStyle } from '../Home/DashboardStyle';
import { commonStyle} from '../Common/CommonStyle';
import ShoppingCartItem from './ShoppingCartItem';
import { CustomIconInfoButton, CustomButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

//Action
import { ShoppingCartAction, OrderAction } from "../../redux/actions/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// const uploadImages=[],uploadImageIds=[];
const filePickerOptions = {
    title: 'Select Photo',
    // multiple: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


export class ShoppingCart extends Component {
    
    static propTypes = {
        uploadImage: PropTypes.any,
        uploadImageId:PropTypes.number,
    }

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

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner:false,
            showCommentsPopup: false,
            shoppingCartData : this.props.shoppingCartData,
            toggle:false,
            loggedCustomer:'',
            tempUploadImage:'',
            uploadImages: [],
            uploadImageIds:[],
            uploadImageSourceData: {},
            uploadInProgress: false, 
            uploadProgress: 0,
            cartDetails:{},
            comments:'',
            // cartDetails: { orderNo:"CWCLT2013", address:'Hussein, Zaika Cafe, Near Metro Station, Companypady. Pin - 682030', },                    
        };
        Navigation.events().bindComponent(this);
        this.fetchCustomerData();
        if(this.props.pageSource==='imageupload'){
            this.onPhotoPress();
        }
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

   

    componentWillMount() {
        
        var totalItems = this.getTotalItems();
        // totalItems === 0 ? EventRegister.emit('updateShoppingCartItemsCount', '') : EventRegister.emit('updateShoppingCartItemsCount', totalItems);        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAttachmentPicUploadSucess !== this.props.isAttachmentPicUploadSucess) {
                
                if(1 === nextProps.isAttachmentPicUploadSucess) {
                    this.setState({ spinner: false });
                    if(this.props.pageSource==='imageupload'){

                    }else{
                    alert("Image uploaded!");
                    }
                    var uploadImage = this.state.tempUploadImage;
                    console.log("var uploadImage is ", uploadImage);
                    let uploadImages=this.state.uploadImages;
                    let uploadImageIds=this.state.uploadImageIds;
                    
                    //Storing in Array
                    uploadImages.push(uploadImage);
                    uploadImageIds.push(nextProps.uploadImageId);
                    this.setState({
                        uploadImages,
                        uploadImageIds
                    });
                    
                }
                else if(2===nextProps.isAttachmentPicUploadSucess) {
                    // alert("Error in upload! Please upload file with size less than 1 MB");
                    alert(nextProps.uploadErrorMessage);
                    this.setState({ spinner: false });
                }
        }
        if (nextProps.isOrderSaved !== this.props.isOrderSaved) {
            this.setState({ spinner: false });

                if(nextProps.isOrderSaved ===1) {
                    // alert("Order submitted!");
                    let arrTemp = this.state.shoppingCartData;
                    arrTemp.splice(0,arrTemp.length);
                    this.setState({ 
                        shoppingCartData: arrTemp,
                        uploadImages:[],
                        uploadImageIds:[]
                    });
                    uploadImages=[];
                    uploadImageIds=[];
                    this.props.saveShoppingCartItems({
                        shoppingCartData: this.state.shoppingCartData,
                    });
                    EventRegister.emit('updateShoppingCartItemsCount', '');
                    console.log("orderId is ", nextProps.orderId); 
                    onNavigation( "navigation.ismart.OrderDetail", "", this.props.componentId, {orderId: nextProps.orderId},); 
                }
        }
    }
    
    componentDidMount() {

        addCommonListeners(this);

        // Listener for Pop to Root
        // this.listener = EventRegister.addEventListener('popToRoot', (data) => {
        //     console.log(data);
        //     onNavigationPopToRoot(this.props.componentId);
        // });

    }

    fetchCustomerData = async () => {
        try {
            // console.log("fetchCustomerData");
          const value = await AsyncStorage.getItem('CustomerData');
          console.log("value is",value); 
          if (value !== null) {
              this.setState({ loggedCustomer: JSON.parse(value) });
            }
        //   this.setState({ profileData: value });
            console.log("CustomerData is",this.state.loggedCustomer); 
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    updateShoppingCart=(x)=>{
        console.log(x);
        this.setState({ toggle : false });
     }

     onRemove=(productId)=>{
         console.log("product id is ");
         console.log(productId);
        Alert.alert(
            'Warning',
            'Item will be removed from Shopping Cart. Are you sure?',
            [
              {
                text: 'Cancel',
                onPress: () => { console.log('Cancel Pressed'); },
                style: 'cancel',
              },
            //   array.splice(index, 1);
              { 
                text: 'OK', 
                onPress: () => { 
                    console.log('OK Pressed'); 
                    let arrTemp = this.state.shoppingCartData;
                    for(i=0; i<arrTemp.length; i++) {
                        let tempItem = arrTemp[i];
                        if(tempItem.ProductId == productId) {
                            arrTemp.splice(i, 1); 
                            this.setState({ shoppingCartData: arrTemp});
                            this.props.saveShoppingCartItems({
                                shoppingCartData: this.state.shoppingCartData,
                            });
                            break;
                        } 
                    }
                }
              },
            ],
            {cancelable: false},
          );         
    }
    

    onProcessingPress=()=>{
        onNavigationPopToRoot(this.props.componentId);
        // console.log("shoppingCartData");
        // console.log(this.props.shoppingCartData);
    }

    onCustomPress=()=>{
        // console.log("shoppingCartData");
        // console.log(this.props.shoppingCartData);
    }
    
    onPhotoPress=()=>{

        ImagePicker.showImagePicker(filePickerOptions, (response) => {
            console.log('Response = ', response);
           this.setState({
            spinner:true
           })
            if (response.didCancel) {
              console.log('User cancelled image picker');   
              this.setState({
                spinner:false
               }) 
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
                tempUploadImage: source,
                
                });

                this.props.uploadAttachmentPic({
                    uploadPic: response,
                    Source:'Customer',
                    OrderId:0
                });
            }
          });
    }

    onCheckoutPress=()=>{

        let arrTemp = this.state.shoppingCartData;

        if(this.props.shoppingCartData.length === 0 &&  this.state.uploadImageIds.length===0) {
            alert("Shopping cart is empty!.Please add any products or upload image in shopping cart ");
            return;      
        } 

        this.setState({ spinner:true, });

        console.log("this.state.uploadImageId", this.state.uploadImageId);

        let cartDetails = {"CustomerCode":"", "TotalPrice":"","TotalItem":"", "Attachement":0,"OrderList":[],"UploadImagesId":[] };
        cartDetails.CustomerCode = this.state.loggedCustomer.CustomerCode;
        cartDetails.Attachement =0 ;
        cartDetails.UploadImagesId=this.state.uploadImageIds

        cartDetails.TotalPrice = this.getTotalAmount();
        cartDetails.Comments = this.state.comments;
        cartDetails.TotalItem = this.getTotalItems();
        // cartDetails.OrderList = [];

        for(i=0; i<this.state.shoppingCartData.length; i++) {
            let tempItem = this.props.shoppingCartData[i];
            let orderListItem = {};
            orderListItem.ProductId = tempItem.ProductId;
            // orderListItem.ProductName = tempItem.ProductName;
            // orderListItem.SinglePrice = tempItem.Price;
            orderListItem.Quantity = parseInt(tempItem.Quantity, 10);
            // orderListItem.ProductImage = tempItem.ProductImage;
            cartDetails.OrderList.push(orderListItem);
        }

        // this.setState({ cartDetails: JSON.stringify(cartDetails) });

        // console.log("loggedCustomer is", this.state.loggedCustomer);
        // console.log("shoppingCartData is", this.state.shoppingCartData);
        console.log("cartDetails is", cartDetails);

        this.props.saveOrderDetails({
            // customerCode: cartDetails.CustomerCode,
            // attachment: cartDetails.Attachement,
            // totalPrice: cartDetails.TotalPrice,
            // comments: cartDetails.Comments,
            // totalItem: cartDetails.TotalItem,
            // orderList : cartDetails.OrderList,
            cartDetails: JSON.stringify(cartDetails),
        });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    getTotalItems=()=>{
        var itemsCount = 0;
        for(i=0; i<this.props.shoppingCartData.length; i++) {
            let tempItem = this.props.shoppingCartData[i];
            itemsCount = itemsCount +  parseInt(tempItem.Quantity, 10);
        }
        // console.log(itemsCount);
        return itemsCount;
    }

    getTotalAmount=()=>{
        var amount = 0;
        for(i=0; i<this.props.shoppingCartData.length; i++) {
            let tempItem = this.props.shoppingCartData[i];
            amount = amount +  parseInt(tempItem.Quantity, 10) * tempItem.Price;
        }
        // console.log(amount);
        return amount;
    }

    render() {
        const { search,uploadImages } = this.state;
        var totalItems = this.getTotalItems();
        var totalAmount = this.getTotalAmount();
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Search order no" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <Spinner visible={this.state.spinner} textContent={"Uploading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <Dialog
                    visible={this.state.showCommentsPopup}
                    onTouchOutside={() => {
                        this.setState({ showCommentsPopup: false });
                        this.setState({ comments: ''});
                        Keyboard.dismiss();                
                    }}>
                    <DialogContent>
                    {
                        <View style={{backgroundColor:'#fff', width:300 }}>
                            <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"center" }}>
                                <TouchableOpacity style={{marginTop:10, marginRight:0, width:32, height:32, alignSelf:"flex-end", alignItems:"center",justifyContent:"center" }} 
                                    onPress={() => {
                                        this.setState({ showCommentsPopup: false });
                                        this.setState({ comments: ''});
                                    }} >
                                    <Image source={images.cross_black} style={{ height:16,width:16}}/>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={{ backgroundColor:colors.searchBarGrey, marginTop:5, height:100, width:"100%", alignSelf:"center", lineHeight:20, borderRadius:6, padding:5}}
                                placeholder={"Enter comments."} 
                                placeholderStyle={{fontFamily:fontFamily.montserrat, fontSize:fontSize.small, color:colors.black}}
                                multiline={true}
                                onChangeText={(comments) => this.setState({comments})}
                                value={this.state.comments}
                            />
                            <TouchableOpacity style={shoppingCartStyle.submitButtonStyle } 
                                onPress={() => this.setState({ showCommentsPopup: false })} >
                                <Text style={ shoppingCartStyle.submitButtonTextStyle}>Submit</Text>
                            </TouchableOpacity> 
                        </View>
                    }
                    
                    </DialogContent>
                </Dialog>
                {/* <ScrollView> */}
                <View style={shoppingCartStyle.headingTextContainer}>
                    <Text style={shoppingCartStyle.headingTextStyle}>{this.state.loggedCustomer.CustomerName} </Text>
                    {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onProcessingPress} title1Style={shoppingCartStyle.processingButtonTextStyle} buttonStyle={shoppingCartStyle.processingButtonStyle} title1="Processing" /> */}
                </View>
                <Text numberOfLines={2} style={shoppingCartStyle.subHeadingTextStyle}>{this.state.loggedCustomer.Address}</Text>
                {/* <Image style={shoppingCartStyle.uploadImageStyle} source={this.state.uploadImage ? {uri:this.state.uploadImage} : images.empty_folder}/> */}
                <ScrollView style={shoppingCartStyle.shoppingCartScrollContainer} >
                    {this.props.shoppingCartData && this.props.shoppingCartData.length > 0 ?  this.props.shoppingCartData.map((item,index) => (
                    <ShoppingCartItem onRemovePress={this.onRemove} onUpdateShoppingCartPress={this.updateShoppingCart} key={index} onPress={this.onCustomPress()} urlImage={item.ProductImage} productId={item.ProductId} discountPrice={item.Price} quantity={item.Quantity} markedPrice={item.Price} model={item.model} companyName={item.ProductName} specification={item.Description} description={item.Description} />                        
                    )):<View style={shoppingCartStyle.emptyViewContainerStyle}><Text style={shoppingCartStyle.emptyHeadingTextStyle}>Shopping cart is empty!</Text></View>}
                </ScrollView> 
                <ScrollView style={shoppingCartStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {uploadImages.length > 0 &&  uploadImages.map((item,index) => (
                           
                           <View key={index} style={dashboardStyle.plusButtonViewContainer}>
                                <CustomIconInfoButton 
                                key={index} 
                                activeOpacity={0.7} 
                                buttonStyle={dashboardStyle.buttonStyle} 
                                imageStyle={dashboardStyle.imageStyle} 
                                urlImage={item} 
                                onPress={()=>console.log("hai")}
                                />
                            </View>
                        ))}
                    </ScrollView>
                {/* <Image style={shoppingCartStyle.uploadImageStyle} source={this.state.uploadImage ? {uri:this.state.uploadImage} : images.empty_folder}/> */}

                <View style={shoppingCartStyle.cartInfoContainer}>
                    <View style={shoppingCartStyle.textInfoContainer}>
                        <Text style={shoppingCartStyle.title1TextStyle}>Total Items: {totalItems}</Text>
                        <View style={shoppingCartStyle.amountContainer}>
                            <Text style={[shoppingCartStyle.title1TextStyle,{marginRight:5}]}>Total Amount:</Text>
                            <Text style={shoppingCartStyle.amountTextStyle}>INR {totalAmount}</Text>
                        </View>
                    </View>
                    <View style={shoppingCartStyle.cartButtonsContainer}>
                        <CustomIconInfoButton onPress={() => this.setState({ showCommentsPopup: true })} activeOpacity={0.7} buttonStyle={shoppingCartStyle.notesButtonStyle} imageStyle={shoppingCartStyle.notesImageStyle} iconPath={images.edit} title1Style={shoppingCartStyle.title1TextStyle} title1="Notes"  />
                        <CustomIconInfoButton onPress={this.onPhotoPress} activeOpacity={0.7} buttonStyle={shoppingCartStyle.notesButtonStyle} imageStyle={shoppingCartStyle.notesImageStyle} iconPath={images.camera_grey} title1Style={shoppingCartStyle.title1TextStyle} title1="Photo"  />
                        <CustomButton onPress={this.onCheckoutPress} activeOpacity={0.7} buttonStyle={shoppingCartStyle.checkoutButtonStyle} buttonTextStyle={shoppingCartStyle.cartButtonTextStyle} buttonText="CHECKOUT" />
                    </View>
                </View>
                {/* </ScrollView> */}
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    shoppingCartData:state.shoppingcart.shoppingCartData,
    isOrderSaved:state.order.isOrderSaved,
    orderId:state.order.orderId,
    uploadImageId: state.order.uploadImageId,
    isAttachmentPicUploadSucess: state.order.isAttachmentPicUploadSucess,
    uploadErrorMessage: state.order.uploadErrorMessage,
})

const mapDispatchToProps = {
    ...ShoppingCartAction,
    ...OrderAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
