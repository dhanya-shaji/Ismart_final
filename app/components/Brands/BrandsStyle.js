import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../resources/colors';
import fontSize from '../../resources/fontSize';
import fontFamily from '../../resources/fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const brandsStyle=StyleSheet.create({

    // mainContainer:{
    //     flex:1, 
    //     marginTop:45, 
    // },
    // imageBackground: {
    //     flex: 1,
    //     marginTop:45,
    // },
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

    imageStyle:{
        marginTop:0, 
        height:"100%", 
        width:"100%",
        borderRadius:12,
        alignSelf:"center",
        resizeMode:'stretch',
        //shadowColor: "lightgrey"

        
    },

    buttonStyle:{
        margin:8,
        borderRadius:12,
        width:70,
        height:70,
        alignItems:"center",
        // justifyContent:"center",
        backgroundColor:colors.white ,
    },
    scrollContainer:{
        backgroundColor:colors.searchBarGrey, 
        paddingTop:"3%",
        paddingLeft:"3%",  
        paddingRight:"3%",
        paddingBottom:"5%",
        marginTop:15,
        justifyContent:"space-around",
        marginBottom:15,
        // height:"100%",
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