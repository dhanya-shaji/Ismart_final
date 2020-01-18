import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

export const productDetailStyle=StyleSheet.create({

    
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        marginLeft:"5%",
        marginTop:10,
        marginRight:4,
        fontWeight:'bold'
    },
    subHeadingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.xsmall, 
        fontFamily:fontFamily.montserrat,
        marginLeft:"5%",
        marginTop:2,
    },
    productImageStyle:{
        width:"95%",
        height:"100%",
        backgroundColor:colors.white,
        margin:10,
        resizeMode:'contain'
    },
    imageStyle:{
        margin:5, 
        height:100, 
        width:100,
    },
    subContainer:{
        flexDirection:"column",
        width:"100%", 
        height:250, 
        marginTop:10,
        marginBottom:10,
    },
    cartButtonsContainer:{
        flexDirection:"row",
        justifyContent:"space-between", 
        width:"100%", 
        height:50, 
        marginTop:10,
    },
    cartButtonStyle:{
        width:"100%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.navigationBarBlue,
    },
    cartButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.white,         
    },
    rightContainer:{ 
        // width:"50%",  
        flex:2,
        justifyContent:"flex-end",
        alignItems:"flex-end",
        backgroundColor:colors.white, 
    },
    plusMinusButtonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:40,
        width:90,
        borderColor:colors.mediumGrey,
        borderWidth:1,
        marginRight:15,
    },
    discountTextStyle: {
        color:colors.blue,
        fontSize:fontSize.large,
        fontFamily:fontFamily.montserrat,
        // marginLeft:15,
    },
    markedPriceTextStyle: {
        color:colors.darkGrey,
        fontSize:fontSize.large,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
    },
    priceStyle:{
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start",
        marginTop:8,
        marginBottom:3,
        marginLeft:13,
    },
    specificationTextStyle: {
        color:colors.black,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
    },
    descriptionTextStyle: {
        color:colors.black,
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginLeft:15,
        marginRight:15,
        marginTop:15,
        marginBottom:15,
    },


    title1Style:{ 
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginTop:3,
        marginLeft:5,
        color:colors.black, 
    },
    title2Style:{ 
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        marginLeft:5,
        color:colors.darkGrey,
    },
    
    buttonStyle:{
        marginTop:10, 
        marginRight:10, 
        marginBottom:10, 
        backgroundColor:colors.white,
        height:120,
    },
    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingLeft:"5%",  
        marginTop:15
    },
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    
    buttonTextStyle:{
        color:colors.white, 
        fontSize:fontSize.medium, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold'
    },

    textStyle:{
        borderBottomColor:colors.blue,
        borderBottomWidth:2,
        fontSize:fontSize.xLarge,
        fontFamily:fontFamily.montserrat,
        marginBottom:5,
    },
    
});