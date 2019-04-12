import React, { Component } from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';

import {
  Icon,
} from 'expo';

import {
  Button,
  Badge,
} from 'react-native-elements';

import { 
  StyledButton,
  CircleButton,
} from '../components/StyledButton';
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
    user: {},
    votes: [],
    vote: {},
    isModalOpen: false,
  };

  async componentDidMount() {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      this.setState({
        user,
      });
      await this.fetchAllVotes();
    } catch (error) {
      return console.error('VotesScreen - componentDidMount error: ', error);
    }
  }

  fetchAllVotes = async () => {
    const allVotes = await Promise.all([
      this.fetchOpenVotes(),
      this.fetchClosedVotes(),
    ]);
    const openVotes = allVotes[0];
    const closedVotes = allVotes[1];
    const votes = openVotes.concat(closedVotes);
    this.setState({
      votes,
    });
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

  handleOnPressAdd = async () => {
    try {
      const voteOption = {
        id: 1,
        title: 'First Vote',
        text: 'this is the first vote',
        options: [
          { message: 'yes', count: 1 },
          { message: 'no', count: 3 },
          { message: 'I dont know', count: 5 },
        ],
        isOpen: false,
        voteCount: 9,
      };
      const voteAnother = {
        id: 1,
        title: 'Second Vote regarding the 대회',
        text: 'This is another test second vote so please votesssssSSsssㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
        options: [
          { message: 'yes', count: 0 },
          { message: 'no', count: 0 },
          { message: 'I dont know', count: 0 },
        ],
        isOpen: true,
        voteCount: 0,
      };
      const { success } = await callApi('post', '/vote/create', voteOption);
      await callApi('post', '/vote/create', voteAnother);
      if (!success) {
        // DO SOME LOGIC HERE
      }
      await this.fetchAllVotes();

    } catch (error) {
      return console.error('VotesScreen - handleOnPressAdd error: ', error);
    }

  }

  handleOnPressVote = (item) => {
    console.log('handleOnPressVote', item);
    this.setState({
      vote: item,
    }, () => {
      this.toggleModal();
    })
  }

  renderVotes = (votes) => {

    return (
      <FlatList
        data={votes}
        keyExtractor={vote => vote._id}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight
              onPress={() => this.handleOnPressVote(item)}
              underlayColor="rgba(47, 149, 220, 0.2)"
            >
              <View
                style={{
                  height: 60,
                  flexDirection: 'row',
                  marginTop: 7,
                  marginBottom: 7,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    // backgroundColor: 'yello',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon.MaterialCommunityIcons
                    name="vote-outline"
                    size={26}
                    style={{ marginBottom: -3 }}
                    color={Colors.tabIconDefault}
                  />
                  <Badge
                    value={item.voteCount}
                    status="success"
                  />
                </View>

                <View
                  style={{
                    flex: 4.5,
                  }}
                >
                  <View
                    style={{
                      height: 33,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 27,
                        opacity: item.isOpen ? 1 : 0.6,
                        fontWeight: item.isOpen ? '500' : '400',
                      }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 27,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        opacity: item.isOpen ? 1 : 0.6,
                        fontWeight: item.isOpen ? '500' : '400',
                      }}
                      numberOfLines={2}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    );
  }

  renderModal = () => {
    const {
      vote,
      isModalOpen,
    } = this.state;
    const buttonColors = [
      Colors.primaryColor,
      Colors.secondaryColor,
      Colors.tertiaryColor,
      Colors.primaryColor,
      Colors.secondaryColor,
      Colors.tertiaryColor,
    ];
    return (
      <Modal
        animationType="fade"
        visible={isModalOpen}
        onRequestClose={this.toggleModal}
      >
        <View
          style={{
            flex: 2,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: '500',
            }}
          >
            {vote.title}
          </Text>
          <Text
            style={{
              fontSize: 27,
            }}
          >
            {vote.text}
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {
            vote.options.map((option, index) => {
              return (
                <View
                  key={index}
                  style={{
                    // alignSelf: 'stertch',
                    width: 200,
                    marginBottom: 25,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: buttonColors[index],
                  }}
                >
                  <Badge
                    value={option.count}
                    status="success"
                    containerStyle={{
                      position: 'absolute',
                      top: -10,
                      left: -10,
                    }}
                  />
                  <Text>{option.message}</Text>
                </View>
              );
            })
          }
        </View>

      </Modal>
    );
  }

  toggleModal = () => {
    this.setState((state) => {
      return {
        isModalOpen: !state.isModalOpen,
      };
    });
  }

  render() {
    const {
      user,
      votes,
      isModalOpen,
    } = this.state;

    const hasVotes = votes.length > 0;
    const isCoach = user && user.role && user.role.isCoach;
    return (
      <View
        style={styles.container}
      >
        <View
          style={{ ...styles.contentContainer }}
        >
          <Text> VOTES</Text>
          {
            hasVotes
            && this.renderVotes(votes)
          }
          {
            isCoach
            && (
              <CircleButton
                onPress={this.handleOnPressAdd}
                title="+"
              />
            )
          }
        </View>

        {
          isModalOpen
          && this.renderModal()
        }
      </View>
    );
  }
}
