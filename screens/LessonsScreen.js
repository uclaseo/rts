import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Text,
} from 'react-native';

import {
  Tile,
  Divider,
  Overlay,
} from 'react-native-elements';

import { MonoText } from '../components/StyledText';

const dummyUsers = [
  { name: '제프', teachingDay: 'Thursday' },
  { name: '상혁', teachingDay: 'Thursday' },
  { name: '동균', teachingDay: 'Thursday' },
  { name: '대로', teachingDay: 'Sunday' },
  { name: '현수', teachingDay: 'Sunday' },
  { name: '에디', teachingDay: 'Sunday' },
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

  handlePressThursday = (event) => {
    console.log('handlePress Thursday', event);
    this.setState({
      isOverlayVisible: true,
      overlayContent: 'Thursday',
    });
  }

  handlePressSunday = (event) => {
    console.log('handlePress Sunday');
    this.setState({
      isOverlayVisible: true,
      overlayContent: 'Sunday',
    });
  }

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
          onPress={this.handlePressThursday}
        />
        <Divider style={{backgroundColor: 'blue'}} />
        <Tile
          title="Sunday"
          featured
          // caption="에디, 현수, 동균"
          onPress={this.handlePressSunday}
        />
        <Overlay
          isVisible={isOverlayVisible}
          onBackdropPress={() => this.setState({ isOverlayVisible: false })}
        >
          <ScrollView>
            {
              dummyUsers.map((user) => {
                if (user.teachingDay === overlayContent) {
                  return (
                    <Text key={user.name}>{user.name}</Text>
                  );
                }
              })
            }
          </ScrollView>
        </Overlay>
      </ScrollView>
    );
  }
}
