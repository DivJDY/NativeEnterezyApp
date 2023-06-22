/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import TextComponent from '../components/TextComponent';
import {styles} from '../styles/formStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import {hostName} from '../../App';

function LoginScreen({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const requestOption = FetchUtilityOptions();
  const userLogin = async () => {
    const data = {mobile_number: mobileNumber};
    // Alert.alert(JSON.stringify(data));

    await fetch(hostName + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        console.warn('7777', response);
        Alert.alert(response.message);
        setMobileNumber('');

        if (response.status === 201) {
          AsyncStorage.setItem('userId', JSON.stringify(response.user_id));
          setUserLoggedIn();
          Alert.alert(response.message);
          navigation.navigate('MainScreen');
        } else {
          navigation.navigate('LogIn');
        }
      })
      .catch(err => console.warn(' **** ==> ', err));
  };

  const setUserLoggedIn = async () => {
    try {
      await AsyncStorage.setItem('userLoggedIn', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, {marginHorizontal: 10}]}>
      <KeyboardAvoidingView
        enabled
        style={{marginTop: '20%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{marginBottom: 15}}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: '10%',
              fontWeight: 'bold',
              color: 'black',
            }}>
            LogIn
          </Text>

          <TextInput
            mode="contain"
            label={''}
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text)}
            placeholder="Enter Your Mobile Number"
            theme={{
              colors: {
                primary: 'black', // Change this to the desired color for the cursor
              },
            }}
            style={styles.pwTxtInp}
            keyboardType="numeric"
          />
          {mobileNumber.length !== 10 && (
            <TextComponent
              text={'Please enter 10 digits Mobile number'}
              style={styles.error}
            />
          )}

          <Button
            style={{
              backgroundColor: mobileNumber.length !== 10 ? '#ccc' : 'black',
              marginTop: 15,
              padding: 3,
              marginHorizontal: 10,
            }}
            labelStyle={{
              color: mobileNumber.length !== 10 ? '#888' : '#fff',
              fontWeight: 'bold',
              fontSize: 18,
            }}
            disabled={mobileNumber.length !== 10 ? true : false}
            onPress={userLogin}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>LogIn</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginScreen;
