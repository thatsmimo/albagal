import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Screens from '../screens';

const BeforeLogin = createStackNavigator(
  {
    Login: Screens.Login,
  },
  {headerMode: 'none'},
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

const AppNavigator = createSwitchNavigator({
  AfterLogin,
  BeforeLogin,
});

export default createAppContainer(AppNavigator);
