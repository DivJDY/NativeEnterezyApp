/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useContext} from 'react';
import TextInputComponent from '../components/TextInput';
import {textinput_style} from '../styles/TextInputStyle';
import BtnComponent from '../components/BtnComponent';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [mobile, setMobile] = useState();
  const {login} = useContext(AuthContext);

  const handleSubmit = () => {
    login();
  };
  return (
    <KeyboardAvoidingView
      enabled
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#FECE00',
            height: 200,
            borderBottomRightRadius: 100,
          }}>
          <Text>LoginScreen</Text>
        </View>

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

          <BtnComponent title={'Login'} handleSubmit={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
