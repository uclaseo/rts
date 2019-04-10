import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Text,
  FlatList,
  AsyncStorage,
  Alert,
} from 'react-native';

import {
  Tile,
  Divider,
  Overlay,
  ListItem,
  Card,
  Icon,
} from 'react-native-elements';
import axios from 'axios';

import { MonoText } from '../components/StyledText';

import callApi from '../utils/Api';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  tileContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default class LessonsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      coaches: [],
      isOverlayVisible: false,
      overlayContent: '',
    };
  }

  async componentDidMount() {
    try {
      const coaches = await this.fetchCoaches();
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      this.setState({
        user,
        coaches,
      });
    } catch (error) {
      return console.error('LessonsScreen - componentDidMount error: ', error);
    }
  }

  componentWillUnmount() {
    this.setState({
      isOverlayVisible: false,
      overlayContent: '',
    });
  }

  fetchCoaches = async () => {
    try {
      const response = await callApi('get', '/user/coach/getCoaches');
      const { success, coaches } = response;
      if (!success) {
        // DO THE LOGIC IF NOT SUCCESS
      }
      return coaches;
    } catch (error) {
      return console.error('LessonsScreen - fetchCoaches error: ', error);
    }
  }

  handleOnPressLessonDay = (day) => {
    console.log('handlePress day', day);
    this.setState({
      isOverlayVisible: true,
      overlayContent: day,
    });
  }

  handlePressCoach = (coach) => {
    this.joinLesson(coach);
  }

  joinLesson = async (coach) => {
    try {
      const { user, coaches } = this.state;
      if (user.role.isMember) {
        if (user.coach.isRegistered) {
          return Alert.alert('You already have a coach');
        }
        const body = {
          user,
          coach,
        };
        const response = await callApi('post', '/lesson/join', body);
        const { success, user: updatedUser, coach: updatedCoach } = response;
        if (!success) {
          // DO THE LOGIC IF NOT SUCCESS
          return Alert.alert(response.message);
        }
        const index = coaches.findIndex((eachCoach) => {
          return eachCoach.name === updatedCoach.name && eachCoach.email === updatedCoach.email;
        });

        this.setState((state) => {
          const updatedCoaches = coaches.slice();
          updatedCoaches[index] = updatedCoach;
          console.log('updatedUser', updatedUser);
          return {
            ...state,
            user: updatedUser,
            coaches: updatedCoaches,
          };
        }, async () => {
          try {
            console.log('user 1', await AsyncStorage.getItem('user'));
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('user 2', await AsyncStorage.getItem('user'));
          } catch (error) {
            console.log('error', error);
          }
        });
      } else {
        Alert.alert('Member only', 'You cannot join a lesson.');
      }
    } catch (error) {
      return console.error('LessonsScreen - joinLesson error: ', error);
    }
  }

  renderCoaches = () => {
    const { coaches } = this.state;
    return coaches.map((coach) => {
      return (
        <ListItem
          key={coach._id}
          title={`${coach.name} ${coach.students.count}`}
          onPress={() => this.handlePressCoach(coach)}
        />
      );
    });
  }

  render() {
    const {
      coaches,
      isOverlayVisible,
      overlayContent,
    } = this.state;

    const hasCoaches = coaches.length > 0;

    return (
      <View
        style={styles.container}
      >
        <View
          style={{
            ...styles.tileContainer,
            backgroundColor: Colors.primaryColor,
          }}
        >
          <Tile
            title="Thursday"
            onPress={() => this.handleOnPressLessonDay('Thursday')}
            titleStyle={styles.title}
            contentContainerStyle={{
              height: 500,
            }}
          />
        </View>
        <Divider style={{ backgroundColor: 'blue' }} />
        <View
          style={{
            ...styles.tileContainer,
            backgroundColor: Colors.secondaryColor,
          }}
        >
          <Tile
            title="Sunday"
            onPress={() => this.handleOnPressLessonDay('Sunday')}
            titleStyle={styles.title}
            contentContainerStyle={{
              height: 500,
            }}
          />
        </View>

        <Overlay
          isVisible={isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
          borderRadius={25}
          // fullScreen
        >
          <View>
            {
              hasCoaches
              && this.renderCoaches()
            }
          </View>
        </Overlay>
      </View>
    );
  }
}
