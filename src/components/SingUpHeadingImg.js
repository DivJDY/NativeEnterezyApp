/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

const SinUpHeadingImg = () => {
  return (
    <Image
      source={require('../../assets/logo.jpg')}
      resizeMode="stretch"
      style={{width: '100%', height: 100, marginBottom: '20%'}}
    />
  );
};

export default SinUpHeadingImg;
