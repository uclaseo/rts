import React, { Component } from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../constants/Colors';


export const StyledButton = (props) => {
  return (
    <View
      style={{
        width: 150,
        borderRadius: 50,
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
        Platform.OS !== 'ios'
          ? TouchableNativeFeedback.Ripple(Colors.tintColor, false)
          : undefined
        }
      />
    </View>
  );
};

export const CircleButton = (props) => {
  const size = props.size ? props.size : 40;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
      }}
    >
      <Button
        buttonStyle={{
          width: size,
          height: size,
          borderRadius: size / 2,
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
        Platform.OS !== 'ios'
          ? TouchableNativeFeedback.Ripple(Colors.tintColor, false)
          : undefined
        }
      />
    </View>
  );
};