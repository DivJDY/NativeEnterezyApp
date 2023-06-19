/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';

function TextInputComponent({
  placeholder,
  onChangeText,
  onBlur,
  value,
  style,
  multiline,
  disabled,
  keyboardType,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={[style, {backgroundColor: 'transparent', borderWidth: 2}]}
      keyboardType={keyboardType}
      multiline={multiline}
      contentContainerStyle={{alignItems: 'flex-start'}}
      disabled={disabled}
      theme={{
        colors: {
          primary: 'black', // Change this to the desired color for the cursor
        },
      }}
    />
  );
}

export default TextInputComponent;
