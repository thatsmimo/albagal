import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Screens from '../screens';

const AppNavigator = createStackNavigator({
  Login: Screens.Login,
});

export default createAppContainer(AppNavigator);
