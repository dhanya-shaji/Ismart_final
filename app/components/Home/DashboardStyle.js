import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';
import { Platform} from "react-native";
export const dashboardStyle=StyleSheet.create({

    mainContainer:{
        flex:1, 
        marginTop:45, 
        // backgroundColor:colors.lightGrey
    },
    imageBackground: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        marginTop:45,
    },
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    shoppingButtonStyle:{
        height:"90%",
        width:100,
        marginRight:"5%",
        marginTop:10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.lightBrown,
    },
    shoppingButtonTextStyle:{
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
        textAlign:"center",
        alignSelf:"center",
    },
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginLeft:"5%",
        marginTop:10,
        fontSize: 15,
    },
    title1Style:{ 
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginTop:3,
        marginLeft:5,
        color:colors.black, 
    },
    title2Style:{ 
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginLeft:5,
        color:colors.darkGrey,
    },
    imageStyle:{
        margin:0, 
        // height:80, 
        // width:110,
        // margin:5,
        height:'100%',
        width:'100%',
        borderRadius:15,
        resizeMode:'stretch',
    }, 
    plusImageStyle:{
       resizeMode:'stretch',
       width:10,
       height:10,
       padding:5,
       backgroundColor:'red'
    },
    bannerImageStyle:{ 
        marginTop:15, 
        alignSelf:"center", 
        width: "90%",  
    },
    plusButtonViewContainer:{ 
        height:90, 
        width:90, 
        backgroundColor:colors.whitesmoke, 
       marginVertical:3,
        marginRight:5,
        borderRadius:8,
    },
    buttonStyle:{
        height:60,
        width:70,
        borderRadius:8,
        marginVertical:5,
        marginRight:5, 
        
        backgroundColor:colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: Platform.OS==='ios'?0.3:0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingLeft:"5%",  
        marginTop:15,
       
        // shadowColor: '#000',
        // shadowOffset: { width: 10, height: 10 },
        // shadowOpacity: 0.8,
        // shadowRadius: 10,
        // elevation: 10,
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