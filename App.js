import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
  Icon,
} from 'expo';
import axios from 'axios';
import AppNavigator from './navigation/AppNavigator';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    // react-native + expo do not recognize localhost
  //   const localAddress = 'http://192.168.86.194';
  //   const localPort = '3000';
  //   axios.get(`${localAddress}:${localPort}`)
  //     .then((response) => {
  //       console.log('response from local server', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('error from local server', error);
  //     });
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    }),
  ]);

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        {/* <StatusBar hidden /> */}
        <StatusBar />
        <AppNavigator />
      </View>
    );
  }
}

App.propTypes = {
  skipLoadingScreen: PropTypes.string,
};

App.defaultProps = {
  skipLoadingScreen: '',
};
