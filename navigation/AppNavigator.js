import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from './SignInScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

import RoleScreen from './RoleScreen';

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Auth: SignInScreen,
    Main: MainTabNavigator,

    Role: RoleScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
