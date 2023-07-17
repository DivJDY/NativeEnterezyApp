/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {startup_styles} from '../styles/StartupStyle';
import {textinput_style} from '../styles/TextInputStyle';
import HeadingImage from '../components/HeadingImage';
import {API_KEY} from '../GoogleMapApiKey';
import LoadingIndicator from '../components/LoadingIndicator';
import BtnComponent from '../components/BtnComponent';

const GMapScreen = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Get the current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.warn(' current location ', latitude, ' - ', longitude);
        // Call the function to fetch and set the current address
        fetchAddress(latitude, longitude);
      },
      error => {
        console.log('Error getting current location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    setLoading(true);
    // Make an API call to fetch the address using the Google Maps Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
    );
    const data = await response.json();
    // console.warn(' *** => ', data);
    if (data.results.length > 0) {
      setLoading(false);
      // const addressComponents = data.results[1].address_components;
      // const pincodeObj = addressComponents.find(component =>
      //   component.types.includes('postal_code'),
      // );
      // const pincode = pincodeObj ? pincodeObj.long_name : '';
      const address = data.results[0].formatted_address;

      // const correctAddress = data.results[0].formatted_address.replace(
      //   /\d{6},/,
      //   `${pincode},`,
      // );

      setCurrentAddress(address);
    }
  };

  const setUserLoggedIn = async () => {
    try {
      await AsyncStorage.setItem('isSignedUp', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
   setUserLoggedIn();
    Alert.alert('SignUp Completed');
    // Perform signup logic here

    setTimeout(() => {
      navigation.navigate('ThanksSignup');
    }, 1000);
  };
  return (
    <KeyboardAvoidingView
      enabled
      style={{height: '100%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadingImage />

        <Text style={startup_styles.gmaptitle}>ADDRESS</Text>

        <View style={startup_styles.mapCard}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            currentLocation && (
              <MapView
                style={startup_styles.map}
                initialRegion={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                />
              </MapView>
            )
          )}
        </View>

        <View style={{marginTop: 5, marginBottom: 10}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text
              variant="bodyMedium"
              style={[textinput_style.inputTitle, {marginBottom: -10}]}>
              Enter Store Address{' '}
            </Text>
            <TextInput
              textColor="white"
              placeholderTextColor="white"
              multiline={true}
              style={textinput_style.mapInputStyle}
              value={currentAddress}
              placeholder={'XXXXXX'}
              onChange={text => setCurrentAddress(text)}
              theme={{
                colors: {
                  primary: 'white', // Change this to the desired color for the cursor
                },
              }}
            />
          </View>

          <View style={{marginTop: '-15%', marginBottom: 20}}>
            <BtnComponent title={'SIGNUP'} handleSubmit={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GMapScreen;
