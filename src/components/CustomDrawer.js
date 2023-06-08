/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'gray'}}>
        <ImageBackground
          source={require('../../assets/logo.jpg')}
          style={{padding: 20, height: 130}}
          resizeMode="stretch"
        />

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1.5,
          borderTopColor: '#ccc',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            Alert.alert('Share to friend');
          }}
          style={{paddingVertical: 15}}> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Ionicons name="share-social-outline" size={22} /> */}
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Roboto-Medium',
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            App Version 1.1
          </Text>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CustomDrawer;
