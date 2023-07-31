/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Card, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context/AuthContext';
import {title, subTitle} from './SinupTitle';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerHeading />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff'}}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          paddingTop: 5,
          paddingHorizontal: 10,
          borderTopWidth: 2,
          borderTopColor: '#ccc',
        }}>
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
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 14,
              alignItems: 'center',
            }}>
            <MaterialIcons name="logout" size={28} />
            <Text style={style.logout}>LogOut</Text>
          </View>
        </TouchableOpacity>

        <Text style={style.txtVersion}>App Version 1.1</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

// Drawer Heading image and Custome drawer styles
const style = StyleSheet.create({
  bg: {
    height: 220,
    width: '100%',
    backgroundColor: '#FECE00',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0, // Set other border radii to 0
    overflow: 'hidden', // Make sure content is clipped to the rounded border
    marginBottom: -20,
  },
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: '30%',
    marginTop: -20,
    width: 90,
    height: 110,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
  },
  subTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  logout: {
    fontSize: 18,
    // fontFamily: 'Roboto-Medium',
    marginLeft: 14,
    fontWeight: 'bold',
  },
  txtVersion: {
    fontSize: 16,
    // fontFamily: 'Roboto-Medium',]
    marginLeft: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
});

const DrawerHeading = () => {
  return (
    <View>
      <Card style={style.bg}>
        <Card.Content>
          <Image
            resizeMode="contain"
            source={require('../../assets/logo.jpg')}
            style={style.image}
          />
          <Text style={style.title} variant="displaySmall">
            {title}
          </Text>
          <Text style={style.subTitle} variant="titleLarge">
            {subTitle}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};
