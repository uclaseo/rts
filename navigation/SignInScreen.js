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

const {
  auth: {
    facebookId: FACEBOOK_ID,
  },
  api: {
    ip,
    port,
  },
} = config;


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  static state = {
    isLoggedIn: false,
  };

  logIn = async () => {
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
        const { name, email } = await this.fetchFacebookUser(token);
        Alert.alert(`Hello ${name} ${email}!`);
        this.saveTokenToAsyncStorage('userToken', token);
        const user = await this.fetchUser(email);
        if (user) {
          console.log('user', user);
          this.saveTokenToAsyncStorage('name', user.name);
          this.saveTokenToAsyncStorage('email', user.email);
          return this.props.navigation.navigate('Main');
        }
        return this.props.navigation.navigate('Role');
      }
    } catch (error) {
      console.error('signIntoFaebook error: ', error);
    }
  }

  fetchFacebookUser = async (token) => {
    try {
      const { data: { name, email } } = await axios(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
      return {
        name,
        email,
      };
    } catch (error) {
      console.error('fetchFacebookUser error: ', error);
    }
  }

  saveTokenToAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }

  fetchUser = async (email) => {
    const response = await axios.get(`${ip}:${port}/user/${email}`);
    const user = response.data;
    return user;
  }

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this.logIn} />
      </View>
    );
  }
}

export default createStackNavigator({ SignIn: SignInScreen });
