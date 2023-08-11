/* eslint-disable react-native/no-inline-styles */
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React from 'react';
import Category from '../components/Category';
import Brand from '../components/Brand';
import TypeOfAsset from '../components/TypeOfAsset';
import {adminStyle} from '../styles/adminInputStyles';

const AdminInputs = () => {
  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          style={{marginBottom: 15}}
          showsVerticalScrollIndicator={false}>
          <Brand />
          <View style={[adminStyle.bottomLayer, {marginTop: 20}]} />

          <TypeOfAsset />
          <View style={[adminStyle.bottomLayer, {marginTop: 20}]} />

          <Category />
          <View style={adminStyle.bottomLayer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AdminInputs;
