import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

export const saleOrdersListStyle=StyleSheet.create({

    button1Style:{
        width:"40%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.navigationBarBlue,
    },
    button1TextStyle:{
        fontSize:fontsize.xsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
    },
    button2Style:{
        width:"40%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.mediumGrey,
    },
    button2TextStyle:{
        fontSize:fontsize.xsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.red,
    },

    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        marginLeft:"5%",
        marginTop:15,
    },
    numberTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        marginRight:"5%",
        marginTop:10,
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
    imageStyle:{
        marginTop:0, 
        height:90, 
        width:120,
    },
   
    buttonStyle:{
        marginTop:10, 
        marginRight:10, 
        marginBottom:10, 
        backgroundColor:colors.white,
    },
    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingLeft:"5%",  
        paddingTop:"5%",
        paddingBottom:"5%",
        marginTop:15,
    },
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    newButtonStyle:{
        height:"100%",
        width:80,
        marginRight:"5%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.lightBlue,
    },
    newButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.white,
    },
    newButtonImageStyle:{
        height:16,
        width:16,
        marginRight:5,
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