/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';

export default function NoDataFound({message}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          paddingHorizontal: 10,
          textAlign: 'justify',
        }}>
        {message}
      </Text>
    </View>
  );
}
