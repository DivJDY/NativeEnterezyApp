/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import HeadingImage from '../components/HeadingImage';
import {startup_styles} from '../styles/StartupStyle';
import BtnComponent from '../components/BtnComponent';
import {AuthContext} from '../context/AuthContext';

const ThanksSignup = () => {
  const {login} = useContext(AuthContext);
  const navigation = useNavigation();
  const title = 'Thanks For Signing Up';
  const subTitle =
    " Let's make some Money via Shelf Renting & Buying Products with Enterezy.";

  const handleSubmit = async () => {
    // const isSignedUpValue = await AsyncStorage.getItem('isSignedUp');

    // console.warn("set an value ", isSignedUpValue )

    // // If the user is signed in, navigate to the main screen
    // if (isSignedUpValue) {
    //     navigation.replace('HomeDrawer');
    // }
    login();
    // navigation.replace('Home');
  };
  return (
    <View style={startup_styles.container}>
      <HeadingImage />

      <Text style={startup_styles.thanksTitle} variant="titleLarge">
        {title}
      </Text>

      <Text style={startup_styles.thanksSubtitle} variant="titleMedium">
        {subTitle}
      </Text>

      <BtnComponent
        color={'#FECE00'}
        title={'START'}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default ThanksSignup;
