import React, { Component } from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SectionList,
} from 'react-native';

import callApi from '../utils/Api';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import axios from 'axios';


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

  async componentDidMount() {
    const votes = await this.fetchAllVotes();
    console.log('votes', votes);
  }

  fetchAllVotes = async () => {
    const openVotes = this.fetchOpenVotes();
    const closedVotes = this.fetchClosedVotes();
    return Promise.all([
      openVotes,
      closedVotes,
    ]);
  }

  fetchOpenVotes = async () => {
    return callApi('get', '/vote/openVotes');
  }

  fetchClosedVotes = async () => {
    return callApi('get', '/vote/closedVotes');
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
        <View
          style={styles.contentContainer}
        >
        </View>
      </View>
    );
  }
}
