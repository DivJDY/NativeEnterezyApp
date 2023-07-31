/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {show_rental} from '../styles/showRentals';
import {rentalStyle} from './DisplayRental';

const ShowRentals = () => {
  const numberOfComponents = 5;
  const componentsArray = Array.from({length: numberOfComponents});
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Text style={rentalStyle.rentStoreTxt}>Display Rental</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 15,
          marginHorizontal: 10,
        }}>
        <Button
          style={[show_rental.btn, {width: 140}]}
          onPress={() => Alert.alert('active')}>
          <Text style={show_rental.btnTxt}>Active</Text>
        </Button>

        <Button
          style={[show_rental.btn, {width: 120}]}
          onPress={() => Alert.alert('closed')}>
          <Text style={show_rental.btnTxt}>Closed</Text>
        </Button>
      </View>

      <KeyboardAvoidingView
        enabled
        style={{marginBottom: 160}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          <View style={{marginTop: 5, flex: 1}}>
            <Card
              style={[
                show_rental.card,
                {backgroundColor: '#BBB6B5', borderWidth: 3},
              ]}>
              <Card.Content>
                <Text variant="bodyLarge" style={show_rental.cardContent}>
                  Status - Closed
                </Text>
              </Card.Content>
              <Card.Cover
                resizeMode="contain"
                style={{marginLeft: 15, marginVertical: 10, marginRight: 10}}
                source={{
                  uri: 'https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg?w=2000',
                }}
              />

              <Card.Content style={show_rental.cardContentcontainer}>
                <Text variant="bodyLarge" style={show_rental.cardContent}>
                  Asset Name: name
                </Text>
                <Text variant="bodyLarge" style={[show_rental.cardContent]}>
                  Amount : 2000 Rs
                </Text>
              </Card.Content>
              <Card.Content style={show_rental.cardContentcontainer}>
                <Text variant="bodyLarge" style={show_rental.cardContent}>
                  Duration : 14/05/23 to 16/07/23
                </Text>
              </Card.Content>
            </Card>
          </View>
          {componentsArray.map((_, index) => (
            <View style={{marginTop: 20, flex: 1}} key={index}>
              <Card style={[show_rental.card, {backgroundColor: '#fff'}]}>
                <Card.Content>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Status - Active
                  </Text>
                </Card.Content>
                <Card.Cover
                  resizeMode="contain"
                  style={{marginLeft: 15, marginVertical: 10, marginRight: 10}}
                  source={{
                    uri: 'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg',
                  }}
                />
                <Card.Content style={show_rental.cardContentcontainer}>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Asset Name : name
                  </Text>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Amount : 2000 Rs
                  </Text>
                </Card.Content>
                <Card.Content style={show_rental.cardContentcontainer}>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Duration : 24/08/23 to 16/12/23
                  </Text>
                </Card.Content>
              </Card>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ShowRentals;
