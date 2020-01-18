import { StyleSheet } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';
import {Platform } from 'react-native'

export const commonStyle=StyleSheet.create({

    mainContainer:{
        flex:1, 
        
    },
    imageBackground: {
        flex: 1,
        // marginTop:Platform.OS==='ios'?1:1,
    },
    spinnerStyle: {
        color: colors.white,
    },
    headingTextContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },   
    headingTextStyle:{
        color:colors.black, 
        fontSize:fontSize.Large, 
        fontFamily:fontFamily.montserrat,
        marginLeft:"5%",
        marginTop:0,
    },
    searchBarInputContainerStyle:{ 
        // flexDirection:"row-reverse", 
        backgroundColor:colors.searchBarGrey,  
        width:"95%", 
        height:40,
        alignSelf:'flex-start',
        marginVertical:15,
        marginHorizontal:10,
        

        
       
    },
    searchBarContainerStyle:{
        backgroundColor:"transparent", 
        borderTopColor:"transparent", 
        borderBottomColor:"transparent", 
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
    
    emptyViewContainerStyle:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
    },
    emptyHeadingTextStyle:{
        color:colors.darkGrey, 
        fontSize:fontSize.small, 
        fontFamily:fontFamily.montserrat,
        width:200,
        // marginLeft:"5%",
        marginTop:15,
        marginBottom:15,
        alignSelf:"center",
        textAlign:"center",
    },
    
});