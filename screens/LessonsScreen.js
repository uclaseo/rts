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

import { MonoText } from '../components/StyledText';

import callApi from '../utils/Api';

import Colors from '../constants/Colors';


const dummyUsers = [
  { name: '제프', teachingDay: 'Thursday', students: 3 },
  { name: '상혁', teachingDay: 'Thursday', students: 4 },
  { name: '동균', teachingDay: 'Thursday', students: 1 },
  { name: '대로', teachingDay: 'Thursday', students: 0 },
  { name: '현수', teachingDay: 'Thursday', students: 1 },
  { name: '에디', teachingDay: 'Thursday', students: 3 },
];

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
      isOverlayVisible: false,
      overlayContent: '',
    };
  }

  async componentDidMount() {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      this.setState({
        user,
      });
    } catch (error) {
      console.error('LessonsScreen - componentDidMount error: ', error);
    }
  }

  componentWillUnmount() {
    this.setState({
      isOverlayVisible: false,
      overlayContent: '',
    });
  }

  handleOnPressLessonDay = (day) => {
    console.log('handlePress day', day);
    this.setState({
      isOverlayVisible: true,
      overlayContent: day,
    });
  }

  handlePressCoach = (coachName) => {
    console.log('coachName', coachName);
    this.joinLesson(coachName);
  }

  joinLesson = async (coachName) => {
    try {
      const { user } = this.state;
      if (!user.role.isMember) {
        const body = {
          user,
          coachName,
        };
        await callApi('post', '/lesson/join', body);
      } else {
        Alert.alert('Member only', 'You cannot join a lesson.');
      }
    } catch (error) {
      console.error('LessonsScreen - joinLesson error: ', error);
    }

  }

  render() {
    const {
      isOverlayVisible,
      overlayContent,
    } = this.state;
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
            {/* <FlatList
              keyExtractor={this.keyExtractor}
              data={dummyUsers}
              renderItem={this.renderItem}
            /> */}
            {
              dummyUsers.map((user) => {
                if (user.teachingDay === overlayContent) {
                  return (
                    <ListItem
                      key={user.name}
                      // leftAvatar={{ source: { uri: l.avatar_url } }}
                      title={user.name}
                      // subtitle={user.name}
                      // bottomDivider
                      onPress={() => this.handlePressCoach(user.name)}
                      // badge={{
                      //   value: user.students,
                      // }}
                    />
                  );
                }
              })
            }
          </View>
        </Overlay>
      </View>
    );
  }
}
