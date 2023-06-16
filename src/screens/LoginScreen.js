/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextComponent from '../components/TextComponent';
import TextInputComponent from '../components/TextInputComponent';
import {styles} from '../styles/formStyles';
import ButtonComponent from '../components/ButtonComponent';

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .length(10)
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  email: Yup.string().email('Invalid email').required('Email Required'),
});

function LoginScreen({navigation}) {
  const userLogin = async values => {
    // await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    Alert.alert(JSON.stringify(values));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          mobileNumber: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          // setUserLoggedIn(values);
          userLogin(values);

          // console.warn(values);
          // navigation.navigate('Home');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style={{marginBottom: 15}}>
              <View style={styles.formContainer}>
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

                <TextComponent
                  text="OR"
                  style={{textAlign: 'center', fontWeight: 'bold'}}
                />

                <TextInputComponent
                  label="Mobile Number"
                  placeholder={'Enter Mobile Number'}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  keyboardType="numeric"
                  value={values.mobileNumber}
                  style={styles.input}
                />

                {errors.mobileNumber && touched.mobileNumber && (
                  <TextComponent
                    text={errors.mobileNumber}
                    style={styles.error}
                  />
                )}
                <ButtonComponent name="Submit" onPress={handleSubmit} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;

