/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {startup_styles} from '../styles/StartupStyle';

const BtnComponent = ({title, handleSubmit, color, disabled}) => {
  return (
    <View style={startup_styles.btn_view}>
      <Button
        mode="contained"
        disabled={disabled}
        style={[startup_styles.btn, {backgroundColor: color}]}
        blurOnSubmit={'true'}
        onPress={handleSubmit}>
        <Text style={startup_styles.btnTitle}>{title}</Text>
      </Button>
    </View>
  );
};

export default BtnComponent;
