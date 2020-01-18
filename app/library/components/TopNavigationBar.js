import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EventRegister } from 'react-native-event-listeners'
import { Navigation } from "react-native-navigation";
import Spinner from "react-native-loading-spinner-overlay";


// import commonStyles from '../../resources/styles';
import { commonStyle } from '../../components/Common/CommonStyle';
import { CustomIconInfoButton, } from '../../components/Common/index';
import { onNavigation, ShowSideDrawer } from '../../config/navigations';

import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';

//Action
import { ShoppingCartAction, OrderAction } from "../../redux/actions/index";

//Third Party 



const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const filePickerOptions = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
let navigationEvent;
class TopNavigationBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cartItemsCount: '',
            shoppingCartData: [],
            uploadImage: '',
            uploadImageId: 0,
            tempUploadImage: '',
            activeComponentId: '',
            spinner: false,


        };


        navigationEvent = Navigation
            .events()
            .registerComponentDidAppearListener(({ componentId }) => {
                if (componentId === "screen_newfeed" || componentId === "screen_profile" || componentId === "screen_manufacture" || componentId === "screen_category" || componentId === "screen_dashboard") {
                    this.setState({ activeComponentId: componentId });
                }
            });

    }







    onDrawerPress = () => {
        ShowSideDrawer(this.props.componentId);
    }



    onCartPress = () => {
        // EventRegister.emit('gotoShoppingCart', 'it works!!!');
        onNavigation("navigation.ismart.ShoppingCart", "Checkout Here", this.state.activeComponentId, {})
    }
    onLogoutPress = () => {
        // EventRegister.emit('logoutFromApp', 'it works!!!');
    }

    onCameraPress = () => {

        onNavigation("navigation.ismart.ShoppingCart", "Checkout Here", this.state.activeComponentId, {

            pageSource: "imageupload",
        })

    }

    onCustomPress=()=>{
        onNavigation("navigation.ismart.New", "Notifications", this.state.activeComponentId, {}) 
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('updateShoppingCartItemsCount', (count) => {
            // var totalItems = this.getTotalItems();
            this.setState({ cartItemsCount: count });
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return (
            <View style={styles.topNavigationBarStyle}>

                <View style={styles.leftButtonsContainer}>
                    <Image style={styles.imageStyle} source={images.ismart_logo} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: 120,  }}>
                    <View>
                        <CustomIconInfoButton
                            activeOpacity={0.7}
                            onPress={this.onCameraPress}
                            imageStyle={styles.barButtonImageStyle}
                            buttonStyle={styles.barButtonStyle}
                            iconPath={images.camera} />
                    </View>
                    <View>
                        <Text style={styles.notificationCountStyle} >{this.props.notificationCount === 0 ? '' : this.props.notificationCount}</Text>
                        <CustomIconInfoButton
                            activeOpacity={0.7}
                            onPress={this.onCustomPress}
                            imageStyle={styles.barButtonImageStyle}
                            buttonStyle={styles.barButtonStyle}
                            iconPath={images.notification} />
                    </View>
                    <View>
                    <Text style={styles.cartNoTextStyle} >{this.state.cartItemsCount}</Text>
                        <CustomIconInfoButton 
                        activeOpacity={0.7}
                         onPress={this.onCartPress} 
                         imageStyle={styles.barButtonImageStyle} 
                         buttonStyle={styles.cartButtonStyle}
                          iconPath={images.shopping_cart} />
                    </View>
                </View>
                {/*<View style={styles.rightButtonsContainer}>
                    <CustomIconInfoButton
                     activeOpacity={0.7}
                      onPress={this.onCameraPress} 
                      imageStyle={styles.barButtonImageStyle}
                       buttonStyle={styles.barButtonStyle} 
                       iconPath={images.camera} />
                    <View style={styles.cartButtonViewContainerStyle}>
                    <Text style={styles.notificationCountStyle} >{this.props.notificationCount===0?'':this.props.notificationCount}</Text>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} imageStyle={styles.barButtonImageStyle} buttonStyle={styles.barButtonStyle} iconPath={images.notification} />
                    </View>
                    <View style={styles.cartButtonViewContainerStyle}>
                        <Text style={styles.cartNoTextStyle} >{this.state.cartItemsCount}</Text>
                        <CustomIconInfoButton 
                        activeOpacity={0.7} 
                        onPress={this.onCartPress} 
                        imageStyle={styles.barButtonImageStyle}
                         buttonStyle={styles.cartButtonStyle} 
                         iconPath={images.shopping_cart} />
                    </View>
        </View>*/}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    // productsData: state.category.productsData,
    // isProductsDataLoaded: state.category.isProductsDataLoaded,
    shoppingCartData: state.shoppingcart.shoppingCartData,
    uploadImageId: state.order.uploadImageId,
    isAttachmentPicUploadSucess: state.order.isAttachmentPicUploadSucess,
    uploadErrorMessage: state.order.uploadErrorMessage,
    notificationCount:state.home.notificationCount
})

const mapDispatchToProps = {
    // ...CategoryAction,
    ...ShoppingCartAction,
    ...OrderAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigationBar)
// export default TopNavigationBar;

const styles = StyleSheet.create({

    topNavigationBarStyle: {
        backgroundColor: colors.navigationBarBlue,
        width: '100%',
        height: 64,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "40%",
        // backgroundColor:colors.red,
    },
    rightButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        width: "30%",
        // backgroundColor:colors.red,
    },
    barButtonImageStyle: {
        height: 24,
        width: 24,
    },
    barButtonStyle: {
        height: "100%",
        width: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 8,
        // backgroundColor:colors.red,
    },
    cartButtonViewContainerStyle: {
        height: "100%",
        width: 30,
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 8,
        // backgroundColor:colors.red,
    },
    cartButtonStyle: {
        height: "100%",
        width: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        // marginRight:8,
        // backgroundColor:colors.red,
    },
    imageStyle: {
        marginTop: 0,
        height: 40,
        width: 100,
        // backgroundColor:colors.white
    },
    cartNoTextStyle: {
        position: "absolute",
        marginTop: 6,
        paddingLeft: 3,
        fontSize: fontSize.small,
        fontWeight: "bold",
        color: colors.white,
    },
    notificationCountStyle:{
        position: "absolute",
        marginTop: 5,
        fontSize: fontSize.small,
        fontWeight: "bold",
        color: colors.red,

       
    }
})

