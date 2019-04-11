import React, { Component } from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../constants/Colors';


const StyledButton = (props) => {
  return (
    <View
      style={{
        borderRadius: 50,
        width: 150,
        overflow: 'hidden',
      }}
    >
      <Button
        buttonStyle={{
          width: 150,
          borderRadius: 50,
        }}
        containaerStyle={{
        }}
        titleStyle={{
          fontSize: 14,
          fontWeight: '500',
          fontFamily: 'roboto',
          color: Colors.tintColor,
        }}
        type="outline"
        {...props}
        background={
          Platform.OS !== 'ios' ?
          TouchableNativeFeedback.Ripple(Colors.secondaryColor, false) :
          undefined
        }
      />
    </View>
  );
};

export default StyledButton;
