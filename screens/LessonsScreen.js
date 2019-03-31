import React from 'react';
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
} from 'react-native';

import {
  Tile,
  Divider,
  Overlay,
  ListItem,
} from 'react-native-elements';

import { MonoText } from '../components/StyledText';

const dummyUsers = [
  { name: '제프', teachingDay: 'Thursday', students: 3 },
  { name: '상혁', teachingDay: 'Thursday', students: 4 },
  { name: '동균', teachingDay: 'Thursday', students: 1 },
  { name: '대로', teachingDay: 'Sunday', students: 0 },
  { name: '현수', teachingDay: 'Sunday', students: 1 },
  { name: '에디', teachingDay: 'Sunday', students: 3 },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});

export default class LessonsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOverlayVisible: false,
      overlayContent: '',
    };
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
  }

  // keyExtractor = (item, index) => index.toString()

  // renderItem = ({ item }) => {
  //   return (
  //     <ListItem
  //       title={item.name}
  //       subtitle={item.name}
  //       // leftAvatar={{ source: { uri: item.avatar_url } }}
  //     />
  //   );
  // }

  render() {
    const {
      isOverlayVisible,
      overlayContent,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Tile
          title="Thursday"
          featured
          // caption="제프, 상혁, 대로"
          onPress={() => this.handleOnPressLessonDay('Thursday')}
        />
        <Divider style={{backgroundColor: 'blue'}} />
        <Tile
          title="Sunday"
          featured
          // caption="에디, 현수, 동균"
          onPress={() => this.handleOnPressLessonDay('Sunday')}
        />
        <Overlay
          isVisible={isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
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
                      subtitle={user.name}
                      bottomDivider
                      onPress={() => this.handlePressCoach(user.name)}
                      badge={{
                        value: user.students,
                      }}
                    />
                  );
                }
              })
            }
          </View>
        </Overlay>
      </ScrollView>
    );
  }
}
