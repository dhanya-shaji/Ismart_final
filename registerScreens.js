import { Navigation } from "react-native-navigation";

//import high order components 
import HOCMainComponent from './app/HOCMainComponent';

//Components 
import {StartPage} from './app/components/Login/index';
import {Login} from './app/components/Login/index';
import {LoginOTP} from './app/components/Login/index';
import {LoginSalesman} from './app/components/Login/index';

//Screens
import {Dashboard,SearchPage,SearchPageCategory,SearchPageMaster} from './app/components/Home/'
import {Category,ProductList,ProductDetail,ShoppingCart} from './app/components/Category'
import {Brands} from './app/components/Brands'
import {Message} from './app/components/Message'
import {Profile,StaffProfile} from './app/components/Profile'
import {New} from './app/components/New'
import {OrdersList,UpcomingOrders,OrderDetail} from './app/components/Orders'
import {UpcomingSaleOrders, SaleOrdersList, SaleOrderDetail } from './app/components/Sales'

//Reuse-Components
import TopNavigationBar from './app/library/components/TopNavigationBar';
import TopSalesNavigationBar from './app/library/components/TopSalesNavigationBar';
import NavigationBackgroundBar from './app/library/components/NavigationBackgroundBar';
import SideDrawer from './app/library/components/SideDrawer';
import SalesSideDrawer from './app/library/components/SalesSideDrawer';


export function registerScreens(){
   
      //Before Login 
      Navigation.registerComponent(`navigation.ismart.Login`, () => HOCMainComponent(Login));
      Navigation.registerComponent(`navigation.ismart.LoginOTP`, () => HOCMainComponent(LoginOTP));
      Navigation.registerComponent(`navigation.ismart.LoginSalesman`, () => HOCMainComponent(LoginSalesman));
      Navigation.registerComponent(`navigation.ismart.MainHome`, () => HOCMainComponent(StartPage));

      // Home Tab
      Navigation.registerComponent(`navigation.ismart.Dashboard`, () => HOCMainComponent(Dashboard));


      //Category Tab
      Navigation.registerComponent(`navigation.ismart.Category`, () => HOCMainComponent(Category));
      Navigation.registerComponent(`navigation.ismart.ProductList`, () => HOCMainComponent(ProductList));
      Navigation.registerComponent(`navigation.ismart.ProductDetail`, () => HOCMainComponent(ProductDetail));
      Navigation.registerComponent(`navigation.ismart.ShoppingCart`, () => HOCMainComponent(ShoppingCart));

      //Brands Tab
      Navigation.registerComponent(`navigation.ismart.Brands`, () => HOCMainComponent(Brands));

      //Profile Tab
      Navigation.registerComponent(`navigation.ismart.Profile`, () => HOCMainComponent(Profile));
      Navigation.registerComponent(`navigation.ismart.StaffProfile`, () => HOCMainComponent(StaffProfile));

      //New Tab
      Navigation.registerComponent(`navigation.ismart.New`, () => HOCMainComponent(New));

      //Orders Tab
      Navigation.registerComponent(`navigation.ismart.OrdersList`, () => HOCMainComponent(OrdersList));
      Navigation.registerComponent(`navigation.ismart.UpcomingOrders`, () => HOCMainComponent(UpcomingOrders));
      Navigation.registerComponent(`navigation.ismart.OrderDetail`, () => HOCMainComponent(OrderDetail));

      // Sales Tab
      Navigation.registerComponent(`navigation.ismart.UpcomingSaleOrders`, () => HOCMainComponent(UpcomingSaleOrders));
      Navigation.registerComponent(`navigation.ismart.SaleOrdersList`, () => HOCMainComponent(SaleOrdersList));
      Navigation.registerComponent(`navigation.ismart.SaleOrderDetail`, () => HOCMainComponent(SaleOrderDetail));

      //Message Tab
      Navigation.registerComponent(`navigation.ismart.Message`, () => HOCMainComponent(Message));

      //util components
      Navigation.registerComponent(`navigation.ismart.TopNavigationBar`, () => HOCMainComponent(TopNavigationBar));
      Navigation.registerComponent(`navigation.ismart.TopSalesNavigationBar`, () => HOCMainComponent(TopSalesNavigationBar));
      Navigation.registerComponent(`navigation.ismart.NavigationBackgroundBar`, () => HOCMainComponent(NavigationBackgroundBar));
      Navigation.registerComponent('navigation.ismart.SideDrawer', () => HOCMainComponent(SideDrawer));
      Navigation.registerComponent('navigation.ismart.SalesSideDrawer', () => HOCMainComponent(SalesSideDrawer));
     
     //Search Pages
      Navigation.registerComponent('navigation.ismart.SearchPage', () => HOCMainComponent(SearchPage));
      Navigation.registerComponent('navigation.ismart.SearchPageCategory', () => HOCMainComponent(SearchPageCategory));
      Navigation.registerComponent('navigation.ismart.SearchPageMaster', () => HOCMainComponent(SearchPageMaster));
}