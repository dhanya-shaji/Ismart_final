import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';


export const categoryStyle=StyleSheet.create({

    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginLeft:"5%",
        marginTop:10, 
    },
    numberTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginRight:"5%",
        marginTop:10,
    },
    title1Style:{ 
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginTop:3,
        marginLeft:5,
        color:colors.lightRed, 
    },
    title2Style:{ 
        fontSize:fontSize.xxsmall, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginLeft:5,
        color:colors.darkGrey,
    },
    imageStyle:{
       
        // height:120, 
        // width:120,
        height:"100%", 
        width:"100%",
        borderRadius:10, 
        alignSelf:"center",
        resizeMode:'stretch',
    },

    buttonStyle:{
        // height:"100%",
        height:90,
        width:90,
        marginTop:10, 
        marginRight:10, 
        marginBottom:10, 
        backgroundColor:colors.black,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        borderRadius:10
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