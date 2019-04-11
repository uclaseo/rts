import React, { Component } from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import callApi from '../utils/Api';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class VotesScreen extends Component {
  static navigationOptions = {
    title: 'votes',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
          <Text>asdifas</Text>
        </View>
        <View
          style={styles.contentContainer}
        >
          <Text>asdifas</Text>
        </View>
      </View>
    );
  }
}
// import React, { Component } from 'react';
// import {
//   Platform,
//   View,
//   ScrollView,
//   StyleSheet,
//   Button,
//   DatePickerAndroid,
//   DatePickerIOS,
//   Text,
//   FlatList,
//   AsyncStorage,
//   Alert,
// } from 'react-native';

// import {
//   Tile,
//   Divider,
//   Overlay,
//   ListItem,
//   Card,
//   Icon,
// } from 'react-native-elements';
// import axios from 'axios';

// import { MonoText } from '../components/StyledText';

// import callApi from '../utils/Api';

// import Colors from '../constants/Colors';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   tileContainer: {
//     flex: 1,
//   },
//   title: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//   },
//   text: {
//     textAlign: 'center',
//     textAlignVertical: 'center',
//   },
// });
