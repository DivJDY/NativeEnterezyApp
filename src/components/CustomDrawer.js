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
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.warn('AsyncStorage cleared successfully');
      navigation.navigate('Signup');
    } catch (error) {
      console.log(error);
    }
  };

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
      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '30%',
            marginBottom: 10,
          }}>
          <MaterialIcons name="logout" size={22} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Roboto-Medium',
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            LogOut
          </Text>
        </View>
      </TouchableOpacity>
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

        {/* </TouchableOpacity> */}
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
