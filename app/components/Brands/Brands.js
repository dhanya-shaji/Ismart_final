import React, { Component } from 'react'
import { ImageBackground, RefreshControl, FlatList, BackHandler, Image, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar, } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { brandsStyle } from './BrandsStyle';
import { commonStyle } from '../Common/CommonStyle';
import { CustomIconInfoButton } from '../Common/index';

import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigateToLogin } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

//Action
import { BrandAction } from "../../redux/actions/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class Brands extends Component {

    static propTypes = {

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
                        icon: images.menu_white,
                    }
                ],
            }
        };
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'SideDrawer') {
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


    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinner: false,
            refreshing: false,
            brandsData: [],
            filteredBrandsData: [],
        };
        // console.log('brands data is');
        // console.log(this.state.brandsData);
        Navigation.events().bindComponent(this);
        this.props.getAllManufacturers();
    }

    componentDidMount() {
        addCommonListeners(this);
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        // this.backHandler.remove()
    }




    componentWillReceiveProps(nextProps) {
        if (nextProps.isBrandsLoaded !== this.props.isBrandsLoaded) {
            if (1 === nextProps.isBrandsLoaded || 2 === nextProps.isBrandsLoaded) {
                this.setState({ spinner: false });
                this.setState({ refreshing: false });
            }
        }
        if (nextProps.filteredBrandsData !== this.props.filteredBrandsData) {
            if (nextProps.filteredBrandsData && nextProps.filteredBrandsData.length > 0) {
                this.setState({ filteredBrandsData: nextProps.filteredBrandsData });
            }
        }
    }

    onCustomPress = () => {

    }

    navigateToScreen = (screenName) => {
        onNavigation(screenName, "", this.props.componentId, this.prop)
    }

    _renderItem = (data, index) => (
        <CustomIconInfoButton key={index} onPress={() => {
            onNavigation("navigation.ismart.ProductList",
                "Product List", this.props.componentId,
                { categoryId: data.ManufactureId, type: "Manu", categoryName: data.ManufactureName })
        }}
            activeOpacity={0.7} buttonStyle={brandsStyle.buttonStyle} imageStyle={brandsStyle.imageStyle} urlImage={data.ManufactureImage} />
    );

    updateSearch = search => {
        this.setState({ search });
        console.log("search is", search);
        var arrTemp = '';
        if (search.length > 1) {
            arrTemp = this.props.filteredBrandsData.filter(function (item) {
                return item.ManufactureName.toUpperCase().includes(search.toUpperCase());
            });
            this.setState({ filteredBrandsData: arrTemp });
        }
        else {
            arrTemp = this.props.filteredBrandsData;
            this.setState({ filteredBrandsData: arrTemp });
        }
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.props.getAllManufacturers();
    }

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={commonStyle.imageBackground} resizeMode='cover' source={images.background}>
                <SearchBar placeholder="Manufacturers" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle} containerStyle={commonStyle.searchBarContainerStyle} />
                <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                <View style={brandsStyle.headingTextContainer}>
                    <Text style={brandsStyle.headingTextStyle}>Our Manufacturers</Text>
                    <Text style={brandsStyle.numberTextStyle}>{this.props.brandsData.length}</Text>
                </View>

                <ScrollView contentContainerStyle={brandsStyle.scrollContainer}
                showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} />} >
                    {/* <Grid
                        renderItem={this._renderItem}
                        // data={this.state.brandsData}
                        data={this.props.isBrandsLoaded===1 ? this.state.filteredBrandsData : []}                        
                        numColumns={4}
                    />         
                   */}

                    <FlatList
                         showsVerticalScrollIndicator={false}
                        data={this.props.isBrandsLoaded===1 ?this.state.filteredBrandsData:[]}
                        renderItem={({ item: rowData }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        onNavigation("navigation.ismart.ProductList",
                                            "Product List",
                                            this.props.componentId,
                                            {
                                                categoryId: rowData.ManufactureId,
                                                type: "Manu",
                                                categoryName: rowData.ManufactureName
                                            })
                                    }}

                                >
                                    <View style={brandsStyle.buttonStyle}>
                                        <Image style={brandsStyle.imageStyle}
                                         source={{uri:rowData.ManufactureImage}} />
                                    </View>
                                </TouchableOpacity>

                            );
                        }}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{width:15}}></View>
                </ScrollView>
                
            </ImageBackground> 
        )
    }
}

const mapStateToProps = (state) => ({
    brandsData: state.brand.manufacturersData,
    filteredBrandsData: state.brand.manufacturersData,
    isBrandsLoaded: state.brand.isManufacturersLoaded,
})

const mapDispatchToProps = {
    ...BrandAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands)


// brandsData: [   { title1: 'Apple',  BrandImage: images.apple}, 
            //                 { title1: 'Jio',  BrandImage: images.jio},
            //                 { title1: 'lg',  BrandImage: images.lg},
            //                 { title1: 'wipro',  BrandImage: images.wipro}, 
            //                 { title1: 'htc',  BrandImage: images.htc},
            //                 { title1: 'oppo',  BrandImage: images.oppo},
            //                 { title1: 'fifa',  BrandImage: images.fifa},
            //                 { title1: 'Apple',  BrandImage: images.apple}, 
            //                 { title1: 'Jio',  BrandImage: images.jio},
            //                 { title1: 'lg',  BrandImage: images.lg},
            //                 { title1: 'wipro',  BrandImage: images.wipro}, 
            //                 { title1: 'htc',  BrandImage: images.htc},
            //                 { title1: 'oppo',  BrandImage: images.oppo},
            //                 { title1: 'fifa',  BrandImage: images.fifa},
            //                 { title1: 'Apple',  BrandImage: images.apple}, 
            //                 { title1: 'Jio',  BrandImage: images.jio},
            //                 { title1: 'lg',  BrandImage: images.lg},
            //                 { title1: 'wipro',  BrandImage: images.wipro}, 
            //                 { title1: 'htc',  BrandImage: images.htc},
            //                 { title1: 'oppo',  BrandImage: images.oppo},
            //                 { title1: 'fifa',  BrandImage: images.fifa},
            //                 ],

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
