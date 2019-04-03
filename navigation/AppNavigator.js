import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from './SignInScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
