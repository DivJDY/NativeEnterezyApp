/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {adminStyle} from '../styles/adminInputStyles';
import BrandData from '../components/GetBrandData';
import GetAssetData from '../components/GetAssetData';
import GetCategory from '../components/GetCategory';

const Admin = () => {
  return (
    <View style={{flex: 1}}>
      <BrandData />
      <View style={[adminStyle.bottomLayer, {marginTop: 20}]} />
      <GetAssetData />
      <View style={[adminStyle.bottomLayer, {marginTop: 20}]} />
      <GetCategory />
    </View>
  );
};

export default Admin;
