/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

const ListsOfDisplayRentals = () => {
  const numberOfComponents = 5;
  const componentsArray = Array.from({length: numberOfComponents});
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <Button
        style={[show_rental.btn, {width: 200, marginLeft: 20}]}
        disabled={true}>
        <Text style={show_rental.btnTxt}>Display Rental</Text>
      </Button>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'stretch',
          marginTop: 15,
        }}>
        <Button style={[show_rental.btn, {width: 120}]} disabled={true}>
          <Text style={show_rental.btnTxt}>Active</Text>
        </Button>

        <Button style={[show_rental.btn, {width: 120}]} disabled={true}>
          <Text style={show_rental.btnTxt}>Closed</Text>
        </Button>
      </View>

      <KeyboardAvoidingView
        enabled
        // style={{marginBottom: 100, marginLeft: 12}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 20, flex: 1}}>
            <Card
              style={[
                show_rental.card,
                {backgroundColor: 'gray', borderWidth: 3},
              ]}>
              <Card.Content>
                <Text variant="bodyLarge" style={show_rental.cardContent}>
                  Status - Closed
                </Text>
              </Card.Content>
              <Card.Cover
                resizeMode="contain"
                style={{marginLeft: 20, marginVertical: 10, marginRight: 10}}
                source={{
                  uri: 'https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148547718.jpg?w=2000',
                }}
              />
              <Card.Content style={{flexDirection: 'row'}}>
                <Text variant="bodyLarge" style={show_rental.cardContent}>
                  Type of visibility
                </Text>
                <Text
                  variant="bodyLarge"
                  style={[show_rental.cardContent, {width: 120}]}>
                  Brand
                </Text>
              </Card.Content>
              <Card.Content style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                  variant="bodyLarge"
                  style={[show_rental.cardContent, {textAlign: 'center'}]}>
                  Period
                </Text>
                <Text
                  variant="bodyLarge"
                  style={[show_rental.cardContent, {width: 120}]}>
                  Amount
                </Text>
              </Card.Content>
              <Button
                style={show_rental.cardActionBtn}
                onPress={() => Alert.alert('Invoice detaisl')}>
                <Text style={{fontSize: 16, color: '#000', marginTop: 0}}>
                  Payments Recieved (Click to see Invoice)
                </Text>
              </Button>
            </Card>
          </View>
          {componentsArray.map((_, index) => (
            <View style={{marginTop: 20, flex: 1}} key={index}>
              <Card style={show_rental.card}>
                <Card.Content>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Status - Active
                  </Text>
                </Card.Content>
                <Card.Cover
                  resizeMode="contain"
                  style={{marginLeft: 20, marginVertical: 10, marginRight: 10}}
                  source={{
                    uri: 'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg',
                  }}
                />
                <Card.Content style={{flexDirection: 'row'}}>
                  <Text variant="bodyLarge" style={show_rental.cardContent}>
                    Type of visibility
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={[show_rental.cardContent, {width: 120}]}>
                    Brand
                  </Text>
                </Card.Content>
                <Card.Content style={{flexDirection: 'row', marginTop: 10}}>
                  <Text
                    variant="bodyLarge"
                    style={[show_rental.cardContent, {textAlign: 'center'}]}>
                    Period
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={[show_rental.cardContent, {width: 120}]}>
                    Amount
                  </Text>
                </Card.Content>
                <Button
                  style={show_rental.cardActionBtn}
                  onPress={() => Alert.alert('Invoice detaisl')}>
                  <Text style={{fontSize: 16, color: '#000', marginTop: 0}}>
                    Payments Recieved (Click to see Invoice)
                  </Text>
                </Button>
              </Card>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ListsOfDisplayRentals;

const show_rental = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    borderRadius: 10,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 8,
  },
  cardContent: {
    fontSize: 18,
    backgroundColor: '#000',
    color: '#fff',
    padding: 3,
    paddingLeft: 27,
    width: 180,
    marginLeft: 10,
    fontWeight: '500',
  },
  cardActionBtn: {
    backgroundColor: '#FECE00',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    marginHorizontal: 2,
  },
});
