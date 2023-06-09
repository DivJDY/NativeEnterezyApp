/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import {styles} from '../styles/formStyles';
import {NativeModules, NativeEventEmitter} from 'react-native';
import SinUpHeadingImg from '../components/SingUpHeadingImg';

const {OtplessModule} = NativeModules;

const SignUpScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [otplessResult, setOtplessResult] = useState();

  const navigation = useNavigation();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    navigation.navigate('GoogleMap');
    // Alert.alert('SignUp Done');
    // / to show OTPLESS popup
    // OtplessModule.startOtplessWithEvent();

    // // to receive otplessUser details and token
    // const eventListener = new NativeEventEmitter(OtplessModule).addListener(
    //   'OTPlessSignResult',
    //   result => {
    //     if (result.data == null || result.data == undefined) {
    //       let error = result.errorMessage;
    //     } else {
    //       const token = result.data.token;
    //       console.warn(' token ', token);
    //       // send this token to your backend to validate user details
    //       setOtplessResult(token);
    //     }
    //   },
    // );
    // // call this method when you login is completed
    // OtplessModule.onSignInCompleted();
  };

  const sinupfirststep = () => {
    return (
      <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
        <SinUpHeadingImg />
        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
          Enter Mobile Number
        </Text>
        <TextInputComponent
          label="Mobile Number"
          placeholder={'Enter Mobile Number'}
          onChangeText={text => setMobileNumber(text)}
          keyboardType="numeric"
          value={mobileNumber}
          width="100%"
          style={styles.subInp}
        />
        {mobileNumber.length === 0 || mobileNumber.length !== 10 ? (
          <TextComponent
            text={'Please Enter 10 Digits Mobile Number'}
            style={styles.error}
          />
        ) : (
          <View style={{marginBottom: 20}} />
        )}
        <Button
          onPress={handleNextStep}
          style={{
            backgroundColor:
              mobileNumber.length === 0 || mobileNumber.length !== 10
                ? '#ccc'
                : 'black',
            marginTop: 10,
            padding: 3,
          }}
          labelStyle={{
            color:
              mobileNumber.length === 0 || mobileNumber.length !== 10
                ? '#888'
                : '#fff',
            fontWeight: 'bold',
            fontSize: 18,
          }}
          disabled={
            mobileNumber.length === 0 || mobileNumber.length !== 10
              ? true
              : false
          }>
          Next
        </Button>
      </View>
    );
  };

  const sinupsecondstep = () => {
    return (
      <KeyboardAvoidingView marginBottom={20}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
            <SinUpHeadingImg />
            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Name (Owner)
            </Text>
            <TextInputComponent
              placeholder={'Please Enter Shop Owner Name'}
              onChangeText={text => setName(text)}
              value={name}
              style={styles.subInp}
            />
            {name.length === 0 ? (
              <TextComponent
                text={'Please Enter Shop Owner Name'}
                style={styles.error}
              />
            ) : (
              <View style={{marginBottom: 10}} />
            )}

            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Shop Name
            </Text>
            <TextInputComponent
              placeholder={'Please Enter Shop Name'}
              onChangeText={text => setShopName(text)}
              value={shopName}
              style={styles.subInp}
            />
            {shopName.length === 0 ? (
              <TextComponent
                text={'Please Enter Shop Name'}
                style={styles.error}
              />
            ) : (
              <View style={{marginBottom: 20}} />
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <Button style={styles.submitBtn} onPress={handlePreviousStep}>
                <Text style={styles.subBtnTxt}>Previous</Text>
              </Button>
              <Button
                style={{
                  backgroundColor:
                    name.length === 0 || shopName.length === 0
                      ? '#ccc'
                      : 'black',
                  marginTop: 10,
                  padding: 3,
                }}
                labelStyle={{
                  color:
                    name.length === 0 || shopName.length === 0
                      ? '#888'
                      : '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
                disabled={
                  name.length === 0 || shopName.length === 0 ? true : false
                }
                onPress={handleSubmit}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return sinupfirststep();

      case 2:
        return sinupsecondstep();

      default:
        return null;
    }
  };

  return <View>{renderStep()}</View>;
};

export default SignUpScreen;
