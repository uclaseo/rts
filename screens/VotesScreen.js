import React, { Component } from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
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
    openVotes: [],
    closedVotes: [],
    isModalOpen: false,
  };

  async componentDidMount() {
    await this.fetchAllVotes();
  }

  fetchAllVotes = async () => {
    const allVotes = await Promise.all([
      this.fetchOpenVotes(),
      this.fetchClosedVotes(),
    ]);
    const openVotes = allVotes[0];
    const closedVotes = allVotes[1];
    this.setState({
      openVotes,
      closedVotes,
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

  handleOnPress = async () => {
    try {
      const voteOption = {
        id: 1,
        title: 'First Vote',
        text: 'this is the first vote',
        options: [
          { message: 'yes', count: 0 },
          { message: 'no', count: 0 },
          { message: 'I dont know', count: 0 },
        ],
        isOpen: true,
      };
      const { success } = await callApi('post', '/vote/create', voteOption);
      if (!success) {
        // DO SOME LOGIC HERE
      }
      await this.fetchAllVotes();

    } catch (error) {
      return console.error('VotesScreen - handleOnPress error: ', error);
    }

  }

  renderOpenVotes = (openVotes) => {

    return (
      <FlatList
        data={openVotes}
        keyExtractor={vote => vote._id}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <View
              style={{
                height: 60,
                backgroundColor: 'yellow',  // EACH LIST ITEM CONTAINER
                flexDirection: 'row',
                marginTop: 7,
                marginBottom: 7,
              }}
            >


              <View
                style={{
                  flex: 1,
                  backgroundColor: 'yello',
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
                  value="30"
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
                    backgroundColor: 'green',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 27,
                    }}
                    numberOfLines={1}
                  >
                    This is Title
                  </Text>
                </View>
                <View
                  style={{
                    height: 27,
                    justifyContent: 'center',
                    backgroundColor: 'pink',
                  }}
                >
                  <Text>This is message</Text>
                </View>
              </View>














              {/* <View
                style={{
                  height: 50,
                  backgroundColor: 'green', // IN EACH LIST, TITLE CONTAINER
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                  // adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {item.title} this is first vote's title it should be long
                </Text>
              </View>
              <View
                style={{
                  height: 30,
                  backgroundColor: 'blue', // IN EACH LIST, CONTENT CONTAINER
                }}
              >
                <View
                  style={{
                    // backgroundColor: 'green', // IN CONTENT CONTAINER, TEXT CONTAINER
                  }}
                >
                  <Text style={{}}>{item.text}</Text>
                </View>
                <View
                  style={{
                    // backgroundColor: 'green', // IN CONTENT CONTAINER, TOTAL VOTE CONTAINER
                  }}
                >
                  <Text style={{}}>{item.options[0].message}</Text>
                </View>
              </View> */}
            </View>
          );
        }}
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

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
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
          style={{ ...styles.contentContainer, flex: 2 }}
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
          style={{
            ...styles.contentContainer,
            flexDirection: 'row',
            // justifyContent: 'stretch',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 30,
            }}
          >
            <CircleButton
              onPress={this.handleOnPress}
              title="+"

            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 30,
            }}
          >
            <StyledButton
              onPress={this.toggleModal}
              title="open modal"
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.isModalOpen}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
              // presentationStyle="overFullScreen "
            >
              <View style={{marginTop: 22}}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.toggleModal(!this.state.isModalOpen);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>


          </View>
        </View>
      </View>
    );
  }
}
