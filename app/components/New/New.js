import React, { Component } from 'react'
import { ImageBackground, RefreshControl, Linking, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar, } from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { newStyle } from './NewStyle';
import { commonStyle } from '../Common/CommonStyle';
import NewItem from './NewItem';
import { CustomIconInfoButton, CustomButton } from '../Common/index';

import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigateToLogin } from '../../config/navigations';

//Action
import { CategoryAction, BrandAction, HomeAction, } from "../../redux/actions/index";

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class New extends Component {

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
            icon: images.menu_white,
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
    this.props.notificationCount({
                type:'dec'
            });
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
    // this.backHandler.remove()
  }

  // handleBackPress = () => {
  //   // this.goBack(); // works best when the goBack is async
  //   onNavigation( "navigation.ismart.Dashboard", "", 
  //   this.props.componentId, 
  //   {});
  //   return true;
  // }

  navigateToScreen = (screenName) => {
    onNavigation(screenName, "", this.props.componentId, this.prop)
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.feedsData !== this.props.feedsData) {
      if (nextProps.feedsData && nextProps.feedsData.length > 0) {
        // alert("got data");
        this.setState({
          spinner: false,
          refreshing: false,
          feedsData: nextProps.feedsData
        });

      }
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getAllFeeds();
  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      spinner: false,
      refreshing: true,

    };
    Navigation.events().bindComponent(this);
    this.props.getAllFeeds();
  }

  onCustomPress = () => {

  }

  handleNavigationEvent = (itemForNavigation) => {
    if (itemForNavigation.FeedVideo !== null) {
      Linking.openURL("https://www.youtube.com/watch?v="+itemForNavigation.FeedVideo);
    } else {
      itemForNavigation.Product.Quantity = "1";
      onNavigation("navigation.ismart.ProductDetail", "",
        this.props.componentId,
        { productDetails: itemForNavigation.Product, productId: itemForNavigation.Product.ProductId, categoryId: itemForNavigation.Product.CatagoryId, type: "Cata", });

    }
  }

  handlePlusEvent = (itemToAdd) => {
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

  updateSearch = search => {
    this.setState({ search });
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getAllProducts();
  }

  render() {
    const { search } = this.state;
    return (
      <ImageBackground style={commonStyle.imageBackground} resizeMode='cover' source={images.background}>
        {/* <SearchBar placeholder="Search new products" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} /> */}
        <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
        <View style={newStyle.headingTextContainer}>
          <Text style={newStyle.headingTextStyle}>New in stock </Text>
          {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onLogoutPress} title1Style={newStyle.logoutButtonTextStyle} buttonStyle={newStyle.logoutButtonStyle} title1="LOGOUT" /> */}
        </View>

        <ScrollView style={commonStyle.scrollContainer}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />} >
          {this.props.feedsData && this.props.feedsData.length > 0 ? this.props.feedsData.map((item, index) => (
            <NewItem
              key={index}
              onPress={() => { this.handleNavigationEvent(item); }}
              onPlusImagePress={() => { this.handlePlusEvent(item); }}
              urlImage={item.FeedPhoto !== null ? item.FeedPhoto : item.Product.ProductImage}
              feedData={item}
            />
          )) : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>List is empty!</Text></View>}
        </ScrollView>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
  feedsData: state.home.feedsData,
  isFeedsLoaded: state.home.isFeedsLoaded,
  productsData: state.category.productsData,
  filteredProductsData: state.category.productsData,
  isProductsDataLoaded: state.category.isProductsDataLoaded,
})

const mapDispatchToProps = {

  ...CategoryAction,
  ...BrandAction,
  ...HomeAction

}

export default connect(mapStateToProps, mapDispatchToProps)(New)


    // onLogoutPress=()=>{
    //     try {
    //         AsyncStorage.setItem('isCustomerLoggedIn', 'false');
    //         AsyncStorage.setItem('CustomerData', null);
    //       } catch (e) {
    //         // saving error
    //         console.log("error is ", e);
    //       }
    //     onNavigateToLogin();
    // }