import React, { Component } from 'react'
import { ImageBackground, RefreshControl, FlatList, BackHandler, Image, TouchableOpacity, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { SearchBar, } from 'react-native-elements';
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';

import { categoryStyle } from './CategoryStyle';
import { commonStyle } from '../Common/CommonStyle';
import { CustomIconInfoButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, addCommonListeners, onNavigateToLogin } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

import { Button } from 'react-native-paper';
//Action
import { CategoryAction } from "../../redux/actions/index";
import { Card } from "react-native-elements";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class Category extends Component {

    static propTypes = {
        // prop: PropTypes
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
            spinner: true,
            refreshing: false,
            categoriesData: [],
            filteredCategoriesData: [],
            productsByCategoryData: [],
            filteredProductsByCategoryData: [],
            isCategoryLoaded: 0
        };
        Navigation.events().bindComponent(this);
        // this.props.getAllProductsByCategory();

        this.props.getAllCategories();
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

    navigateToScreen = (screenName) => {
        onNavigation(screenName, "", this.props.componentId, this.prop)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isCategoriesDataLoaded !== this.props.isCategoriesDataLoaded) {
            if (1 === nextProps.isCategoriesDataLoaded) {
                this.setState({
                    spinner: false,
                    refreshing: false,
                    filteredCategoriesData: nextProps.filteredCategoriesData,
                    isCategoryLoaded: 1,
                });

            } else if (2 === nextProps.isCategoriesDataLoaded) {
                this.setState({
                    spinner: false,
                    refreshing: false,
                    filteredCategoriesData: nextProps.filteredCategoriesData,
                    isCategoryLoaded: 2
                });
            }

        }

    }

    updateSearch = search => {
        this.setState({ search });
        console.log("search is", search);
        var arrTemp = '';
        if (search.length > 1) {
            arrTemp = this.props.filteredCategoriesData.filter(function (item) {
                return item.CatagoryName.toUpperCase().includes(search.toUpperCase());
            });
            this.setState({ filteredCategoriesData: arrTemp });
        }
        else {
            arrTemp = this.props.filteredCategoriesData;
            this.setState({ filteredCategoriesData: arrTemp });
        }
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.setState({ filteredCategoriesData: '' });
        this.props.getAllCategories();
    }
    goToCategorySearch = () => {

        onNavigation("navigation.ismart.SearchPageCategory", "Search Here",
            this.props.componentId,
            { searchText: '' });
    };

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={commonStyle.imageBackground} resizeMode='cover' source={images.background}>
                {/* <SearchBar placeholder="Categories" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle} containerStyle={commonStyle.searchBarContainerStyle} /> */}
                <TouchableOpacity onPress={() => this.goToCategorySearch()}>
                    <Button icon="search-web" color={colors.textBlack} mode="text" style={commonStyle.searchBarInputContainerStyle}>
                        Search Categories ..
                    </Button>

                </TouchableOpacity>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />} >
                    <Spinner visible={this.state.spinner} textContent={"Loading..."} textStyle={commonStyle.spinnerStyle} cancelable={true} />
                    {this.state.filteredCategoriesData && this.state.filteredCategoriesData.length > 0 ? this.state.filteredCategoriesData.map((master, masterIndex) => (
                        <View key={masterIndex}>
                             <View style={categoryStyle.headingTextContainer}>
                                <TouchableOpacity onPress={() => {
                                    onNavigation("navigation.ismart.ProductList",
                                        "Product List",
                                        this.props.componentId,
                                        { categoryId: master.CatagoryId, type: "Cata", categoryName: master.CatagoryName })
                                }}
                                >
                                    <Text style={categoryStyle.headingTextStyle}>{master.CatagoryName}</Text>
                                </TouchableOpacity>
                                <Text style={categoryStyle.numberTextStyle}>{master.ProductCount}</Text>
                            </View>
                            <View style={categoryStyle.scrollContainer}>
                                {this.state.isCategoryLoaded === 1 ? 
                                    <FlatList  horizontal
                                data={this.state.filteredCategoriesData[masterIndex].SubCatagory}
                                style={{ borderRadius:20 }}
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <TouchableOpacity
                                        style={{borderRadius:10}}
                                            onPress={() => {
                                                onNavigation("navigation.ismart.ProductList",
                                                    "Product List",
                                                    this.props.componentId,
                                                    { categoryId: rowData.CatagoryId, type: "SubCata", categoryName: rowData.CatagoryName })
                                            }
                                            }>
                                            {/*<Card
                                                activeOpacity={0.7}
                                                imageStyle={categoryStyle.imageStyle}
                                                image={{ uri: rowData.CatagoryImage }}
                                                containerStyle={categoryStyle.buttonStyle}
                                                title1Style={categoryStyle.title1Style}
                                                title2Style={categoryStyle.title2Style}
                                            />*/}
                                             <View style={categoryStyle.buttonStyle}>
                                        <Image style={categoryStyle.imageStyle}
                                         source={{uri:rowData.CatagoryImage}} />
                                    </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            />
                                
                                    
                                 : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.state.isCategoryLoaded === 0 ? 'Loading...' : 'List is empty!'}</Text></View>}
                                    </View>

                            
                        </View>
                    )) : null}


                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({

    filteredCategoriesData: state.category.categoriesData,
    isCategoriesDataLoaded: state.category.isCategoriesDataLoaded,
    productsByCategoryData: state.category.productsByCategoryData,
    filteredProductsByCategoryData: state.category.productsByCategoryData,
    isProductsByCategoryDataLoaded: state.category.isProductsByCategoryDataLoaded,
})

const mapDispatchToProps = {
    ...CategoryAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)

 {/* <View style={categoryStyle.headingTextContainer}>
                                <TouchableOpacity onPress={() => {
                                    onNavigation("navigation.ismart.ProductList",
                                        "Product List",
                                        this.props.componentId,
                                        { categoryId: master.CatagoryId, type: "Cata", categoryName: master.CatagoryName })
                                }}
                                >
                                    <Text style={categoryStyle.headingTextStyle}>{master.CatagoryName}</Text>
                                </TouchableOpacity>
                                <Text style={categoryStyle.numberTextStyle}>{master.ProductCount}</Text>
                            </View>
                            <ScrollView style={categoryStyle.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.state.isCategoryLoaded === 1 ? this.state.filteredCategoriesData[masterIndex].SubCatagory.map((item, index) => (
                                    <CustomIconInfoButton
                                        key={index}
                                        onPress={() => {
                                            onNavigation("navigation.ismart.ProductList",
                                                "Product List",
                                                this.props.componentId,
                                                { categoryId: item.CatagoryId, type: "SubCata", categoryName: item.CatagoryName })
                                        }
                                        }
                                        activeOpacity={0.7}
                                        buttonStyle={categoryStyle.buttonStyle}
                                        imageStyle={categoryStyle.imageStyle}
                                        urlImage={item.CatagoryImage}
                                        title1Style={categoryStyle.title1Style}
                                        title2Style={categoryStyle.title2Style}
                                    // title1={item.Catanpm 
                                    /> //title1={item.CatagoryName} />  title2={item.Description}  />
                                )) : <View style={commonStyle.emptyViewContainerStyle}><Text style={commonStyle.emptyHeadingTextStyle}>{this.state.isCategoryLoaded === 0 ? 'Loading...' : 'List is empty!'}</Text></View>}
                                    </ScrollView>*/}
