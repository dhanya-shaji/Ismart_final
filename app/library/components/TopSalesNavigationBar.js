import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserAvatar from 'react-native-user-avatar';
import { EventRegister } from 'react-native-event-listeners'
import AsyncStorage from '@react-native-community/async-storage';

// import commonStyles from '../../resources/styles';
 import {commonStyle} from '../../components/Common/CommonStyle';
import { CustomIconInfoButton, } from '../../components/Common/index';
import { onNavigation, ShowSideDrawer } from '../../config/navigations';

import images from '../../resources/images';
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

//Action
// import { ShoppingCartAction } from "../../redux/actions/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

 class TopSalesNavigationBar extends Component {

    static propTypes = {
        prop: PropTypes
    }

    constructor(props) {
        super(props);
        this.state = {
            salesmanData:'',
            loggedSalesman:'',
            salesmanName:'',
        };
        this.fetchSalesmanData();
    }

    fetchSalesmanData = async () => {
        try {
          const value = await AsyncStorage.getItem('SalesmanData');
          if (value !== null) {
              this.setState({ loggedSalesman: JSON.parse(value) });
            }
            console.log(" Nav bar SalesmanData is",this.state.loggedSalesman); 
          
        } catch(e) {
          // error reading value
          console.log("error is ", e);
        }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('updateSalesmanData', (salesmanData) => {
            
            this.setState({ salesmanName: salesmanData.Name }); 
            console.log("updateSalesmanData is", salesmanData);
            console.log("this.state.salesmanData is", this.state.salesmanData)
            // alert(this.state.salesmanData.Name);
        });
    }

    onCustomPress=()=>{

    }

    onDrawerPress=()=>{
        ShowSideDrawer(this.props.componentId);
    }

    
    onLogoutPress=()=>{
        EventRegister.emit('logoutFromApp', 'it works!!!');
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return (
            <View style={styles.topNavigationBarStyle}>
                {/* <Text style={{fontSize:fontSize.large, color:colors.white, alignSelf:"center"}}>Test</Text> */}
                <View style={styles.leftButtonsContainer}>
                    {/* <CustomIconInfoButton activeOpacity={0.7} onPress={this.onDrawerPress} imageStyle={styles.barButtonImageStyle} buttonStyle={[styles.barButtonStyle,{marginLeft:0,}]} iconPath={images.menu_white} /> */}
                    <Image style={ styles.imageStyle} source={images.ismart_logo}/>
                </View>
                <View style={styles.rightButtonsContainer}>
                    <Text numberOfLines={1} style={styles.nameTextStyle}>Hi {this.state.loggedSalesman.Name}</Text>
                    <View style={{marginRight:8,}}><UserAvatar  name="Pr" size="40" src={this.state.loggedSalesman.StaffImage} /></View>                    
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
   
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TopSalesNavigationBar)
// export default TopNavigationBar;

const styles = StyleSheet.create({

    topNavigationBarStyle:{
        backgroundColor: colors.navigationBarBlue, 
        width:"100%", 
        height:64, 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems: "center",
    },
    leftButtonsContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start", 
        height:"100%",  
        width:"34%", 
        // backgroundColor:colors.red,
    },
    rightButtonsContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-end", 
        height:"100%",  
        width:"40%", 
        // backgroundColor:colors.red,
    },
    barButtonImageStyle:{
        height:24,
        width:24,
    },  
    barButtonStyle:{
        height:"100%",
        width:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-end",
        marginRight:8,
        // backgroundColor:colors.red,
    },
    cartButtonViewContainerStyle:{
        height:"100%", 
        width:30, 
        alignItems:"center", 
        alignSelf:"flex-end", 
        marginRight:8, 
        // backgroundColor:colors.red,
    },
    cartButtonStyle:{
        height:"100%",
        width:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-end",
        // marginRight:8,
        // backgroundColor:colors.red,
    },
    imageStyle:{
        marginTop:0, 
        height:30, 
        width:90,
    },
    nameTextStyle:{ 
        fontFamily:fontFamily.montserrat,
        fontSize:fontSize.small,
        fontWeight:"bold",
        marginRight:8,
        color:colors.white, 
        alignSelf:"center",
    },
    cartNoTextStyle:{ 
        position:"absolute",
        marginTop:6,
        paddingLeft:3,
        fontSize:fontSize.small,
        fontWeight:"bold",
        color:colors.white, 
    },
})

