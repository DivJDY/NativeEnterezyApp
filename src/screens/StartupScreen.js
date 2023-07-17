/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {View} from 'react-native';
import React from 'react';
import {startup_styles} from '../styles/StartupStyle';
import {Card, Text} from 'react-native-paper';
import HeadingImage from '../components/HeadingImage';
import BtnComponent from '../components/BtnComponent';

const StartupScreen = ({navigation}) => {
  const handleStart = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={startup_styles.container}>
      <HeadingImage />

      <View>
        <Card style={[startup_styles.card_body, {paddingTop: -10}]}>
          <Card.Content>
            <Text
              style={[startup_styles.body, {textDecorationLine: 'underline'}]}
              variant="titleLarge">
              Rent Store Shelves
            </Text>
            <Text
              style={[startup_styles.body, {paddingTop: 5}]}
              variant="bodyLarge">
              With Guaranteed Montly Returns
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={[startup_styles.card_body, {marginTop: 5, paddingTop: -10}]}>
          <Card.Content>
            <Text
              style={[startup_styles.body, {textDecorationLine: 'underline'}]}
              variant="titleLarge">
              Buy Products
            </Text>
            <Text
              style={[startup_styles.body, {paddingTop: 5}]}
              variant="bodyLarge">
              With Best Margins & Quality
            </Text>
          </Card.Content>
        </Card>
      </View>

      <BtnComponent title={'START'} handleSubmit={handleStart} />
    </View>
  );
};

export default StartupScreen;
