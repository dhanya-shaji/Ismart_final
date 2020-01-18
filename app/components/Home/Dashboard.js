import React, { Component } from 'react'
import { ImageBackground, FlatList, Platform, RefreshControl, TouchableOpacity, ScrollView, Image, View, Text, Dimensions } from 'react-native'
import PropTypes, { bool } from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar, } from 'react-native-elements';
// import Carousel from 'react-native-banner-carousel';
import SplashScreen from 'react-native-splash-screen';


import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { dashboardStyle } from './DashboardStyle';
import { commonStyle } from '../Common/CommonStyle';
import { CustomIconInfoButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigationPopToRoot, onNavigateToLogin } from '../../config/navigations';

import { Button } from 'react-native-paper';

//Carousel
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from '../Common/slider/SliderEntry';
import { sliderWidth, itemWidth } from '../Common/slider/SliderEntry.style';
import styles from '../Common/slider/index.style';


//Action
import { CategoryAction, HomeAction, ShoppingCartAction, BrandAction ,LoginAction} from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

//Firebase 
import firebase, { RemoteMessage } from 'react-native-firebase';
import type, { Notification, NotificationOpen } from 'react-native-firebase';

// import {YellowBox} from 'react-native';
// YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;
import { Card } from "react-native-elements";

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fcmToken: '',
            search: '',
            spinner: false,
            refreshing: false,
            showDrawer: false,
            feedsData: [],
            productsData: [],
            shoppingCartData: this.props.shoppingCartData ? this.props.shoppingCartData : [],
            filteredProductsData: [],
            mostOrderedProduct: [],
            isMostOrderLoaded: 0,
            slider1ActiveSlide: 1
        };

        Navigation.events().bindComponent(this);

        this.setState({ spinner: true });
        this.props.getAllFeeds();
        this.props.getAllProducts();
        this.props.getNewOrderList();
        this.props.getMostOrderedProduct();
    }
    componentWillMount() {

        SplashScreen.hide();
        this.checkIfCustomerIsActiveOrNot();
    }
    componentDidMount() {
        this.checkFCMPermission();
        addCommonListeners(this);

        //Firebase Channel Creation 
        if (Platform.OS == "android") {
            if (Platform.Version >= 26) {
                const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                    .setDescription('My apps test channel');
                // Create the channel
                firebase.notifications().android.createChannel(channel);
            }
        }

        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
            // Process your message as required
            console.log("Message-", message.toString());
        });

        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            console.log("===NOTIFICATION DISPLAYED===   onNotificationDisplayed");
            console.log("===onNotificationDisplayed 1===");
            // this.props.notificationCount({
            //     type:'inc'
            // });
            // Process your notification as required
            console.log("Notification1-- ", notification.title);
            console.log("Notification1-- ", notification.body);
            if (Platform.OS == "android") {
                notification
                    .android.setChannelId('test-channel')
                    .android.setSmallIcon('ic_launcher');
            }
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });


        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            this.props.notificationCount({
                type: 'inc'
            });
            console.log("===NOTIFICATION RECEIVED===  onNotification");
            console.log("===onNotificationDisplayed 2===");
            console.log("Notification2-- ", notification.title);
            console.log("Notification2-- ", notification.body);

            if (Platform.OS == "android") {
                notification
                    .android.setChannelId('test-channel')
                    .android.setSmallIcon('ic_launcher');
            }
            firebase.notifications().displayNotification(notification);
            // firebase.notifications().removeDeliveredNotification(notification.notificationId);
        });

        // when app in forground and clicked on notification
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            console.log("===NOTIFICATION OPENED/ CLICKED===  onNotificationOpened");
            console.log("Notification clicked -- foreground");
            onNavigation("navigation.ismart.New", "Notifications", this.props.componentId, {})

            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
        });

        // when app in background and clicked on notification
        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                console.log("===NOTIFICATION OPENED/ CLICKED===  getInitialNotification");
                if (notificationOpen) {
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    const action = notificationOpen.action;
                    console.log("Notification clicked -- background");
                    onNavigation("navigation.ismart.New", "Notifications", this.props.componentId, {})
                    // Get information about the notification that was opened
                    const notification: Notification = notificationOpen.notification;
                }
            });
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



    componentWillReceiveProps(nextProps) {


        //Check if cust is not active 
        if (nextProps.isCustomerActive !== this.props.isCustomerActive) {
            if (nextProps.isCustomerActive === "Deleted") {
                try {
                    AsyncStorage.setItem('isCustomerLoggedIn', 'false');
                    AsyncStorage.setItem('CustomerData', null);
                } catch (e) {
                    // saving error
                    console.log("error is ", e);
                }
                alert("Your account is deleted from admin side ");
                onNavigateToLogin();

            }
        }
        if (nextProps.isFeedsLoaded !== this.props.isFeedsLoaded) {

            if (1 === nextProps.isFeedsLoaded || 2 === nextProps.isFeedsLoaded) {
                this.setState({
                    spinner: false,
                    refreshing: false
                });

            }
        }

        if (nextProps.feedsData !== this.props.feedsData) {
            if (nextProps.feedsData && nextProps.feedsData.length > 0) {
                // alert("got data");
                console.log("feedsData is ", nextProps.feedsData);
                this.setState({
                    spinner: false,
                    refreshing: false,
                    feedsData: nextProps.feedsData
                });

            }
        }

        if (nextProps.isNewOrdersLoaded !== this.props.isNewOrdersLoaded) {

            if (1 === nextProps.isNewOrdersLoaded || 2 === nextProps.isNewOrdersLoaded) {
                this.setState({
                    spinner: false,
                    refreshing: false,

                });
            }
        }

        if (nextProps.newOrdersData !== this.props.newOrdersData) {
            if (nextProps.newOrdersData && nextProps.newOrdersData.length > 0) {
                // alert("got data");
                this.setState({
                    spinner: false,
                    refreshing: false,

                });
                // this.setState({ filteredProductsData:nextProps.filteredProductsData });
            }
        }

        if (nextProps.isProductsDataLoaded !== this.props.isProductsDataLoaded) {
            if (1 === nextProps.isProductsDataLoaded || 2 === nextProps.isProductsDataLoaded) {
                this.setState({
                    spinner: false,
                    refreshing: false,

                });
            }
        }
        if (nextProps.filteredProductsData !== this.props.filteredProductsData) {
            if (nextProps.filteredProductsData && nextProps.filteredProductsData.length > 0) {
                this.setState({
                    spinner: false,
                    refreshing: false,
                    filteredProductsData: nextProps.filteredProductsData
                });
                console.log("filteredProductsData dashboard is ", nextProps.filteredProductsData);

            }
        }

        if (this.props.isMostOrderedProductLoaded !== nextProps.isMostOrderedProductLoaded) {
            if (nextProps.isMostOrderedProductLoaded === 1) {
                this.setState({
                    spinner: false,
                    refreshing: false,
                    isMostOrderLoaded: 1,
                    mostOrderedProduct: nextProps.mostOrderedProductList
                })
            } else if (nextProps.isMostOrderedProductLoaded === 2) {
                this.setState({
                    spinner: false,
                    refreshing: false,
                    isMostOrderLoaded: 2,
                    mostOrderedProduct: []
                })
            }
        }
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this.messageListener();
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }
    checkIfCustomerIsActiveOrNot = async () => {
        try {
            // console.log("fetchCustomerData");
            const value = await AsyncStorage.getItem('CustomerData');
            if (value !== null) {
                this.setState({ loggedCustomer: JSON.parse(value) }, () => {
                    this.props.checkIfCustomerExistOfNot({
                        customer_code: this.state.loggedCustomer.CustomerCode,
                    });
                });
            }



        } catch (e) {
            // error reading value
            console.log("error is ", e);
        }
    }

    onLogoutPress = () => {
        try {
            AsyncStorage.setItem('isCustomerLoggedIn', 'false');
            AsyncStorage.setItem('CustomerData', null);
        } catch (e) {
            // saving error
            console.log("error is ", e);
        }
        onNavigateToLogin();
    }

    getTotalItems = () => {
        var itemsCount = 0;
        for (i = 0; i < this.state.shoppingCartData.length; i++) {
            let tempItem = this.state.shoppingCartData[i];
            itemsCount = itemsCount + parseInt(tempItem.Quantity, 10);
        }
        // console.log(itemsCount);
        return itemsCount;
    }



    navigateToScreen = (screenName) => {
        onNavigation(screenName, "Product Details", this.props.componentId, this.prop)
    }

    handleNavigationEvent = (itemForNavigation) => {
        itemForNavigation.Quantity = "1";
        onNavigation("navigation.ismart.ProductDetail", "Product Details",
            this.props.componentId,
            { productDetails: itemForNavigation, productId: itemForNavigation.ProductId, categoryId: itemForNavigation.CatagoryId, type: "Cata", });
    }
    handleNavigationEventForOffer = (itemForNavigation) => {
        itemForNavigation.Product.Quantity = "1";
        onNavigation("navigation.ismart.ProductDetail", "Product Details",
            this.props.componentId,
            { productDetails: itemForNavigation.Product, productId: itemForNavigation.Product.ProductId, categoryId: itemForNavigation.CatagoryId, type: "Cata", });
    }

    handlePlusEvent = (itemToAdd, buttonType) => {
        if (buttonType === 'offer') {
            itemToAdd = itemToAdd.Product;
        }
        alert("Item added to shopping cart!");
        itemToAdd.Quantity = "1";
        let arrTemp = this.state.shoppingCartData;
        var isItemAlreadyExistsInArray = false;

        for (i = 0; i < arrTemp.length; i++) {
            let tempItem = arrTemp[i];
            if (tempItem.ProductId == itemToAdd.ProductId) {
                // item is the same so just increment the quantity count
                isItemAlreadyExistsInArray = true;
                var count = parseInt(tempItem.Quantity, 10);
                count++;
                tempItem.Quantity = count.toString();
                arrTemp[i] = tempItem;
                break;
            }
        }
        if (!isItemAlreadyExistsInArray) {
            arrTemp.push(itemToAdd);
        }
        this.setState({ shoppingCartData: arrTemp });
        console.log("shopping cart");
        console.log(this.state.shoppingCartData);
        this.props.saveShoppingCartItems({
            shoppingCartData: this.state.shoppingCartData,
        });
        var totalItems = this.getTotalItems();
        EventRegister.emit('updateShoppingCartItemsCount', totalItems);
    }

    updateSearch = () => {

        onNavigation("navigation.ismart.SearchPage", "Search Here",
            this.props.componentId,
            { searchText: '' });
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.setState({ filteredProductsData: '' });
        this.props.getAllFeeds();
        this.props.getAllProducts();
        this.props.getNewOrderList();
        this.props.getMostOrderedProduct();
    }
    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }
    mainExample(number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>

                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.state.feedsData}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={1}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={700}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
                <Pagination
                    dotsLength={this.state.feedsData.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={colors.searchBarGrey}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.blue}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    render() {
        console.disableYellowBox = true;
        const { search } = this.state;
        return (
            <ImageBackground style={commonStyle.imageBackground} resizeMode='cover' source={images.background}>
                <TouchableOpacity onPress={() => this.updateSearch()}>
                    <Button icon="search-web" color={colors.textBlack} mode="text" style={commonStyle.searchBarInputContainerStyle}>
                        Search Products..
</Button>

                </TouchableOpacity>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />} >
                    <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                    {/* <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={BannerWidth}>
                       
                        {this.state.feedsData.map((item, index) => this.renderPage(item, index))}
                    </Carousel> */}
                    {this.mainExample(1, "test")}
                    <Text style={dashboardStyle.headingTextStyle}>New Launches</Text>
                    <View style={dashboardStyle.scrollContainer}>
                        {this.state.filteredProductsData && this.state.filteredProductsData.length > 0 ?
                            <FlatList
                                horizontal
                                data={this.state.filteredProductsData}
                                ItemSeparatorComponent={
                                    () => <View style={{ width: 5 }} />
                                }
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { this.handleNavigationEvent(rowData); }}
                                            onPlusImagePress={() => { this.handlePlusEvent(rowData, 'new_launch'); }}>
                                            {/*<Card
                              title={null}
                              imageStyle={dashboardStyle.imageStyle} 
                              image={{ uri: rowData.ProductImage }}
                              containerStyle={dashboardStyle.plusButtonViewContainer}
                            /> */}
                                            <View style={dashboardStyle.plusButtonViewContainer}>
                                                <Image style={dashboardStyle.imageStyle}
                                                    source={{ uri: rowData.ProductImage }} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            />
                            : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>List is empty!</Text></View>}
                    </View>

                    <Text style={dashboardStyle.headingTextStyle}>Most Ordered</Text>
                    <View style={dashboardStyle.scrollContainer}>
                        {this.state.mostOrderedProduct && this.state.mostOrderedProduct.length > 0 ?
                            <FlatList
                                horizontal
                                data={this.state.mostOrderedProduct}
                                ItemSeparatorComponent={
                                    () => <View style={{ width: 5 }} />
                                }
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { this.handleNavigationEvent(rowData); }}
                                            onPlusImagePress={() => { this.handlePlusEvent(rowData, 'most_order'); }}>
                                            {/* <Card
                                title={null}
                                imageStyle={dashboardStyle.imageStyle} 
                                image={{ uri: rowData.ProductImage }}
                                containerStyle={dashboardStyle.plusButtonViewContainer}
                             /> */}
                                            <View style={dashboardStyle.plusButtonViewContainer}>
                                                <Image style={dashboardStyle.imageStyle}
                                                    source={{ uri: rowData.ProductImage }} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            />
                            : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.state.isMostOrderLoaded === 0 ? 'Loading..' : 'List is empty!'}</Text></View>}
                    </View>

                    <Text style={dashboardStyle.headingTextStyle}>Offers</Text>

                    <View style={dashboardStyle.scrollContainer}>
                        {this.props.feedsData && this.props.feedsData.length > 0 ?
                            <FlatList
                                horizontal
                                data={this.state.feedsData}
                                ItemSeparatorComponent={
                                    () => <View style={{ width: 5 }} />
                                }
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { this.handleNavigationEventForOffer(rowData); }}
                                            onPlusImagePress={() => { this.handlePlusEvent(rowData, 'offer'); }}>
                                            {/* <Card
                              title={null}
                              imageStyle={dashboardStyle.imageStyle} 
                              image={{ uri:rowData.Product!==null?rowData.Product.ProductImage:''}}
                              containerStyle={dashboardStyle.plusButtonViewContainer }
                           /> */}
                                            <View style={dashboardStyle.plusButtonViewContainer}>
                                                <Image style={dashboardStyle.imageStyle}
                                                    source={{ uri: rowData.Product !== null ? rowData.Product.ProductImage : '' }} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            />
                            : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>List is empty!</Text></View>}
                    </View>

                    <Text style={dashboardStyle.headingTextStyle}></Text>
                    <View style={{ width: 10 }}></View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    feedsData: state.home.feedsData,
    isFeedsLoaded: state.home.isFeedsLoaded,
    newOrdersData: state.home.newOrdersData,
    isNewOrdersLoaded: state.home.isNewOrdersLoaded,

    productsData: state.category.productsData,
    filteredProductsData: state.category.productsData,
    isProductsDataLoaded: state.category.isProductsDataLoaded,
    shoppingCartData: state.shoppingcart.shoppingCartData,
    isMostOrderedProductLoaded: state.home.isMostOrderedProductLoaded,
    mostOrderedProductList: state.home.mostOrderedProductList,
    isCustomerActive: state.home.isCustomerActive,

    isShopIdLoggedIn: state.login.isShopIdLoggedIn,
    loginErrorMessage: state.login.loginErrorMessage,
    customerData: state.login.customerData,
    otpNumber: state.login.otpNumber,
    loginErrorMessage: state.login.loginErrorMessage
})

const mapDispatchToProps = {
    ...BrandAction,
    ...HomeAction,
    ...CategoryAction,
    ...ShoppingCartAction,
    ...LoginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

{/* <ScrollView style={dashboardStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.props.productsData && this.props.productsData.length > 0 ?  this.props.productsData.map((item,index) => (
                            <CustomIconInfoButton key={index} onPress={() => {item.Quantity = "1"; onNavigation( "navigation.ismart.ProductDetail", "", this.props.componentId, {productDetails: item, categoryId: item.CatagoryId, type:"Cata",},)} } activeOpacity={0.7} buttonStyle={dashboardStyle.buttonStyle} imageStyle={dashboardStyle.imageStyle} urlImage={item.ProductImage} title1Style={dashboardStyle.title1Style} title2Style={dashboardStyle.title2Style} title1={item.ProductName} title2={item.Description}  />
                        )):null}
                    </ScrollView> */}
{/*<ScrollView style={dashboardStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.props.feedsData && this.props.feedsData.length > 0 ?  this.props.feedsData.map((item,index) => (
                           
                           <View key={index} style={dashboardStyle.plusButtonViewContainer}>
                                <CustomIconInfoButton 
                                key={index} 
                                onPress ={ () => { this.handleNavigationEventForOffer(item); } } 
                                onPlusImagePress={() => { this.handlePlusEvent(item,'offer'); }}
                                activeOpacity={0.7} 
                                buttonStyle={dashboardStyle.buttonStyle} 
                                // plusImageStyle={dashboardStyle.plusImageStyle} 
                                // plusImage={images.plus} 
                                imageStyle={dashboardStyle.imageStyle} 
                                urlImage={item.Product!==null?item.Product.ProductImage:''} 
                                title1Style={dashboardStyle.title1Style} 
                                title2Style={dashboardStyle.title2Style} // title1={item.ProductName} title2={item.Description}  
                                />
                            </View>
                        )):<View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>List is empty!</Text></View>}
                        </ScrollView>*/}

