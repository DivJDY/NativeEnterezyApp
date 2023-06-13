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
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      placeholder: 'transparent',
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        ...DefaultTheme.fonts.regular,
        padding: 0,
      },
    },
  };
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
      theme={theme}
      disabled={disabled}
    />
  );
}

export default TextInputComponent;
