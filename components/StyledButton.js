import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
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
      <TouchableWithoutFeedback
        onLongPress={props.onLongPress}
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
      </TouchableWithoutFeedback>
    </View>
  );
};

export const IOSBack = (props) => {
  return (
    <View
      style={{
        width: 150,
        borderRadius: 50,
        overflow: 'hidden',
      }}
    >
      <TouchableWithoutFeedback
        onLongPress={props.onLongPress}
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
      </TouchableWithoutFeedback>
    </View>
  );
};

export const CircleButton = (props) => {
  const size = props.size ? props.size : 60;
  const style = props.style;
  const children = props.children;
  return (
    <View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        bottom: 20,
        right: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        ...style,
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
        raised
        {...props}
        background={
        Platform.OS !== 'ios'
          ? TouchableNativeFeedback.Ripple(Colors.tintColor, false)
          : undefined
        }
        icon={children}
      />
    </View>
  );
};
