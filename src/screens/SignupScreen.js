/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import {styles} from '../styles/formStyles';
import {NativeModules, NativeEventEmitter} from 'react-native';
import MapScreen from './Map';

const {OtplessModule} = NativeModules;
// const MapScreen = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [location, setLocation] = useState(null);

//   console.log(' == location ' + location);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location permission',
//             message:
//               'This app needs access to your location ' +
//               'to get your current location.',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           Geolocation.getCurrentPosition(
//             position => {
//               const {latitude, longitude} = position.coords;
//               setLocation(`${latitude}, ${longitude}`);
//             },
//             error => {
//               console.log(error.code, error.message);
//             },
//             {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//           );
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };
//     requestLocationPermission();
//   }, []);

//   useEffect(() => {
//     // Get the user's current location
//     // Geolocation.getCurrentPosition(
//     //   position => {
//     //     const {latitude, longitude} = position.coords;
//     //     setCurrentLocation({latitude, longitude});
//     //   },
//     //   error => {
//     //     console.log('Error getting current location:', error);
//     //   },
//     //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     // );
//   }, []);

//   return (
//     <View>
//       <Text
//         style={{
//           marginTop: 10,
//           textAlign: 'center',
//           fontSize: 20,
//           fontWeight: 'bold',
//         }}>
//         Current Location
//       </Text>
//       {/* {location && ( */}
//       <MapView
//         style={mapstyle.map}
//         initialRegion={{
//           latitude: 12.8959781,
//           longitude: 77.5740118,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {/* <Marker
//               coordinate={{
//                 latitude: currentLocation.latitude,
//                 longitude: currentLocation.longitude,
//               }}
//               title="Current Location"
//             /> */}
//       </MapView>
//     </View>
//   );
// };
// const mapstyle = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     // flex: 1,
//   },
// });

const ImageShow = () => {
  return (
    <Image
      source={require('../../assets/logo.jpg')}
      resizeMode="stretch"
      style={{width: '100%', height: 100, marginBottom: '20%'}}
    />
  );
};

const SignUpScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [otplessResult, setOtplessResult] = useState();

  const navigation = useNavigation();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStart = () => {
    navigation.navigate('Main');
  };

  const handleSubmit = () => {
    setCurrentStep(currentStep + 1);
    // Alert.alert('SignUp Done');
    // / to show OTPLESS popup
    // OtplessModule.startOtplessWithEvent();

    // // to receive otplessUser details and token
    // const eventListener = new NativeEventEmitter(OtplessModule).addListener(
    //   'OTPlessSignResult',
    //   result => {
    //     if (result.data == null || result.data == undefined) {
    //       let error = result.errorMessage;
    //     } else {
    //       const token = result.data.token;
    //       console.warn(' token ', token);
    //       // send this token to your backend to validate user details
    //       setOtplessResult(token);
    //     }
    //   },
    // );
    // // call this method when you login is completed
    // OtplessModule.onSignInCompleted();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
            <ImageShow />
            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Enter Mobile Number
            </Text>
            <TextInputComponent
              label="Mobile Number"
              placeholder={'Enter Mobile Number'}
              onChangeText={text => setMobileNumber(text)}
              keyboardType="numeric"
              value={mobileNumber}
              width="100%"
              style={styles.subInp}
            />
            {mobileNumber.length === 0 || mobileNumber.length !== 10 ? (
              <TextComponent
                text={'Please Enter 10 Digits Mobile Number'}
                style={styles.error}
              />
            ) : (
              <View style={{marginBottom: 20}} />
            )}
            <Button
              onPress={handleNextStep}
              style={{
                backgroundColor:
                  mobileNumber.length === 0 || mobileNumber.length !== 10
                    ? '#ccc'
                    : 'black',
                marginTop: 10,
                padding: 3,
              }}
              labelStyle={{
                color:
                  mobileNumber.length === 0 || mobileNumber.length !== 10
                    ? '#888'
                    : '#fff',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              disabled={
                mobileNumber.length === 0 || mobileNumber.length !== 10
                  ? true
                  : false
              }>
              {/* <Text style={styles.subBtnTxt}></Text> */}
              Next
            </Button>
          </View>
        );

      case 2:
        return (
          <KeyboardAvoidingView marginBottom={20}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
                <ImageShow />
                <Text
                  style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
                  Name (Owner)
                </Text>
                <TextInputComponent
                  placeholder={'Please Enter Shop Owner Name'}
                  onChangeText={text => setName(text)}
                  value={name}
                  style={styles.subInp}
                />
                {name.length === 0 ? (
                  <TextComponent
                    text={'Please Enter Shop Owner Name'}
                    style={styles.error}
                  />
                ) : (
                  <View style={{marginBottom: 10}} />
                )}

                <Text
                  style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
                  Shop Name
                </Text>
                <TextInputComponent
                  placeholder={'Please Enter Shop Name'}
                  onChangeText={text => setShopName(text)}
                  value={shopName}
                  style={styles.subInp}
                />
                {shopName.length === 0 ? (
                  <TextComponent
                    text={'Please Enter Shop Name'}
                    style={styles.error}
                  />
                ) : (
                  <View style={{marginBottom: 20}} />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}>
                  <Button style={styles.submitBtn} onPress={handlePreviousStep}>
                    <Text style={styles.subBtnTxt}>Previous</Text>
                  </Button>
                  <Button
                    style={{
                      backgroundColor:
                        name.length === 0 || shopName.length === 0
                          ? '#ccc'
                          : 'black',
                      marginTop: 10,
                      padding: 3,
                    }}
                    labelStyle={{
                      color:
                        name.length === 0 || shopName.length === 0
                          ? '#888'
                          : '#fff',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}
                    disabled={
                      name.length === 0 || shopName.length === 0 ? true : false
                    }
                    onPress={() => navigation.navigate('GoogleMap')}>
                    Next
                  </Button>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        );
      // case 3:
      //   return (
      //     <View style={{flex: 1, marginTop: '15%', marginHorizontal: '10%'}}>
      //       {/* <ImageShow /> */}
      //       <MapScreen />
      // {/* <View
      //   style={{
      //     flexDirection: 'row',
      //     alignItems: 'baseline',
      //     justifyContent: 'space-between',
      //     marginTop: '80%',
      //   }}>
      //   <Button style={styles.submitBtn} onPress={handlePreviousStep}>
      //     <Text style={styles.subBtnTxt}>Previous</Text>
      //   </Button>
      //   <Button style={[styles.submitBtn]} onPress={handleSubmit}>
      //     <Text style={styles.subBtnTxt}>Submit</Text>
      //   </Button>
      // </View> */}
      //     </View>
      //   );

      case 4:
        return (
          <View style={{marginTop: '15%', marginHorizontal: '10%'}}>
            <ImageShow />
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
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  return <View>{renderStep()}</View>;
};

export default SignUpScreen;
