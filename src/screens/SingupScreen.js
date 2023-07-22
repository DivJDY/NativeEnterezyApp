/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {HelperText} from 'react-native-paper';
import {startup_styles} from '../styles/StartupStyle';
import {styles} from '../styles/formStyles';
import HeadingImage from '../components/HeadingImage';
import TextInputComponent from '../components/TextInput';
import {textinput_style} from '../styles/TextInputStyle';
import BtnComponent from '../components/BtnComponent';

const SingupScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');

  const handleSubmit = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    // console.warn('pp');
    navigation.navigate('OtpScreen', {otp: randomCode});
  };

  const validateMobileNumber = text => {
    return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(text);
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
              marginBottom: 10,
            }}>
            <Text style={textinput_style.placholderStyle}>
              Enter Mobile Number
            </Text>
            <TextInputComponent
              width={'65%'}
              value={mobile}
              placeholder={'+91-xxxxxxx'}
              onChange={number => setMobile(number)}
              // keyboardType="numeric"
              keyboardType="number-pad"
            />
            {mobile && (
              <HelperText
                style={styles.error}
                type="error"
                visible={!validateMobileNumber(mobile)}>
                Invalid mobile number
              </HelperText>
            )}

            <BtnComponent
              title={'Get OTP'}
              color={
                mobile.length === 0 || mobile.length !== 10 ? '#ccc' : '#FECE00'
              }
              // color={'#FECE00'}
              handleSubmit={handleSubmit}
              disabled={
                mobile.length === 0 || mobile.length !== 10 ? true : false
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SingupScreen;
