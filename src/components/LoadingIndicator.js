/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View style={{marginVertical: 20}}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingIndicator;
