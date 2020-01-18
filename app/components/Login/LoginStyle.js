import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const loginStyle=StyleSheet.create({

    mainContainer:{
        flex:1,   
    },
    imageBackground: { 
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    buttonsContainer:{
        marginTop:8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"center",
        height:45,
        width:100,  
    },
    loginInputContainerStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:40,
        width:200,
        marginTop:deviceHeight/2-70,
        backgroundColor:'white',
        borderRadius:20,
        borderColor:colors.mediumGrey,
        borderWidth:1,
    },
    passwordInputContainerStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:40,
        width:200,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:20,
        borderColor:colors.mediumGrey,
        borderWidth:1,
    },
    submitButtonStyle: {
        backgroundColor:colors.lightRed, 
        flexDirection:'row', 
        height:40, 
        width:200, 
        borderRadius:20, 
        marginTop:10,  
        alignSelf:'center', 
        justifyContent:"center", 
        alignItems:'center'
    },
    submitButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        fontWeight:"bold",
        color:colors.white, 
    },
    iconButtonStyle:{
        width:"48%",
        height:"100%", 
        justifyContent:'center', 
        alignItems:'center', 
        // backgroundColor:colors.blue,
        // borderColor:colors.darkGrey,
        // borderWidth:1,
    },
    title1Style:{ 
        fontSize:fontSize.xxsmall,
        fontFamily:fontFamily.montserrat,
        color:colors.mediumGrey, 
    },
    imageStyle:{
        marginTop:50, 
        height:24, 
        width:24,
    },

    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        marginLeft:"5%",
        marginTop:10,
    },   

    textStyle:{
        borderBottomColor:colors.blue,
        borderBottomWidth:2,
        fontSize:fontSize.xLarge,
        fontFamily:fontFamily.montserrat,
        marginBottom:5,
    },
    
});