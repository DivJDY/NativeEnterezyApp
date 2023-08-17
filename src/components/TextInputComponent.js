/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput} from 'react-native-paper';

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
      textColor="#000"
      placeholderTextColor={'#000'}
      mode="Flat"
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={[style, {backgroundColor: '#fff', borderWidth: 2}]}
      keyboardType={keyboardType}
      multiline={multiline}
      contentContainerStyle={{alignItems: 'flex-start'}}
      disabled={disabled}
      theme={{
        colors: {
          primary: '#000', // Change this to the desired color for the cursor
        },
      }}
    />
  );
}

export default TextInputComponent;
