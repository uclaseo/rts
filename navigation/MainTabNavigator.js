import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';


import { Icon } from 'expo';



import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import VotesScreen from '../screens/VotesScreen';
import LessonsScreen from '../screens/LessonsScreen';
import { withTheme } from 'react-native-elements';

import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const VotesStack = createStackNavigator({
  Votes: VotesScreen,
});

VotesStack.navigationOptions = {
  tabBarLabel: 'Votes', 
  tabBarIcon: ({ focused }) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    // />
    <Icon.MaterialCommunityIcons
      name="vote-outline"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const LessonsStack = createStackNavigator({
  Lessons: LessonsScreen,
});

LessonsStack.navigationOptions = {
  tabBarLabel: 'Lessons',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    VotesStack,
    LessonsStack,
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      indicatorStyle: {
        backgroundColor: Colors.tintColor,
      },
      style: {
        backgroundColor: 'white',
      },
    },
  },
);
