/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class NoDataFound extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          No Cart Item Found
        </Text>
      </View>
    );
  }
}

export default NoDataFound;
