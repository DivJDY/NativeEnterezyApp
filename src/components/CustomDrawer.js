/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AppState,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context/AuthContext';

const CustomDrawer = props => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const {logout} = useContext(AuthContext);

  const navigation = useNavigation();

  //useEffect(() => {
  //const handleAppStateChange = nextAppState => {
  //if (appState.match(/inactive|background/) && nextAppState === 'active') {
  // App has come back to the foreground
  // Check if the user is logged out and perform any necessary actions
  // if (isLoggedOut) {
  // Reload the app
  //reloadApp();
  //  }
  //}
  //setAppState(nextAppState);
  //};

  //AppState.addEventListener('change', handleAppStateChange);

  // return () => {
  // AppState.removeEventListener('change', handleAppStateChange);
  // };
  // }, [appState, isLoggedOut]);

  

  const handleLogout = async () => {
    try {
      // await AsyncStorage.clear();
      // await AsyncStorage.removeItem('isSignedUp');
      //setIsLoggedOut(true);
      // handleCloseDrawer();
      // console.warn('AsyncStorage cleared successfully');
      // Clear the signup status from AsyncStorage
      // await AsyncStorage.removeItem('isSignedUp');

      // Navigate to the signup screen
      // navigation.navigate('Login');
      //RNRestart.Restart();
      // navigation.replace('Login');
      logout();
      
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

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 30}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirmation',
              'Are you sure you want do logout ',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'OK',
                  onPress: () => {
                    handleLogout();
                  },
                },
              ],
              {cancelable: true},
            );
          }}
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
