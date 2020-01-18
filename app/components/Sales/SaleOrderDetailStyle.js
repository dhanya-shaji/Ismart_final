import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

export const orderDetailStyle=StyleSheet.create({
    
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"center",
        width:"90%",
        marginTop:15,
    },
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.small, 
        fontFamily:fontFamily.montserrat,
        marginLeft:"2%",
        marginTop:0,
    },
    subHeadingTextStyle:{
        color:colors.darkGrey, 
        // color:colors.white,
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        width:200,
        marginLeft:"2%",
        marginTop:0,
    },

    textInputContainerStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:"100%",
        width:"43%",
        backgroundColor:'white',
        borderColor:colors.mediumGrey,
        borderWidth:1,
    },

    dropdownButtonStyle:{
        height:"100%",
        width:"43%",
        // marginLeft:10,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:colors.searchBarGrey,
    },
    
    attachButtonStyle:{
        height:"100%",
        width:"10%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:colors.gold,
    },

    attachButtonImageStyle:{
        height:24,
        width:24,
    },  

    dropdownButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey,
        marginRight:65,
    },
    dropdownButtonImageStyle:{
        height:16,
        width:16,
        marginRight:8,
    },

    processingButtonStyle:{
        height:30,
        width:75,
        // marginRight:"5%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-start",
        backgroundColor:colors.lightBrown,
    },
    processingButtonTextStyle:{
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
        textAlign:"center",
        alignSelf:"center",
    },

    tableContainer1:{
        // height:300, 
        width:"95%",
        alignSelf:"center",
        marginRight:"5%",
        marginTop:10,
        marginBottom:10,
        padding:10,
        backgroundColor:colors.white,
    },
    tableContainer2: { 
        flex: 1, 
        padding: 0, 
        paddingTop: 0, 
        backgroundColor: colors.white, 
        borderColor:colors.white, 
        borderWidth:1  
    },
    tableBorderStyle:{
        borderWidth: 2, 
        borderColor:colors.white
    },
    tableHeadingStyle:{ 
        height: 40, 
        backgroundColor:colors.mediumGrey,  
    },
    tableHeadingTextStyle: { 
        marginLeft:5, 
        fontSize:fontSize.xsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.darkGrey,
    },
    entryStyle: {
        backgroundColor:colors.lightGrey
    },
    entryTextStyle: { 
        padding:5, 
        fontSize: fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        color:colors.darkGrey, 
        backgroundColor:colors.lightGrey
    },

    cartInfoContainer:{
        height:110, 
        width:"90%",
        alignSelf:"center",
        marginTop:8,
        marginBottom:8,
        // borderTopColor:colors.lightGrey,
        // borderTopWidth:1,
        backgroundColor:colors.white,
    },
    statusButtonsContainer:{
        width:"95%", 
        height:40, 
        marginTop:10, 
        alignSelf:"center", 
        alignItems:"center", 
        flexDirection:"row", 
        justifyContent:"space-between", 
    },
    checkoutButtonStyle:{
        width:"95%",
        height:30,
        marginTop:8,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.navigationBarBlue,
    },
    
    cartButtonTextStyle:{
        fontSize:fontSize.small,
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
    avatarContainer:{
        marginBottom:15, 
        alignItems:"flex-start",
        // backgroundColor:colors.lightBrown,
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