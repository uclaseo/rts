import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';
import config from '../config.json';

const FACEBOOK_ID = config.auth.facebookId;

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  signIntoFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_ID, {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const { data: { name, email } } = await axios(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        Alert.alert(`Hello ${name} ${email}!`);
        await AsyncStorage.setItem('userToken', token);
        this.props.navigation.navigate('Main');
      }
    } catch (error) {
      console.error('signIntoFaebook error: ', error);
    }
  }

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this.signIntoFacebook} />
      </View>
    );
  }
}

export default createStackNavigator({ SignIn: SignInScreen });
