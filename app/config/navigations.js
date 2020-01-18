import { Navigation } from "react-native-navigation";
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-community/async-storage';
import images from "../resources/images";
import colors from "../resources/colors";
import { Platform} from "react-native";

//Navigate Common Screen Function
export function onNavigation(screenName, titleName, componentId, passProps) {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps: passProps,
      options: {
        topBar: {
          title: {
            text: titleName
          }
        },
        // bottomTabs: userBottomTab
      }
    }
  });
}

export function navigateToScreen(screenName, screen) {
  console.log(screen, 'Screen');
  console.log(screenName, 'Screen Name');
  onNavigation(screenName, "", screen.props.componentId, screen.prop)
}

export function addCommonListeners(screen) {
  screen.listener = EventRegister.addEventListener('gotoShoppingCart', (data) => {
    navigateToScreen("navigation.ismart.ShoppingCart", screen);
  });
  screen.listener = EventRegister.addEventListener('gotoProfile', (data) => {
    navigateToScreen("navigation.ismart.Profile", screen)
  });
  screen.listener = EventRegister.addEventListener('gotoOrders', (data) => {
    navigateToScreen("navigation.ismart.UpcomingOrders", screen)
  });
  screen.listener = EventRegister.addEventListener('logoutFromApp', (data) => {
    // this.onLogoutPress();
    try {
      AsyncStorage.setItem('isCustomerLoggedIn', 'false');
      AsyncStorage.setItem('CustomerData', null);
    } catch (e) {
      // saving error
      console.log("error is ", e);
    }
    onNavigateToLogin();
  });
  screen.listener = EventRegister.addEventListener('popToRoot', (data) => {
    console.log(data);
    onNavigationPopToRoot(screen.props.componentId);
  });
}

export function onNavigationPopToRoot(componentId) {
  Navigation.popToRoot(componentId);
}

//Navigate To Login Page 
export function onNavigateToLogin() {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.ismart.Login"
      }
    }
  });
}

//Navigate To Login Page 
export function onNavigateToLoginSalesman() {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.ismart.LoginSalesman"
      }
    }
  });
}

//Navigate To Login OTP Page 
export function onNavigateToLoginOTP(componentId, passProps) {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.ismart.LoginOTP",
        passProps: passProps,
      }
    }
  });
}

//Navigate To Orders Tab 
export function onNavigateToOrdersTab() {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.ismart.SaleOrdersList"
      },
      sideMenu: {
        left: {
          component: {
            id: "screen_drawer",
            name: "navigation.ismart.SalesSideDrawer"
          }
        },
        center: {
          bottomTabs: ordersBottomTab
        },
      },
      // bottomTabs:ordersBottomTab
    }
  });
  if (Platform.OS === 'android') {
    Navigation.events().registerBottomTabSelectedListener(
      async ({ selectedTabIndex, unselectedTabIndex }) => {
        console.log("tab selected");
        console.log("selectedTabIndex is ", selectedTabIndex);
        console.log("unselectedTabIndex", unselectedTabIndex);

        if (
          selectedTabIndex != unselectedTabIndex
        ) {
          console.log("entered here")
          // EventRegister.emit('popToRoot', 'it works!!!');
          await Navigation.popToRoot();
        }
      }
    )
  }
}

//Navigate To Home Page 
export function onNavigateToDashBoard() {
  Navigation.setRoot({
    root: {
      component: {
        id: "screen_dashboard",
        name: "navigation.ismart.DashBoard"
      },
      sideMenu: {
        left: {
          component: {
            id: "screen_drawer",
            name: "navigation.ismart.SideDrawer"
          }
        },
        center: {
          bottomTabs: userBottomTab
        },
      },
     
    }
  });
  if (Platform.OS === 'android') {
    Navigation.events().registerBottomTabSelectedListener(
      async ({ selectedTabIndex, unselectedTabIndex }) => {
        console.log("tab selected");
        console.log("selectedTabIndex is ", selectedTabIndex);
        console.log("unselectedTabIndex", unselectedTabIndex);

        if (
          selectedTabIndex != unselectedTabIndex
        ) {
          console.log("entered here")
          // EventRegister.emit('popToRoot', 'it works!!!');
          // await Navigation.popToRoot();
        }
      }
    )
  }
}

//Hide Side Menu
export function HideSideDrawer(componentId) {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: false,
        name: "navigation.ismart.SideDrawer"
      }
    }
  });
}

//Show Side Menu
export function ShowSideDrawer(componentId) {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: true,
        name: "navigation.ismart.SideDrawer"
      }
    }
  });
}

//Top Bar - Salesman
const topSalesNavigationBar = {
  visible: true,
  animate: false, // Controls whether TopBar visibility changes should be animated
  hideOnScroll: false,
  // leftButtonColor: 'red', rightButtonColor: 'red',
  drawBehind: false,
  testID: "topBar",
  title: {
    text: "",
    fontSize: 14,
    color: colors.blue,
    fontFamily: "Helvetica"
  },

  title: {
    component: {
      name: 'navigation.ismart.TopSalesNavigationBar',
      aligment: 'center',
      passProps: {
        onClick: () => alert('Pressed button'),
      }
    },
  },

  background: {
    component: {
      name: "navigation.ismart.NavigationBackgroundBar"
    }
  },

  leftButtons: [
    {
      id: "SideDrawer",
      icon: images.menu_white,
      onClick: () => this.ShowSideDrawer
    }
  ],

};

//Top Bar -Customer
const topNavigationBar = {
  visible: true,
  animate: false, // Controls whether TopBar visibility changes should be animated
  hideOnScroll: false,
  // leftButtonColor: 'red', rightButtonColor: 'red',
  drawBehind: false,
  testID: "topBar",
  title: {
    text: "",
    fontSize: 14, 
    color: colors.blue,
    fontFamily: "Helvetica"
  },

  title: {
    component: {
      name: 'navigation.ismart.TopNavigationBar',
      aligment: 'center',
      passProps: {
        onClick: () => alert('Pressed button'),
      }
    },
  },

  background: {
    component: {
      name: "navigation.ismart.NavigationBackgroundBar"
    }
  },

  leftButtons: [
    {
      id: "SideDrawer",
      icon: Platform.OS==='ios'?images.menu_black:images.menu_white
      
    }
  ],

  // leftButtons: [ { id: 'something', text: '', }, ],

  // leftButtons: [
  //   {
  //     id: "buttonLeftSideMenu",
  //     icon: images.menu_white,
  //   }
  // ],

  // rightButtons: [
  //   {
  //     id: "buttonRightSideMenu",
  //     icon: images.camera,
  //     fontSize:20,

  //   }
  // ]

};


const topNavigationBar_ios = {
  visible: true,
  animate: false, // Controls whether TopBar visibility changes should be animated
  hideOnScroll: false,
  // leftButtonColor: 'red', rightButtonColor: 'red',
  drawBehind: false,
  testID: "topBar",
 
  title: {
    text: "",
    fontSize: 14,
    color: colors.blue,
    fontFamily: "Helvetica"
  },



  

  leftButtons: [
    {
      id: "SideDrawer",
      icon: images.menu_black
      
    }
  ],



  rightButtons: [
    {
      id: "buttonRightSideMenuCamera",
      icon: images.camera_blue,
     

    },
    {
      id: "buttonRightSideMenuNotification",
      icon: images.notification_blue,
     

    },
    {
      id: "buttonRightSideMenuCart",
      icon: images.shopping_cart_blue,
     

    }
  ]

};

export const userBottomTab = {
  id:"BottomTabsId",
  children: [
    {
      stack: {
        children: [
          {
            
            component: {
              id: 'screen_dashboard',
              name: 'navigation.ismart.Dashboard',
              options: {
                bottomTab: {
                  text: 'Dashboard',
                  icon: images.home,
                },
                topBar: Platform.OS==='ios'?topNavigationBar_ios: topNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
            
            component: {
              id: "screen_category",
              name: 'navigation.ismart.Category',
              options: {
                bottomTab: {
                  text: 'Category',
                  icon: images.menu,
                },
                topBar: Platform.OS==='ios'?topNavigationBar_ios:topNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
           
            component: {
              id: "screen_manufacture",
              name: 'navigation.ismart.Brands',
              options: {
                bottomTab: {
                  text: 'Manufacturers',
                  icon: images.bag,
                },
                topBar: Platform.OS==='ios'?topNavigationBar_ios:topNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
            
            component: {
              id: "screen_profile",
              name: 'navigation.ismart.Profile',
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: images.profile,
                },
                topBar: Platform.OS==='ios'?topNavigationBar_ios:topNavigationBar,
              }
            }
          }
        ],
     
      },
    },

    {
      stack: {
        children: [
          {
           
            component: {
              id: "screen_newfeed",
              name: 'navigation.ismart.New',
              options: {
                bottomTab: {
                  text: 'New',
                  icon: images.diamond,
                },
                topBar: Platform.OS==='ios'?topNavigationBar_ios:topNavigationBar,
              }
            }
          }
        ],
     
      },
    },
  ]
}

export const ordersBottomTab = {
  children: [
    {
      stack: {
        children: [
          {
            component: {
              name: 'navigation.ismart.SaleOrdersList',
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: images.home,
                },
                topBar: topSalesNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
            component: {
              name: 'navigation.ismart.UpcomingSaleOrders',
              options: {
                bottomTab: {
                  text: 'Orders',
                  icon: images.list,
                },
                topBar: topSalesNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
            component: {
              name: 'navigation.ismart.Message',
              options: {
                bottomTab: {
                  text: 'Message',
                  icon: images.mail,
                },
                topBar: topSalesNavigationBar,
              }
            }
          }
        ],
        
      },
    },

    {
      stack: {
        children: [
          {
            component: {
              name: 'navigation.ismart.StaffProfile',
              options: {
                bottomTab: {
                  text: 'Profile',
                  icon: images.profile,
                },
                topBar: topSalesNavigationBar,
              }
            }
          }
        ],

      },
    },



  ]
}

//All Stack children

export const stackChild = [
  {
    component: {
      id: "screen_dashboard",
      name: "navigation.ismart.DashBoard"
    }
  },
  {
    component: {
      id: "screen_category",
      name: "navigation.ismart.Category"
    }
  },
  {
    component: {
      id: "screen_topbar",
      name: "navigation.ismart.TopNavigationBar"
    }
  }
]

