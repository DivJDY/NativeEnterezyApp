import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {styles} from '../styles/formStyles';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [location, setLocation] = useState(null);

  console.log(' == location ' + location);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message:
              'This app needs access to your location ' +
              'to get your current location.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation(`${latitude}, ${longitude}`);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  // const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    // Get the current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
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
    // Make an API call to fetch the address using the Google Maps Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAk2OZeHLSpPmGAlKWRSeWr4qsohRK5b2c`,
    );
    const data = await response.json();
    console.warn(' *** => ', data);
    if (data.results.length > 0) {
      const address = data.results[0].formatted_address;
      setCurrentAddress(address);
    }
  };

  const handlePreviousStep = () => {};

  const handleSubmit = () => {};

  useEffect(() => {
    // Get the user's current location
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {latitude, longitude} = position.coords;
    //     setCurrentLocation({latitude, longitude});
    //   },
    //   error => {
    //     console.log('Error getting current location:', error);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  }, []);

  // return (
  //   <View style={mapstyle.container}>
  //     {/* <Text
  //       style={{
  //         marginTop: 10,
  //         textAlign: 'center',
  //         fontSize: 20,
  //         fontWeight: 'bold',
  //       }}>
  //       Current Location
  //     </Text> */}
  //     {location && (
  //       <MapView
  //         style={mapstyle.map}
  //         initialRegion={{
  //           latitude: 12.8959745,
  //           longitude: 77.5740113,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         }}
  //       />
  //     )}
  //   </View>
  // );

  // return (
  //   <View style={{flex: 1}}>
  //     <MapView
  //       style={{flex: 1}}
  //       initialRegion={{
  //         latitude: 12.8959745,
  //         longitude: 77.5740113,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }}
  //     />
  //     <Marker
  //       coordinate={{
  //         latitude: 12.8959745,
  //         longitude: 77.5740113,
  //       }}
  //       title="Current Location"
  //     />
  //   </View>
  // );

  return (
    <>
      <View style={mapstyle.card}>
        {currentLocation && (
          <MapView
            style={mapstyle.map}
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
        )}
      </View>

      <TextInput
        mode="contain"
        value={currentAddress}
        onChangeText={text => setCurrentAddress(text)}
        placeholder="Current Address"
        multiline={true}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginBottom: '10%',
        }}>
        <Button style={styles.submitBtn} onPress={handlePreviousStep}>
          <Text style={styles.subBtnTxt}>Previous</Text>
        </Button>
        <Button style={[styles.submitBtn]} onPress={handleSubmit}>
          <Text style={styles.subBtnTxt}>Submit</Text>
        </Button>
      </View>
    </>
  );
};

const mapstyle = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  map: {
    height: 350,
    borderRadius: 10,
  },
});

export default MapScreen;
