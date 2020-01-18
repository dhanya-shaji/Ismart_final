import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { CustomIconInfoButton, PlusMinusButton } from '../Common/index';
import UserAvatar from 'react-native-user-avatar';
// import { RoundedButton, CustomButton } from './index';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import images from '../../resources/images';
import { WebView } from 'react-native-webview';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;



//<UserAvatar size="80" name={item.title} />

export default class NewItem extends Component {

    constructor(props) {
        super(props);
    }

    handlePress = () => {
        this.props.onPress();
    }

    handlePlusImagePress = () => {
        this.props.onPlusImagePress();
    }

    render() {
        const { mainContainer, activeOpacity, buttonStyle, plusImageStyle, plusImage, imageStyle, urlImage, feedData } = this.props;
        return (
            <View style={mainContainer ? mainContainer : styles.mainContainer}>
                {feedData.FeedVideo !== null ?
                    <CustomIconInfoButton
                    onPress={this.handlePress}
                    onPlusImagePress={() => { }}
                    activeOpacity={activeOpacity ? activeOpacity : 1}
                    buttonStyle={buttonStyle ? buttonStyle : styles.buttonStyle}
                    plusImageStyle={plusImageStyle ? plusImageStyle : styles.plusImageStyle}
                    plusImage={plusImage ? plusImage : images.plus}
                    imageStyle={imageStyle ? imageStyle : styles.imageStyle}
                    urlImage={"https://img.youtube.com/vi/"+feedData.FeedVideo+"/0.jpg"}
                />
                   
                    :
                    <CustomIconInfoButton
                        onPress={this.handlePress}
                        onPlusImagePress={() => { }}
                        activeOpacity={activeOpacity ? activeOpacity : 1}
                        buttonStyle={buttonStyle ? buttonStyle : styles.buttonStyle}
                        plusImageStyle={plusImageStyle ? plusImageStyle : styles.plusImageStyle}
                        plusImage={plusImage ? plusImage : images.plus}
                        imageStyle={imageStyle ? imageStyle : styles.imageStyle}
                        urlImage={urlImage}
                    />

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        height: 150,
        width: "95%",
        marginRight: "5%",
        marginTop: 8,
        marginBottom: 8,
    },
    buttonStyle: {
        width: "93%",
        height: "85%",
        alignSelf: "center",
        // justifyContent:"center",
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        resizeMode: 'stretch'
    },
    plusImageStyle: {
        marginTop: -8,
        marginLeft: deviceWidth - 80,
        height: 32,
        width: 0,
        position: "absolute",
        display: 'none'
    },

})