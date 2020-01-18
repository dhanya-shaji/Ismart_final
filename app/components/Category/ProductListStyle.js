import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

export const productListStyle=StyleSheet.create({

    
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        fontWeight:'bold',
        marginLeft:"5%",
        marginTop:0,
    },
    numberTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        marginRight:"5%",
        marginTop:10,
    },
    sortButtonStyle:{
        height:"100%",
        width:80,
        marginLeft:"5%",
        flexDirection:"row-reverse",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.gold,
    },
    sortButtonTextStyle:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.montserrat,
        color:colors.white,
    },
    sortButtonImageStyle:{
        height:16,
        width:16,
        marginLeft:5,
    },
    title1Style:{ 
        fontSize:fontSize.xsmall,
        fontFamily:fontFamily.montserrat,
        marginTop:3,
        marginLeft:5,
        color:colors.black, 
        backgroundColor:colors.white
    },

    
    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingLeft:"5%",  
        marginTop:15,
    },
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:10,
    },
    
    
});