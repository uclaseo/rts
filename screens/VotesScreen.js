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
  TextInput,
} from 'react-native';

import {
  Icon,
} from 'expo';

import {
  Button,
  Badge,
  Input,
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
    isAddingVote: false,
    newVote: {
      titleText: '',
      descriptionText: '',
      options: [
        {
          id: Math.random().toString(36).substr(2, 9),
          message: '',
          votedUsers: [],
        },
      ],
    },
  };

  async componentDidMount() {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      this.setState({
        user,
      });
      return await this.fetchAllVotes();
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

  handleOnPressAddVote = async () => {
    try {
      this.setState({
        isModalOpen: true,
        isAddingVote: true,
      });

    } catch (error) {
      return console.error('VotesScreen - handleOnPressAddVote error: ', error);
    }

  }

  handleOnPressAddOption = () => {
    this.setState((state) => {
      return {
        newVote: {
          ...state.newVote,
          options: [...state.newVote.options, { id: this.generateRandomId(), message: '', votedUsers: [] }],
        },
      };
    });
  }

  generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  }

  handleOnPressVoteListItem = (item) => {
    this.setState({
      vote: item,
    }, () => {
      this.toggleModal();
    });
  }

  renderVotes = (votes) => {
    return (
      <FlatList
        data={votes}
        keyExtractor={vote => vote._id}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight
              onPress={() => this.handleOnPressVoteListItem(item)}
              underlayColor="rgba(47, 149, 220, 0.2)"
            >
              <View
                style={{
                  height: 60,
                  flexDirection: 'row',  
                  marginTop: 7,
                  marginBottom: 7,
                  paddingRight: 30,
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
                      {item.titleText}
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
                      {item.descriptionText}
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

  vote = async (voteId, voteOption) => {
    try {
      const {
        user,
        vote,
      } = this.state;

      const hasUser = voteOption.votedUsers.find((votedUser) => {
        return votedUser._id === user._id;
      });
      if (hasUser) {
        return Alert.alert('You already voted');
      }

      const option = {
        user,
        voteId,
        voteOption,
      };
      const response = await callApi('put', '/vote/openVotes', option);
      const { success, openVotes } = response;
      if (!success) {
        // DO THE LOGIC IF NOT SUCCESS
      }
      this.setState({
        vote: response.vote,
      });
      await this.fetchAllVotes();
    } catch (error) {
      return console.error('VotesScreen - vote error: ', error);
    }
  }

  renderModal = () => {
    const {
      vote,
      isModalOpen,
      isAddingVote,
      newVote: {
        titleText,
        descriptionText,
        options,
      },
    } = this.state;
    const buttonColors = [
      Colors.primaryColor,
      Colors.secondaryColor,
      Colors.tertiaryColor,
      Colors.primaryColor,
      Colors.secondaryColor,
      Colors.tertiaryColor,
    ];

    if (isAddingVote) {
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
            <TextInput
              style={{
                borderColor: 'black',
                borderWidth: 1,
                fontSize: 35,
                fontWeight: '500',
              }}
              onChangeText={text => this.handleInputChange('titleText', text)}
              value={titleText}
              placeholder="Title"
            />
            <TextInput
              style={{
                fontSize: 27,
              }}
              onChangeText={text => this.handleInputChange('descriptionText', text)}
              value={descriptionText}
              multiline
              placeholder="Description"
            />
          </View>
          <View
            style={{
              flex: 5,
              // justifyContent: '',
              alignItems: 'center',
            }}
          >
            {
              options.map((option, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // alignSelf: 'stertch',
                      width: 300,
                      marginBottom: 25,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: buttonColors[index],
                    }}
                  >
                    <TextInput
                      key={index}
                      style={{
                      }}
                      onChangeText={text => this.handleInputChangeOption(text, index)}
                      value={option.message}
                      multiline
                      placeholder="Option"
                    />
                  </View>
                );
              })
            }
            <CircleButton
              onPress={this.handleOnPressAddOption}
              style={{
                bottom: 100,
              }}
              title="+"
            />
            <CircleButton
              style={{
              }}
              onPress={this.handleOnPressSubmit}
            >
              <Icon.MaterialCommunityIcons
                name="check"
                size={26}
                style={{ marginBottom: -3 }}
                color={Colors.tintColor}
              />
            </CircleButton>
          </View>

        </Modal>
      );
    }

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
            {vote.titleText}
          </Text>
          <Text
            style={{
              fontSize: 27,
            }}
          >
            {vote.descriptionText}
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
                    // width: 300,
                    marginBottom: 25,
                    // height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: buttonColors[index],
                  }}
                >
                  <StyledButton
                    title={option.message}
                    onPress={() => this.vote(vote._id, option)}
                  />
                  <Badge
                    value={option.votedUsers.length}
                    status="success"
                    containerStyle={{
                      position: 'absolute',
                      top: -10,
                      left: -10,
                    }}
                  />
                  {/* <Text>{option.message.toUpperCase()}</Text> */}
                </View>
              );
            })
          }
        </View>

      </Modal>
    );
  }

  handleInputChange = (field, value) => {
    this.setState((state) => {
      return {
        newVote: {
          ...state.newVote,
          [field]: value,
        },
      };
    });
  }

  handleInputChangeOption = (value, index) => {
    const {
      newVote: {
        options: newOptions,
      },
    } = this.state;
    newOptions[index] = {
      ...newOptions[index],
      message: value,
      votedUsers: [],
    };
    this.setState((state) => {
      return {
        newVote: {
          ...state.newVote,
          options: newOptions,
        },
      };
    });
  }

  handleOnPressSubmit = async () => {
    const { newVote } = this.state;
    newVote.isOpen = true;
    newVote.voteCount = 0;

    const { success } = await callApi('post', '/vote/create', newVote);
    if (!success) {
      // DO SOME LOGIC HERE
    }
    this.setState({
      isModalOpen: false,
      isAddingVote: false,
      newVote: {
        titleText: '',
        descriptionText: '',
        options: [],
      },
    });
    await this.fetchAllVotes();
  }


  toggleModal = () => {
    this.setState((state) => {
      return {
        isModalOpen: !state.isModalOpen,
        isAddingVote: false,
        newVote: {
          titleText: '',
          descriptionText: '',
          options: [],
        },
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
          {
            hasVotes
            && this.renderVotes(votes)
          }
          {
            !isCoach
            && (
              <CircleButton
                onPress={this.handleOnPressAddVote}
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
