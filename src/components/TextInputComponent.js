/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';

function TextInputComponent({
  placeholder,
  onChangeText,
  onBlur,
  value,
  style,
  label,
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
      // label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      // style={[
      //   style,

      //   // {backgroundColor: 'transparent'}
      // ]}
      style={[style, {backgroundColor: 'transparent', borderWidth: 2}]}
      // mode="Outlined"
      outlineColor="red"
      keyboardType={keyboardType}
      multiline={multiline}
      contentContainerStyle={{alignItems: 'flex-start'}}
      theme={theme}
      disabled={disabled}
    />
  );
}

export default TextInputComponent;
