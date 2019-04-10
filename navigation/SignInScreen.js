import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Facebook } from 'expo';
import axios from 'axios';

import apiCaller from '../utils/Api';

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


class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  logIn = async () => {
    try {
      // const {
      //   type,
      //   token,
      //   expires,
      //   permissions,
      //   declinedPermissions,
      // } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_ID, {
      //   permissions: ['public_profile', 'email'],
      // });
      // if (type === 'success') {
      //   const { name, email } = await this.fetchFacebookUser(token);
      //   await AsyncStorage.setItem('userToken', token);
      //   const user = await this.fetchUser(email);
      //   if (user) {
      //     await AsyncStorage.setItem('user', JSON.stringify(user));
      //     return this.props.navigation.navigate('Main');
      //   }
      //   AsyncStorage.setItem(
      //     'user',
      //     JSON.stringify({
      //       name,
      //       email,
      //     }),
      //   );
      //   return this.props.navigation.navigate('Role');
      // }


      const _id = '5cabdbcf2649920bb1a828e5';
      const name = 'Inseok Seo';
      const email = 'illhvhlda@hotmail.com';
      const role = {
        isMember: true,
        isCoach: false,
      };
      const coach = {
        coach: {},
        isRegistered: true,
      };
      const user = {
        _id,
        name,
        email,
        role,
        coach,
      };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return this.props.navigation.navigate('Main');


    } catch (error) {
      return console.error('SignInScreen - signIntoFaebook error: ', error);
    }
  }

  fetchFacebookUser = async (token) => {
    try {
      const { data: { name, email } } = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
      return {
        name,
        email,
      };
    } catch (error) {
      console.error('SignInScreen - fetchFacebookUser error: ', error);
    }
  }

  fetchUser = async (email) => {
    const response = await apiCaller('get', `/user/${email}`);
    const { user } = response.data.user;
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
