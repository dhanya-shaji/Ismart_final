import {Navigation} from "react-native-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import {onNavigation, onNavigateToLoginSalesman, onNavigateToLogin, onNavigateToDashBoard, onNavigateToOrdersTab} from "./app/config/navigations";
import {registerScreens} from './registerScreens';

registerScreens();

getData = async () => {
  try {
    // onNavigateToLogin();

    // const value = await AsyncStorage.getItem('isCustomerLoggedIn');
    const value = await AsyncStorage.getItem('isStaffLoggedIn');
     
    if(value !== null) {
      // value previously stored
      if('true' === value) {
          onNavigateToDashBoard();
          // onNavigateToOrdersTab();
      } else {
        onNavigateToDashBoard();
        //onNavigateToLogin();
        // onNavigateToLoginSalesman();
      }
    } else {
      onNavigateToDashBoard();
      //onNavigateToLogin();
      // onNavigateToLoginSalesman();
    }
  } catch(e) {
    // error reading value
    console.log("error is ", e);
  }
}

Navigation.events().registerAppLaunchedListener(() => {

  getData();

});


        //   Navigation.setRoot({
    //     root: {
    //       component: {
    //         name: "navigation.ismart.Login"
    //       }
    //     }
    //  });