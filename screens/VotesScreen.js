import React, { Component } from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
} from 'react-native';

import {
  Button,
} from 'react-native-elements';

import StyledButton from '../components/StyledButton';
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

  handleOnPress = async () => {
    const voteOption = {
      title: 'First Vote',
      text: 'this is the first vote',
      isOpen: true,
    };
    const response = await callApi('post', '/vote/create', voteOption);
    console.log('response', response);
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
          <StyledButton
            onPress={this.handleOnPress}
            title="CREATE VOTE"
          />
        </View>
      </View>
    );
  }
}
