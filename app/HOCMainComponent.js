import React, { Component, useEffect } from "react";
//-----------------Redux Imports
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { BackHandler, Alert, Platform } from 'react-native'

import reducers from "./redux/reducers/index";
import sagas from "./redux/sagas/index";

//Third Part Tool 
import firebase, { RemoteMessage } from 'react-native-firebase';
import type, { Notification, NotificationOpen } from 'react-native-firebase';

import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from "react-native-navigation";
import { onNavigation, ShowSideDrawer } from '../app/config/navigations';
//Setting up saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(sagas);

store.subscribe(() => {
  console.log("store updated", store.getState());
});




export default function HOCMainComponent(ChildComponent) {
  return class CComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeComponentId: '',
      };
      navigationEvent = Navigation
        .events()
        .registerComponentDidAppearListener(({ componentId }) => {
          if (componentId === "screen_newfeed" || componentId === "screen_profile" || componentId === "screen_manufacture" || componentId === "screen_category" || componentId === "screen_dashboard") {
            this.setState({ activeComponentId: componentId });
          }
        });

      Navigation.events().bindComponent(this);

    }






    async componentDidMount() {
     //Back button Handler
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.state.activeComponentId !== '') {
          Navigation.mergeOptions('BottomTabsId', {
            bottomTabs: {
              currentTabIndex: 0
            }
          });
          console.log("enter")
          return true;

        }
        console.log(this.state.activeComponentId, "Components")
        return false;
      });

      




    }



    
    showAlert = (title, message) => {
      Alert.alert(
        title,
        message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }

    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log("Token", fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    }
    async requestPermission() {
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
      } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
      }
    }

    navigationButtonPressed({ buttonId }) {
      // will be called when "buttonOne" is clicked
      console.log(buttonId)

      if (buttonId === 'SideDrawer') {
        try {

          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              },
            },
          });
        } catch (error) {
          //
        }
      } else if (buttonId === 'buttonRightSideMenuCamera') {
        onNavigation("navigation.ismart.ShoppingCart", "Checkout Here", this.state.activeComponentId, {

          pageSource: "imageupload",
        })

      } else if (buttonId === 'buttonRightSideMenuNotification') {
        onNavigation("navigation.ismart.New", "Notifications", this.state.activeComponentId, {})


      } else if (buttonId === 'buttonRightSideMenuCart') {
        onNavigation("navigation.ismart.ShoppingCart", "Checkout Here", this.state.activeComponentId, {})
      }
    }

    render() {
      return (
        <Provider store={store}>
          <ChildComponent {...this.props} />
        </Provider>
      )
    }
  }
}