/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // await AsyncStorage.clear();
      await AsyncStorage.removeItem('userLoggedIn');
      console.warn('AsyncStorage cleared successfully');
      navigation.navigate('LogIn');
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

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{marginTop: 5, marginBottom: 18}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Roboto-Medium',
            marginLeft: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          App Version 1.1
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
