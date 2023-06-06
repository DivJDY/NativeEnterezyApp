/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

const DrawerContent = ({navigation}) => {
  const handleIconPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View>
      {/* Custom icon */}
      <TouchableOpacity onPress={handleIconPress}>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleIconPress}>
        <Text>Page</Text>
      </TouchableOpacity>

      {/* Other drawer items */}
      {/* ... */}
    </View>
  );
};

export default DrawerContent;

