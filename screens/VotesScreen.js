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

  state = {
    openVotes: [],
    closedVotes: [],
  };

  async componentDidMount() {
    const allVotes = await this.fetchAllVotes();
    const openVotes = allVotes[0];
    const closedVotes = allVotes[1];
    this.setState({
      openVotes,
      closedVotes,
    })
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
    const response = await callApi('get', '/vote/openVotes');
    const { success, openVotes } = response;
    if (!success) {
      // DO THE LOGIC IF NOT SUCCESS
    }
    return openVotes;
  }

  fetchClosedVotes = async () => {
    const response = await callApi('get', '/vote/closedVotes');
    const { success, closedVotes } = response;
    if (!success) {
      // DO THE LOGIC IF NOT SUCCESS
    }
    return closedVotes;
  }

  handleOnPress = async () => {
    const voteOption = {
      title: 'First Vote',
      text: 'this is the first vote',
      isOpen: true,
    };
    const response = await callApi('post', '/vote/create', voteOption);
  }

  renderOpenVotes = (openVotes) => {
    return (
      <FlatList
        data={openVotes}
        keyExtractor={(vote) => vote._id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    );
  }

  renderClosedVotes = (closedVotes) => {
    return (
      <FlatList
        data={closedVotes}
        keyExtractor={(vote) => vote._id}
        renderItem={( item ) => <Text>{item.title}</Text>}
      />
    );
  }

  render() {
    const {
      openVotes,
      closedVotes,
    } = this.state;

    const hasOpenVotes = openVotes.length > 0;
    const hasClosedVotes = closedVotes.length > 0;

    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          <Text>OPEN VOTES</Text>
          {
            hasOpenVotes &&
            this.renderOpenVotes(openVotes)
          }
        </View>
        <View
          style={styles.contentContainer}
        >
          <Text>CLOSED VOTES</Text>
          {
            hasClosedVotes &&
            this.renderClosedVotes(closedVotes)
          }
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
