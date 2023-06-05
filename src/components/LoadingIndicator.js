/* eslint-disable react-native/no-inline-styles */
import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View style={{marginTop: 20}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingIndicator;
