/* eslint-disable prettier/prettier */
import {View, Image} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {startup_styles} from '../styles/StartupStyle';
import {title, subTitle} from './SinupTitle';

const HeadingImage = () => {
  return (
    <View>
      <Card style={startup_styles.bg}>
        <Card.Content>
          <Image
            resizeMode="contain"
            source={require('../../assets/logo.jpg')}
            style={startup_styles.image}
          />
          <Text style={startup_styles.title} variant="titleLarge">
            {title}
          </Text>
          <Text style={startup_styles.subTitle} variant="titleMedium">
            {subTitle}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HeadingImage;
