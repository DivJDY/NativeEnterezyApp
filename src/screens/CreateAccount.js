/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {startup_styles} from '../styles/StartupStyle';
import {text_style} from '../styles/TextStyle';
import {textinput_style} from '../styles/TextInputStyle';
import HeadingImage from '../components/HeadingImage';
import BtnComponent from '../components/BtnComponent';
import TextInputComponent from '../components/TextInput';

const CreateAccount = ({navigation}) => {
  const [ownerName, setOwnerName] = useState();
  const [storeName, setStoreName] = useState();
  const handleSubmit = () => {
    navigation.navigate('GoogleMap');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={startup_styles.container}>
      <KeyboardAvoidingView
        enabled
        style={{height: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadingImage />

          <Text variant="headlineSmall" style={text_style.headlineSmall}>
            Create new Account
          </Text>
          <Text variant="titleMedium" style={text_style.titleMedium}>
            Already Registered? Log in{' '}
            <Text style={text_style.link} onPress={handleLogin}>
              here
            </Text>
          </Text>
          <View style={{marginTop: 5, marginBottom: 10}}>
            <View style={{alignItems: 'center', marginTop: 25}}>
              <Text
                variant="bodyMedium"
                style={[textinput_style.inputTitle, {marginBottom: -10}]}>
                Enter Owner Name{' '}
              </Text>
              <TextInputComponent
                width={'60%'}
                value={ownerName}
                placeholder={'xxxxxx'}
                onChange={text => setOwnerName(text)}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                variant="bodyLarge"
                style={[
                  textinput_style.inputTitle,
                  {
                    marginTop: 25,
                    marginBottom: -5,
                  },
                ]}>
                Enter Store Name{' '}
              </Text>
              <TextInputComponent
                width={'60%'}
                value={storeName}
                placeholder={'xxxxxxxxx'}
                onChange={text => setStoreName(text)}
              />
            </View>

            <View style={{marginTop: '-15%'}}>
              <BtnComponent title={'NEXT'} handleSubmit={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
