/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {styles} from '../styles/cardStyles';
import {useNavigation} from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{flex: 1, alignItems: 'center', marginVertical: 15}}>
        <Text
          variant="titleLarge"
          style={[styles.cardTitle, {textAlign: 'center', marginBottom: 30}]}>
          Please take screen shot of the QR code to make payment
        </Text>

        <Image
          resizeMode="contain"
          source={require('../../assets/QRCode.png')}
          style={{marginBottom: 50}}
        />
        <Button
          mode="outlined"
          style={{borderRadius: 12}}
          onPress={() => navigation.navigate('HomeStack')}>
          Done
        </Button>
      </View>
    </>
  );
};

export default PaymentScreen;
