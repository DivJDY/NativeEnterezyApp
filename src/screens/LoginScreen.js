/* eslint-disable react-native/no-inline-styles */

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Text, Button} from 'react-native-paper';
import TextInputComponent from '../components/TextInput';
import {AuthContext} from '../context/AuthContext';
import HeadingImage from '../components/HeadingImage';
import {login_style} from '../styles/loginStyles';

const LoginScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const {login} = useContext(AuthContext);

  const handleSubmit = () => {
    if (mobile.length === 0 || otp.length === 0) {
      Alert.alert('Please enter Mobile Number name ans OTP');
    } else {
      login();
    }
  };

  const handleSingUp = () => {
    navigation.navigate('Startup');
  };
  return (
    <View>
      <KeyboardAvoidingView
        enabled
        style={{height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadingImage />

          <Text variant="displayMedium" style={login_style.title}>
            Login
          </Text>
          <Text style={login_style.subtitle}>Sign In to Continue</Text>

          <View
            style={{
              alignItems: 'center',
              marginBottom: '8%',
            }}>
            <Text
              variant="bodyLarge"
              style={[login_style.placeholderStyle, {marginLeft: '-40%'}]}>
              Mobile Number
            </Text>

            <TextInputComponent
              width={'65%'}
              value={mobile}
              placeholder={'+91-xxxxxxx'}
              onChange={number => setMobile(number)}
              keyboardType="numeric"
            />

            <Text
              variant="bodyLarge"
              style={[login_style.placeholderStyle, {marginLeft: '-60%'}]}>
              OTP
            </Text>

            <TextInputComponent
              width={'65%'}
              value={otp}
              placeholder={'xxxx'}
              onChange={Otp => setOtp(Otp)}
              keyboardType="numeric"
            />

            {/* <BtnComponent title={'Login'} handleSubmit={handleSubmit} /> */}
            <Button
              style={login_style.btn}
              mode="contained"
              onPress={handleSubmit}>
              <Text variant="bodyLarge" style={login_style.btnText}>
                Log In
              </Text>
            </Button>

            <Text variant="bodyLarge" marginTop={'5%'}>
              Forgot SingUp
            </Text>
            <Text
              variant="bodyLarge"
              style={login_style.signup}
              onPress={handleSingUp}>
              SingUp
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
