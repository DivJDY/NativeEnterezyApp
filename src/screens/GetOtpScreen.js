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
import {HelperText} from 'react-native-paper';
import {startup_styles} from '../styles/StartupStyle';
import {textinput_style} from '../styles/TextInputStyle';
import HeadingImage from '../components/HeadingImage';
import TextInputComponent from '../components/TextInput';
import BtnComponent from '../components/BtnComponent';
import {styles} from '../styles/formStyles';

const GetOtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState(route ? route.params.otp : '');
  const handleSubmit = () => {
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

  const isValidCode = text => {
    return /^\d{4}$/.test(text);
  };
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
              keyboardType="number-pad"
            />
            {otp && (
              <HelperText
                style={styles.error}
                type="error"
                visible={!isValidCode(otp)}>
                Invalid verification code. Enter 4 digits.
              </HelperText>
            )}

            <BtnComponent
              title={'NEXT'}
              color={otp === null ? '#ccc' : '#FECE00'}
              disabled={otp.length === 0 || otp.length !== 4 ? true : false}
              handleSubmit={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GetOtpScreen;
