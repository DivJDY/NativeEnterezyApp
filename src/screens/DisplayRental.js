/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import TextInputComponent from '../components/TextInputComponent';
import {styles} from '../styles/formStyles';
import Selection from '../components/Selection';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import {hostName} from '../../App';

// Options data must contain 'item' & 'id' keys

const options = [
  {id: 1, item: 'Gondola'},
  {id: 2, item: 'Shelf'},
  {id: 3, item: 'Clip Strip'},
  {id: 4, item: 'Store Wall Branding'},
  {id: 5, item: 'tore Name Branding'},
];

const dimentionOption = [
  {id: 1, item: 'L'},
  {id: 2, item: 'B'},
  {id: 3, item: 'H'},
];
const multiselection = [
  {id: 1, item: 'Food'},
  {id: 2, item: 'Cosmetics'},
  {id: 3, item: 'FMCG (Non Food)'},
  {id: 4, item: 'Organic'},
  {id: 5, item: 'Any'},
];

function DisplayRental() {
  const [selectItems, setSelectItems] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const [productCost, setProductCost] = useState();
  const [address, setAddress] = useState('');
  const [avgStore, setAvgStore] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [takeImage, setTakeImage] = useState('');
  // const [selectDimention, setSelectDimention] = useState([]);
  const [breath, setBreath] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();

  // Category list
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // close the selection dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const requestOption = FetchUtilityOptions('GET');

  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera and storage permissions granted');
      } else {
        console.log('Camera and storage permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePicture = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
        quality: 0.5,
      },
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled taking a picture');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped on the custom button ', response.customButton);
      } else {
        // Handle the taken picture
        // console.log('Picture taken:', response.assets[0].uri);
        setTakeImage(response.assets[0].uri);
      }
    });
  };

  const selectImage = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response) {
        setUploadImage(response);
      }
    });
  };

  const fetchProductCategory = async () => {
    // setLoadCategory(true);
    await fetch(hostName + '/category', requestOption)
      .then(response => response.json())
      .then(responseData => {
        console.warn('fetch data ==> ', responseData);
        setCategoryList(responseData);
        // setLoadCategory(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    requestCameraPermission();
    fetchProductCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFormData = () => {
    setLength('');
    setBreath('');
    setHeight('');
    setAddress('');
    setAvgStore('');
    // setSelectDimention([]);
    setSelectItem([]);
    setCategory([]);
    setUploadImage('');
    setTakeImage('');
  };

  const submitData = () => {
    if (
      // selectDimention !== [] &&
      length === '' &&
      breath === '' &&
      height === '' &&
      selectItem !== [] &&
      selectItems !== [] &&
      (uploadImage !== '' || takeImage !== '')
    ) {
      Alert.alert(
        '',
        'You want to submit the Data',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Action to perform when OK is pressed
              Alert.alert('data Submitted successfully');
              clearFormData();
              navigation.navigate('HomeStack');
              // console.log('OK pressed');
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert('Please enter the mentioned mandatory data');
    }
  };

  const multiSelectRef = useRef(null);

  const onOutsidePress = () => {
    // dismissKeyboard();
    multiSelectRef.current._toggleDropdown(false);
  };

  console.warn(' category text ', category);

  const handlePostProductCategory = () => {};

  return (
    <View style={{margin: 20}}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          style={{marginBottom: 15}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 28, marginBottom: 5, fontWeight: 'bold'}}>
              Display Rental
            </Text>
          </View>
          <View style={{marginBottom: 15}} />
          <TouchableWithoutFeedback onPress={onOutsidePress}>
            <Selection
              title="Type of visibility *"
              placeholder="Search Item...."
              // isVisible={dropdownVisible}
              ref={multiSelectRef}
              options={options}
              displayKey={'item'}
              single={false}
              onChangeText={text => setSelectItem(text)}
              selectedItem={selectItem}
            />
            {/* <Button title="Post Category" onPress={handlePostProductCategory} /> */}
          </TouchableWithoutFeedback>

          <View style={{marginBottom: 15}} />
          <TouchableWithoutFeedback onPress={onOutsidePress}>
            <Selection
              title="Type of category *"
              placeholder="Search Items...."
              ref={multiSelectRef}
              options={categoryList}
              displayKey={'category_name'}
              single={true}
              onChangeText={text => setCategory(text)}
              selectedItem={category}
            />
          </TouchableWithoutFeedback>

          {/* <View style={{marginBottom: 15}} />
          <Selection
            title="Dimentions *"
            placeholder="Search Item...."
            options={dimentionOption}
            displayKey={'item'}
            single={true}
            onChangeText={text => setSelectDimention(text)}
            selectedItem={selectDimention}
          /> */}

          <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Please Enter Product Length'}
            onChangeText={text => setLength(text)}
            keyboardType={'numeric'}
            value={length}
            style={[styles.input, {width: '100%'}]}
          />

          {/* <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Please Enter Product Breath'}
            onChangeText={text => setBreath(text)}
            keyboardType={'numeric'}
            value={breath}
            style={[styles.input, {width: '100%'}]}
          /> */}

          <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Please Enter Product Height'}
            onChangeText={text => setHeight(text)}
            keyboardType={'numeric'}
            value={height}
            style={[styles.input, {width: '100%'}]}
          />

          <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Please Enter Product Cost *'}
            onChangeText={text => setProductCost(text)}
            keyboardType={'numeric'}
            value={productCost}
            style={[styles.input, {width: '100%'}]}
          />

          <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Location of Shelf in Store'}
            onChangeText={text => setAddress(text)}
            multiline={true}
            value={address}
            style={[styles.input, {width: '100%'}]}
          />

          <View style={{marginBottom: 15}} />
          <TextInputComponent
            placeholder={'Avg Store Foot Falls (Approx)'}
            onChangeText={text => setAvgStore(text)}
            value={avgStore}
            style={[styles.input, {width: '100%'}]}
          />
          <View style={{marginBottom: 15}} />
          <Button
            mode="contained"
            onPress={takePicture}
            icon={
              takeImage
                ? ({size, color}) => (
                    <FontAwesome5
                      name="check-double"
                      size={size}
                      color={color}
                    />
                  )
                : ({size, color}) => (
                    <FontAwesome5 name="camera" size={size} color={color} />
                  )
            }
            style={[
              takeImage ? style.btnSuccess : style.btn,
              {marginBottom: 15},
            ]}>
            <Text style={{fontWeight: 'bold'}}>
              {' '}
              {takeImage ? 'Shelf Pic Taken' : 'Take a Shelf Pic *'}
            </Text>
          </Button>
          <Button
            mode="contained"
            icon={
              uploadImage
                ? ({size, color}) => (
                    <FontAwesome5
                      name="check-double"
                      size={size}
                      color={color}
                    />
                  )
                : ({size, color}) => (
                    <FontAwesome5 name="upload" size={size} color={color} />
                  )
            }
            onPress={selectImage}
            style={[
              uploadImage ? style.btnSuccess : style.btn,
              {marginBottom: 15},
            ]}>
            {' '}
            <Text style={{fontWeight: 'bold'}}>
              {uploadImage ? 'Shelf Pic uploaded' : 'Upload a Shelf Pic *'}
            </Text>
          </Button>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 15,
            }}>
            <Button
              mode="contained"
              style={{marginRight: 15, backgroundColor: 'black'}}
              onPress={submitData}>
              <Text style={[styles.btnStyle, {color: '#FECE00'}]}>
                Submit Data
              </Text>
            </Button>
            <Button
              mode="contained"
              style={{backgroundColor: 'black'}}
              onPress={clearFormData}>
              {' '}
              <Text style={[styles.btnStyle, {color: '#FECE00'}]}>
                Clear Data
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const style = StyleSheet.create({
  btnSuccess: {
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#FECE00',
  },
});

export default DisplayRental;
