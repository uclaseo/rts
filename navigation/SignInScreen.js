import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import { AsyncStorage } from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this.signInAsync} />
      </View>
    );
  }
}
