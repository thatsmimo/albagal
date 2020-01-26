import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Screens from '../screens';
import { SideBar } from "../components";
import { createDrawerNavigator } from 'react-navigation-drawer';

const BeforeLogin = createStackNavigator(
  {
    Login: Screens.Login,
  },
  { headerMode: 'none' },
);

const AfterLogin = createStackNavigator(
  {
    Details: {
      screen: Screens.Details,
    },
    Dashboard: {
      screen: Screens.Dashboard,
    },
  },
  //   {
  //     headerMode: 'none',
  //     navigationOptions: {
  //       headerVisible: false,
  //     },
  //   },
);

const DrawerNavigator = createDrawerNavigator({
  AfterLogin: AfterLogin,
}, {
  contentComponent: props => <SideBar/>,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  }
});

const AppNavigator = createSwitchNavigator({
  BeforeLogin,
  DrawerNavigator,
});

export default createAppContainer(AppNavigator);
