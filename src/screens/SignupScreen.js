/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {styles} from '../styles/formStyles';
import {Button, Text} from 'react-native-paper';
import TextComponent from '../components/TextComponent';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Enter Your Name'),
  shopName: Yup.string().required('Enter Your Shop Name'),
  mobileNumber: Yup.string().length(10).required('Enter valid Mobile Number'),
  address: Yup.string().required('Address'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  gstin: Yup.string()
    .matches(
      /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/,
      'Invalid GSTIN',
    )
    .required('GSTIN Required'),
});

const SignupScreen = ({navigation}) => {
  const [otp, setOTP] = useState('');
  const [checkOTP, setCheckOTP] = useState(false);
  const [location, setLocation] = useState(null);
  const [values, setValues] = useState({
    name: '',
    shopName: '',
    mobileNumber: '',
    otp: '',
    address: '',
    location: '',
    email: '',
    gstin: '',
  });
  const GenerateOTP = () => {
    setCheckOTP(true);
    const randomNumber = (Math.floor(Math.random() * 1000) + 1000).toString();
    setOTP(randomNumber);
    // setValues({otp: randomNumber});
    // setValues(prevState => ({...prevState, [otp]: randomNumber}));
    console.warn('oooo => ' + randomNumber + ' -> ' + values.otp);
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
              setLocation(`${latitude}, ${longitude}`);
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
  }, [navigation, values]);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{marginBottom: 15}}>
          <Formik
            initialValues={values}
            validationSchema={SignupSchema}
            onSubmit={values => {
              navigation.navigate('Home');
              console.warn(values);
            }}

            // onSubmit={values => console.warn(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <TextInputComponent
                  label="Name"
                  placeholder={'Enter Your Name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                />
                {errors.name && touched.name && (
                  <TextComponent text={errors.name} style={styles.error} />
                )}

                <TextInputComponent
                  label="Shop Name"
                  placeholder={'shopName'}
                  onChangeText={handleChange('shopName')}
                  onBlur={handleBlur('shopName')}
                  value={values.shopName}
                  style={styles.input}
                />
                {errors.shopName && touched.shopName && (
                  <TextComponent text={errors.shopName} style={styles.error} />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // alignContent: 'center',
                  }}>
                  <TextInputComponent
                    label="Mobile Number"
                    placeholder={'Enter Mobile Number'}
                    onChangeText={handleChange('mobileNumber')}
                    onBlur={handleBlur('mobileNumber')}
                    keyboardType="numeric"
                    value={values.mobileNumber}
                    style={styles.input}
                  />

                  <Button
                    disabled={checkOTP ? true : false}
                    style={{marginLeft: -70, marginBottom: 10}}
                    onPress={GenerateOTP}>
                    Verify
                  </Button>
                </View>
                {errors.mobileNumber && touched.mobileNumber && (
                  <TextComponent
                    text={errors.mobileNumber}
                    style={styles.error}
                  />
                )}

                <TextInputComponent
                  label="OTP"
                  placeholder={'Enter Recieved 4 digit OTP'}
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  keyboardType="numeric"
                  disabled={true}
                  value={otp}
                  style={styles.input}
                />
                {errors.otp && touched.otp && (
                  <TextComponent text={errors.otp} style={styles.error} />
                )}

                <TextInputComponent
                  label="Address"
                  placeholder={'Enter Your Address'}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  multiline={true}
                  value={values.address}
                  style={styles.input}
                />
                {errors.address && touched.address && (
                  <TextComponent text={errors.address} style={styles.error} />
                )}

                <TextInputComponent
                  label="Email ID"
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />
                {errors.email && touched.email && (
                  <TextComponent text={errors.email} style={styles.error} />
                )}

                <TextInputComponent
                  label="GSTIN"
                  placeholder={'GSTIN'}
                  onChangeText={handleChange('gstin')}
                  onBlur={handleBlur('gstin')}
                  // keyboardType="number-pad"
                  value={values.gstin}
                  style={styles.input}
                />
                {errors.gstin && touched.gstin && (
                  <TextComponent text={errors.gstin} style={styles.error} />
                )}

                <ButtonComponent name="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          {/* <View
            style={{
              marginLeft: 30,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text>
              If you already SignUp.Click here to{' '}
              <Text
                style={{color: 'blue', fontWeight: 'bold'}}
                onPress={() => navigation.navigate('Login')}>
                SignIn
              </Text>
            </Text>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;
