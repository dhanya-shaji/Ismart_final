import React, { Component } from 'react'
import { ImageBackground, Image, BackHandler, ScrollView, View, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchBar,  } from 'react-native-elements';

import { messageStyle } from './MessageStyle';
import { commonStyle} from '../Common/CommonStyle';
import MessageItem from './MessageItem';
import { CustomIconInfoButton, CustomButton } from '../Common/index';
import { Navigation } from "react-native-navigation";
import { onNavigation, } from '../../config/navigations';

import colors from '../../resources/colors';
import images from "../../resources/images";
import fontSize from '../../resources/fontSize';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export class Message extends Component {
    
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

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            messagesData: [{ title:'C1', time:"12:57", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },
                           { title:'C2', time:"10:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', }, 
                           { title:'C3', time:"08:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },  
                           { title:'C4', time:"09:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },
                           { title:'C5', time:"11:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },
                           { title:'C6', time:"04:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },
                           { title:'C7', time:"10:34", IDTitle:"Customer Id:", IDInfo:"CWCTKL0030", address:'The Mobile Store, Opp. Baby hospital', message:'The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product. The quick brown fox jumps over the lazy dog. This is an extremely good product.', },                             
                            ],  
        };
        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
      // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }
  componentWillUnmount() {
      // this.backHandler.remove()
    }

   
    onCustomPress=()=>{

    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <ImageBackground style={ commonStyle.imageBackground } resizeMode='cover' source={images.background}>
                <SearchBar placeholder="Search message" onChangeText={this.updateSearch} value={search} autoCorrect={false} inputContainerStyle={commonStyle.searchBarInputContainerStyle } containerStyle={commonStyle.searchBarContainerStyle} />
                <View style={messageStyle.headingTextContainer}>
                    <Text style={messageStyle.headingTextStyle}>Message </Text>
                    <CustomIconInfoButton activeOpacity={0.7} onPress={this.onCustomPress} title1Style={messageStyle.composeButtonTextStyle} buttonStyle={messageStyle.composeButtonStyle} title1="COMPOSE" />
                </View>

                <ScrollView style={commonStyle.scrollContainer} >
                    {this.state.messagesData && this.state.messagesData.length > 0 ?  this.state.messagesData.map((item,index) => (
                    <MessageItem key={index} onPress={this.onCustomPress} time={item.time} title={item.title} IDTitle={item.IDTitle} IDInfo={item.IDInfo} address={item.address} message={item.message} />                        
                    )):null}
                </ScrollView>                 
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
