/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {startup_styles} from '../styles/StartupStyle';
import {textinput_style} from '../styles/TextInputStyle';
import HeadingImage from '../components/HeadingImage';
import TextInputComponent from '../components/TextInput';
import BtnComponent from '../components/BtnComponent';

const GetOtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState();
  const handleSubmit = () => {
    // console.warn('hhh');
    navigation.navigate('CreateAcc');
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message:
              'This app needs access to your location ' +
              'to get your current location.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              // setLocation(`${latitude}, ${longitude}`);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);
  return (
    <View style={startup_styles.container}>
      <KeyboardAvoidingView
        enabled
        style={{height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadingImage />

          <View
            style={{
              alignItems: 'center',
              marginTop: '24%',
              marginBottom: '10%',
            }}>
            <Text style={textinput_style.placholderStyle}>Enter OTP</Text>

            <TextInputComponent
              width={'25%'}
              value={otp}
              placeholder={'XXXX'}
              onChange={number => setOtp(number)}
              keyboardType="numeric"
            />

            <BtnComponent title={'NEXT'} handleSubmit={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GetOtpScreen;
