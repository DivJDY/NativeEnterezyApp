/* eslint-disable prettier/prettier */
import {TextInput} from 'react-native-paper';
import React from 'react';
import {textinput_style} from '../styles/TextInputStyle';

const TextInputComponent = ({
  width,
  height,
  placeholder,
  value,
  onChange,
  keyboardType,
  multiline,
  editable,
  onSubmitEditing,
}) => {
  return (
    <TextInput
      multiline={multiline}
      // editable={false}
      placeholder={placeholder}
      value={value}
      textColor="white"
      placeholderTextColor={'white'}
      style={[textinput_style.inputStyle, {width: width, height: height}]}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      mode="Flat"
      keyboardType={keyboardType}
      theme={{
        colors: {
          primary: 'white', // Change this to the desired color for the cursor
        },
      }}
    />
  );
};

export default TextInputComponent;
