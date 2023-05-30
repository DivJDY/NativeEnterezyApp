import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

function TextComponent({text, style}) {
  console.warn(text);
  return <Text style={style}>{text}</Text>;
}

const style = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default TextComponent;
