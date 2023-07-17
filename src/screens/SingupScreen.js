/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {startup_styles} from '../styles/StartupStyle';
import HeadingImage from '../components/HeadingImage';

import TextInputComponent from '../components/TextInput';
import {textinput_style} from '../styles/TextInputStyle';
import BtnComponent from '../components/BtnComponent';

const SingupScreen = ({navigation}) => {
  const [mobile, setMobile] = useState();

  const handleSubmit = () => {
    // console.warn('pp');
    navigation.navigate('OtpScreen');
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
            <Text style={textinput_style.placholderStyle}>
              Enter Mobile Number
            </Text>

            <TextInputComponent
              width={'65%'}
              value={mobile}
              placeholder={'+91-xxxxxxx'}
              onChange={number => setMobile(number)}
              keyboardType="numeric"
            />

            <BtnComponent title={'Get OTP'} handleSubmit={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SingupScreen;
