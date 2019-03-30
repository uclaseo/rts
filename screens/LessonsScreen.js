import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class LessonsScreen extends React.Component {
  static navigationOptions = {
    title: 'Lessons',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <MonoText style={styles.codeHighlightText}>hi</MonoText>
      </ScrollView>
    );
  }
}
