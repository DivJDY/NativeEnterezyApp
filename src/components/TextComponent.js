import React from 'react';
import {Text} from 'react-native-paper';

function TextComponent({text, style}) {
  // console.warn(text);
  return <Text style={style}>{text}</Text>;
}

export default TextComponent;
