import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  DatePickerAndroid,
  DatePickerIOS,
} from 'react-native';
import { MonoText } from '../components/StyledText';

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
      date: null,
    };
  }

  openDatePicker = async () => {    
    try {
      const isAndroid = Platform.OS === 'android';
      if (isAndroid) {
        const {
          action,
          year,
          month,
          day,
        } = await DatePickerAndroid.open({
          date: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          console.log(year, month, day);
          this.setState({
            date: `${month + 1} ${day} ${year}`,
          });
        }
      } else {
        return (
          <DatePickerIOS
            date={new Date()}
            onDateChange={this.setDate}
          />
        );
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  setDate = (date) => {
    console.log('date', date);
  }

  render() {
    const {
      date,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <MonoText style={styles.codeHighlightText}>hi</MonoText>
        <Button
          onPress={this.openDatePicker}
          title="datepicker"
        />
        <MonoText style={styles.codeHighlightText}>{date}</MonoText>
      </ScrollView>
    );
  }
}
