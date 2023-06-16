/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {styles} from '../styles/formStyles';
import SinUpHeadingImg from '../components/SingUpHeadingImg';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import {API_KEY} from '../fetchUtility/GoogleMapApiKey';
import {hostName} from '../../App';
import {NativeModules, NativeEventEmitter} from 'react-native';

const {OtplessModule} = NativeModules;

const MapScreen = ({route}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [otplessResult, setOtplessResult] = useState();
  let userData;
  const navigation = useNavigation();
  console.warn(' param data ', route?.params?.data);

  const setUserLoggedIn = async () => {
    try {
      await AsyncStorage.setItem('userLoggedIn', 'true');
    } catch (error) {
      console.log(error);
    }
  };

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
    console.warn(' *** => ', data);
    if (data.results.length > 0) {
      setLoading(false);
      const addressComponents = data.results[1].address_components;
      const pincodeObj = addressComponents.find(component =>
        component.types.includes('postal_code'),
      );
      const pincode = pincodeObj ? pincodeObj.long_name : '';
      const address = data.results[0].formatted_address;

      const correctAddress = data.results[0].formatted_address.replace(
        /\d{6},/,
        `${pincode},`,
      );
      // setCurrentAddress(correctAddress);
      setCurrentAddress(address);
    }
  };

  const postUserInformations = userDataValue => {
    fetch(hostName + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDataValue),
    })
      .then(response => response.json())
      .then(response => {
        // Handle the response data
        // console.log('data response ', response);
        Alert.alert(response.message);
        setUserLoggedIn();
        // call this method when you login is completed
        OtplessModule.onSignInCompleted();
        navigation.navigate('Main');
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const handleStart = () => {
    userData = {
      user_mobile_number: route?.params?.data.mobileNumber,
      user_name: route?.params?.data.name,
      shop_name: route?.params?.data.shopName,
      address: currentAddress,
      user_email: otplessResult?.data?.email?.email,
      waNumber: otplessResult?.data?.waNumber,
      user_signup_time: otplessResult?.data?.timestamp,
    };

    postUserInformations(userData);

    console.warn(' User data ', userData);
  };

  const handlePreviousStep = () => {
    navigation.navigate('Signup');
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);

    // Otpless
    OtplessModule.startOtplessWithEvent();

    // to receive otplessUser details and token
    const eventListener = new NativeEventEmitter(OtplessModule).addListener(
      'OTPlessSignResult',
      result => {
        if (result.data == null || result.data === undefined) {
          let error = result.errorMessage;
          console.log(' error ', error);
        } else {
          const token = result.data.token;
          console.warn(' token ', result);
          // send this token to your backend to validate user details
          setOtplessResult(result);

          // console.warn(
          //   ' ************** => email ',
          //   otplessResult.data.email.email,
          // );
        }
      },
    );
  };

  console.warn(' ************** => email 0000 ', otplessResult);

  const finalSignUp = () => {
    return (
      <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
        <SinUpHeadingImg />
        <Text style={{textAlign: 'center', fontSize: 18}}>
          You are all done
        </Text>
        <Text style={{textAlign: 'center', fontSize: 18, lineHeight: 25}}>
          Let's make you some Money!!!
        </Text>

        <Button
          style={[styles.submitBtn, {marginTop: '80%'}]}
          onPress={handleStart}>
          <Text style={styles.subBtnTxt}>Start</Text>
        </Button>
      </View>
    );
  };

  const googleMap = () => {
    return (
      <KeyboardAvoidingView marginBottom={10}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mapCard}>
            {loading ? (
              <LoadingIndicator />
            ) : (
              currentLocation && (
                <MapView
                  style={styles.map}
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

          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Your Current Address
          </Text>
          <TextInput
            mode="contain"
            label={''}
            value={currentAddress}
            onChangeText={text => setCurrentAddress(text)}
            placeholder="Current Address"
            multiline={true}
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              backgroundColor: '#FECE00',
              fontWeight: 'bold',
              fontSize: 16,
            }}
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
            <Button style={[styles.submitBtn]} onPress={handleNextStep}>
              <Text style={styles.subBtnTxt}>SignUp</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return googleMap();
      case 2:
        return finalSignUp();
      default:
        return null;
    }
  };

  return renderStep();
};

export default MapScreen;
