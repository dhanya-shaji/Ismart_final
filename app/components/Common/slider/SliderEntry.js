import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import { onNavigation} from '../../../config/navigations';
import { Navigation } from "react-native-navigation";
let navigationEvent;
export default class SliderEntry extends Component {

    constructor(props){
        super(props);
        this.state={
            activeComponentId: 'screen_dashboard',

        }
    }
    navigationEvent= Navigation
    .events()
    .registerComponentDidAppearListener(({ componentId }) => {
        if (componentId === "screen_newfeed" || componentId === "screen_profile" || componentId === "screen_manufacture" || componentId === "screen_category" || componentId==="screen_dashboard") {
            this.setState({ activeComponentId: componentId });
        }
    });
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { FeedPhoto,MediaType,FeedVideo,Product }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: MediaType===1?Product.ProductImage :FeedPhoto!==null?FeedPhoto:Product.ProductImage }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: FeedPhoto }}
              style={styles.image}
            />
        );
    }
    handleNavigationEvent=(itemForNavigation)=>{
        itemForNavigation.Quantity = "1"; 
        onNavigation( "navigation.ismart.ProductDetail",itemForNavigation.ProductName, 
        this.state.activeComponentId, 
        {productDetails: itemForNavigation, productId: itemForNavigation.ProductId, categoryId: itemForNavigation.CatagoryId, type:"Cata",},);
    }

    render () {
        const { data: { Title, Description,Product }, even } = this.props;

        const uppercaseTitle = Title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { Title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {this.handleNavigationEvent(Product); }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    {/* <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} /> */}
                </View>
                {/* <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { Description }
                    </Text>
                </View> */}
            </TouchableOpacity>
        );
    }
}