import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

export const newStyle=StyleSheet.create({

    
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginTop:15,
    },
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        marginLeft:"5%",
        marginTop:0,
    },
    subHeadingTextStyle:{
        color:colors.darkGrey, 
        fontSize:fontSize.xsmall, 
        fontFamily:fontFamily.montserrat,
        width:200,
        marginLeft:"5%",
        marginTop:0,
    },

    logoutButtonStyle:{
        height:"100%",
        width:100,
        marginRight:"5%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.lightBrown,
    },
    logoutButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
        textAlign:"center",
        alignSelf:"center",
    },
    cartInfoContainer:{
        height:130, 
        marginTop:5,
        borderTopColor:colors.lightGrey,
        borderTopWidth:1,
        backgroundColor:colors.white,
    },
    checkoutButtonStyle:{
        width:"80%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.navigationBarBlue,
    },
    notesButtonStyle:{
        width:"20%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.searchBarGrey,
    },
    notesImageStyle:{
        marginTop:50, 
        height:24, 
        width:24,
    },
    cartButtonTextStyle:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.montserrat,
        color:colors.white,         
    },

    title1TextStyle:{
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
    },
    amountTextStyle:{
        fontSize:fontSize.xxLarge,
        fontFamily:fontFamily.montserrat,
        color:colors.navigationBarBlue,
        marginBottom:8,
    },
    textInfoContainer:{
        height:50, 
        marginTop:10,
        width:"90%",
        alignSelf:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        // backgroundColor:colors.red,
    },
    cartButtonsContainer:{
        height:50, 
        width:"90%",
        alignSelf:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        // backgroundColor:colors.red,
    },
    amountContainer:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
    },

    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingLeft:"5%",  
        marginTop:15,
    },

    
    
});