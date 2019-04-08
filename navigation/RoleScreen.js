import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

import {
  AsyncStorage,
  View,
  Button,
} from 'react-native';

import {
  CheckBox,
} from 'react-native-elements';

import config from '../config.json';

const {
  api: {
    ip,
    port,
  },
} = config;

class RoleScreen extends Component {
  static navigationOptions = {
    title: 'Choose your role',
  };

  state = {
    user: {},
    isMemberChecked: false,
    isCoachChecked: false,
  }

  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({
      user,
    });
  }

  handleOnPressMember = () => {
    return this.setState({
      isMemberChecked: true,
      isCoachChecked: false,
    });
  }

  handleOnPressCoach = () => {
    return this.setState({
      isMemberChecked: false,
      isCoachChecked: true,
    });
  }

  handleOnPressSave = async () => {
    try {
      const {
        user,
        isMemberChecked: isMember,
        isCoachChecked: isCoach,
      } = this.state;
  
      const userWithRole = {
        ...user,
        role: {
          isMember,
          isCoach,
        },
      };
      await AsyncStorage.setItem('user', JSON.stringify(userWithRole));
      await axios.post(`${ip}:${port}/user/`, userWithRole);
      return this.props.navigation.navigate('Main');
    } catch (error) {
      console.error('RoleScreen - handleOnPressSave error: ', error);
    }
  }

  render() {
    const {
      isMemberChecked,
      isCoachChecked,
    } = this.state;
    return (
      <View>
        <CheckBox
          title="MEMBER"
          checked={isMemberChecked}
          onPress={this.handleOnPressMember}
        />
        <CheckBox
          checked={isCoachChecked}
          title="COACH"
          onPress={this.handleOnPressCoach}
        />
        <Button
          title="save"
          onPress={this.handleOnPressSave}
        />
      </View>
    )
  }
}

export default createStackNavigator({ Role: RoleScreen });
