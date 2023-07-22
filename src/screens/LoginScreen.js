/* eslint-disable react-native/no-inline-styles */

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Text, Button, HelperText} from 'react-native-paper';
import {styles} from '../styles/formStyles';
import TextInputComponent from '../components/TextInput';
import {AuthContext} from '../context/AuthContext';
import HeadingImage from '../components/HeadingImage';
import {login_style} from '../styles/loginStyles';
import {number} from 'yup';

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

  const validateMobileNumber = text => {
    return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(text);
  };

  const isValidCode = text => {
    return /^\d{4}$/.test(text);
  };
  const onChangeMobile = phone => {
    setMobile(phone);
  };

  const onMobileNumberSubmit = () => {
    if (validateMobileNumber(mobile)) {
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      console.warn(' ===> submit ==> ', randomCode);
      setOtp(randomCode);
    }
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
              keyboardType="number-pad"
              onChange={onChangeMobile}
              onMobileNumberSubmit={onMobileNumberSubmit}
            />
            {mobile && (
              <HelperText
                style={styles.error}
                type="error"
                visible={!validateMobileNumber(mobile)}>
                Invalid mobile number
              </HelperText>
            )}

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
              keyboardType="number-pad"
              // editable={false}
            />
            {otp && (
              <HelperText
                style={styles.error}
                type="error"
                visible={!isValidCode(otp)}>
                Invalid verification code. Enter 4 digits.
              </HelperText>
            )}

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
