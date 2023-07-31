/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Provider as PaperProvider, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RNS3} from 'react-native-aws3';
import TextInputComponent from '../components/TextInputComponent';
import DateRangePicker from '../components/DateComponent';
import {styles} from '../styles/formStyles';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import {hostName} from '../../App';
import {AWSAccessKeyId, AWSSecretKeyId} from '../AWSkeys';
import LoadingIndicator from '../components/LoadingIndicator';
import DropDownSelection from '../components/DropDownSelection';
import {dropdownstyle} from '../styles/dropdownStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function DisplayRental() {
  const [productCost, setProductCost] = useState();
  const [address, setAddress] = useState('');
  const [avgStore, setAvgStore] = useState('');
  const [shelfImage, setShelfImage] = useState('');
  const [width, setWidth] = useState();
  const [length, setLength] = useState();

  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  //  Shelf visibility list
  const [shelfvisibility, setShelfvisibility] = useState([]);
  const [shelfvisibilityList, setShelfvisibilityList] = useState([]);
  // Category list
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [imgLoad, setImgLoad] = useState(false);

  // duration
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Date select
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const requestOption = FetchUtilityOptions();

  const fetchShelfVisibility = async () => {
    setLoading(true);
    await fetch(hostName + '/type_of_shelf_vibility', requestOption)
      .then(response => response.json())
      .then(responseData => {
        console.warn('fetch data type_of_shelf_vibility ==> ', responseData);
        setShelfvisibilityList(responseData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const requestHeader = FetchUtilityOptions();

  const handleImageUpload = image => {
    setImgLoad(true);
    const imageFile = {
      uri: image.uri,
      name: image.fileName, // Replace this with a suitable name for your image file
      type: image.type, // Replace this with the appropriate file type (e.g., 'image/png' for PNG images)
    };

    const options = {
      keyPrefix: 'enterezy-rental-images/', // The folder name where you want to store the image in the S3 bucket
      bucket: 'enterezy-images', // Replace this with the actual name of your S3 bucket
      region: 'ap-southeast-2', // Replace this with the AWS region where your S3 bucket is located (e.g., 'us-east-1')
      accessKey: AWSAccessKeyId, // Replace this with your AWS access key
      secretKey: AWSSecretKeyId, // Replace this with your AWS secret key
      successActionStatus: 201,
    };

    RNS3.put(imageFile, options)
      .then(response => {
        if (response.status !== 201) {
          setImgLoad(false);
          console.error('Failed to upload image to S3:', response);
        } else {
          setImgLoad(false);
          console.log('Image successfully uploaded to S3:', response.body);
          setShelfImage(response.body.postResponse.location);
        }
      })
      .catch(error => {
        setImgLoad(false);
        console.error('Error uploading image to S3:', error);
      });
  };

  const handleImageSelection = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images', // Desired permanent location in the device's storage
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image selection canceled');
      } else if (response.error) {
        console.log('Image selection error: ', response.error);
      } else {
        setImgLoad(true);
        handleImageUpload(response.assets[0]);
      }
    });
  };

  const fetchProductCategory = async () => {
    setLoading(true);
    await fetch(hostName + '/category', requestOption)
      .then(response => response.json())
      .then(responseData => {
        console.warn('fetch data ==> ', responseData);
        setCategoryList(responseData);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchProductCategory();
    fetchShelfVisibility();
    clearFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFormData = () => {
    setLength('');
    setWidth('');
    setAddress('');
    setAvgStore('');
    setShelfvisibility([]);
    setCategory([]);
    setPrice('');
    setShelfImage('');
    setStartDate(null);
    setEndDate(null);
  };

  const fetchRental = formData => {
    setLoading(true);
    console.warn('Form Data =====> ', formData);
    fetch(hostName + '/rental', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        Alert.alert(response.message);
        clearFormData();
      })
      .catch(error => {
        setLoading(false);
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const submitData = () => {
    let formData;

    if (
      length !== '' &&
      width !== '' &&
      shelfvisibility !== [] &&
      category !== [] &&
      price !== '' &&
      shelfImage !== ''
    ) {
      formData = {
        product_length: length,
        product_height: width,
        product_cost: productCost,
        shelf_location: address,
        avg_shelf_foot_falls: avgStore,
        shelf_image: shelfImage,
        category_id: category[0],
        shelf_id: shelfvisibility[0],
      };

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
              fetchRental(formData);
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert('Please enter the mentioned mandatory data');
    }
  };

  const renderRentalItem = item => {
    return (
      <View style={dropdownstyle.item}>
        <Text style={dropdownstyle.textItem}>{item.shelf_name}</Text>
        {item.id === shelfvisibility && (
          <AntDesign
            style={dropdownstyle.icon}
            color="black"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  const renderCategoryItem = item => {
    return (
      <View style={dropdownstyle.item}>
        <Text style={dropdownstyle.textItem}>{item.category_name}</Text>
        {item.id === category && (
          <AntDesign
            style={dropdownstyle.icon}
            color="black"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  const handleChangeItem = item => {
    setCategory(item.id);
  };

  const handleChangeRental = item => {
    setShelfvisibility(item.id);
  };

  return (
    <PaperProvider>
      <View style={{marginTop: 10, marginHorizontal: 8}}>
        <Text style={rentalStyle.rentStoreTxt}>Rent a Store Asset</Text>
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAvoidingView
          enabled
          style={{marginBottom: 100, marginLeft: 12}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={rentalStyle.selectContainer}>
              <Text variant="titleMedium" style={rentalStyle.selectPlaceholder}>
                Choose Store Assest to rent :
              </Text>

              {shelfvisibilityList && (
                <DropDownSelection
                  width={'50%'}
                  marginLeft={10}
                  data={shelfvisibilityList}
                  selectedValue={shelfvisibility}
                  onChange={handleChangeRental}
                  renderItem={renderRentalItem}
                  placeholder={'Asset Type '}
                  valueField={'id'}
                  searchPlaceholder={'Search ]Store Asset Type....'}
                />
              )}
            </View>

            <View style={rentalStyle.selectContainer}>
              <Text variant="titleMedium" style={rentalStyle.selectPlaceholder}>
                Choose Categories available in store :
              </Text>

              {categoryList && (
                <DropDownSelection
                  width={'50%'}
                  marginLeft={10}
                  data={categoryList}
                  selectedValue={category}
                  onChange={handleChangeItem}
                  renderItem={renderCategoryItem}
                  labelField={'category_name'}
                  valueField={'id'}
                  placeholder={'Category *'}
                  searchPlaceholder={'Search category....'}
                />
              )}
            </View>

            <View style={rentalStyle.selectContainer}>
              <Text variant="titleMedium" style={rentalStyle.selectPlaceholder}>
                Location of the Asset in the store :
              </Text>
              <TextInputComponent
                placeholder={'Enter address'}
                onChangeText={text => setAddress(text)}
                multiline={true}
                value={address}
                style={[styles.input, rentalStyle.inputTxt]}
              />
            </View>

            <View style={rentalStyle.selectContainer}>
              <Text variant="titleMedium" style={rentalStyle.selectPlaceholder}>
                Weekly Footfalls in the store :
              </Text>
              <TextInputComponent
                placeholder={'Weekly football'}
                onChangeText={text => setAvgStore(text)}
                value={avgStore}
                keyboardType={'numeric'}
                style={[styles.input, rentalStyle.inputTxt]}
              />
            </View>

            <View style={rentalStyle.selectContainer}>
              <Text variant="titleMedium" style={rentalStyle.selectPlaceholder}>
                Enter the Rental Price :
              </Text>
              <TextInputComponent
                placeholder={'Rental price'}
                onChangeText={text => setPrice(text)}
                keyboardType={'numeric'}
                value={price}
                style={[styles.input, rentalStyle.inputTxt]}
              />
            </View>

            <View style={{marginBottom: 10, marginLeft: 10}} />
            <Text
              variant="titleMedium"
              style={{
                marginHorizontal: 10,
                fontSize: 18,
                color: '#000',
              }}>
              Dimensions of the Store Asset :
            </Text>

            <View style={{flexDirection: 'row', marginHorizontal: 12}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text
                  variant="titleMedium"
                  style={{
                    fontSize: 18,
                    marginTop: 8,
                    color: '#000',
                  }}>
                  Length
                </Text>
                <TextInputComponent
                  placeholder={'Enter length'}
                  onChangeText={text => setLength(text)}
                  keyboardType={'numeric'}
                  value={length}
                  style={[
                    styles.input,
                    {marginTop: 5, width: '85%', height: 50, marginRight: 4},
                  ]}
                />
              </View>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text
                  variant="titleMedium"
                  style={{
                    fontSize: 18,
                    marginTop: 8,
                    marginLeft: 15,
                    color: '#000',
                  }}>
                  Width
                </Text>
                <TextInputComponent
                  placeholder={'Enter width'}
                  onChangeText={text => setWidth(text)}
                  keyboardType={'numeric'}
                  value={width}
                  style={[
                    styles.input,
                    {
                      marginTop: 5,
                      color: '#000',
                      width: '85%',
                      height: 50,
                      marginLeft: 15,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={{marginBottom: 10, marginLeft: 10}} />
            <Text
              variant="titleMedium"
              style={{
                marginHorizontal: 10,
                fontSize: 18,
                color: '#000',
              }}>
              Select Duration :
            </Text>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              showStartDatePicker={showStartDatePicker}
              showEndDatePicker={showEndDatePicker}
              showStartDatePickerModal={showStartDatePickerModal}
              showEndDatePickerModal={showEndDatePickerModal}
            />

            <View style={{marginBottom: 10}} />
            <Button
              mode="contained"
              disabled={imgLoad}
              icon={
                shelfImage
                  ? ({color}) => (
                      <FontAwesome5
                        name="check-double"
                        size={28}
                        color={color}
                      />
                    )
                  : ({size}) => (
                      <Ionicons
                        name="cloud-upload-outline"
                        size={28}
                        color={'#000'}
                      />
                    )
              }
              onPress={handleImageSelection}
              style={[
                shelfImage ? rentalStyle.btnSuccess : rentalStyle.btn,
                {
                  marginBottom: 15,
                  marginHorizontal: 10,
                  borderRadius: 12,
                },
              ]}>
              <Text
                style={[
                  {fontSize: 18, paddingTop: 12},
                  shelfImage ? {color: '#fff'} : {color: '#000'},
                ]}>
                {imgLoad ? (
                  <ActivityIndicator size={22} color="black" />
                ) : shelfImage ? (
                  'Shelf Pic uploaded'
                ) : (
                  'Upload a Shelf Pic *'
                )}
              </Text>
            </Button>

            <View style={rentalStyle.submitView}>
              <Button
                mode="contained"
                style={{
                  marginRight: 15,
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}
                onPress={submitData}>
                <Text style={[styles.btnStyle, {color: '#fff'}]}>
                  Submit Data
                </Text>
              </Button>
              <Button
                mode="contained"
                style={{backgroundColor: 'black', borderRadius: 10}}
                onPress={clearFormData}>
                {' '}
                <Text style={[styles.btnStyle, {color: '#fff'}]}>
                  Clear Data
                </Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </PaperProvider>
  );
}

// Display rental screen styles
export const rentalStyle = StyleSheet.create({
  btnSuccess: {
    backgroundColor: '#000',
  },
  btn: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
  },
  submitView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 15,
  },

  inputTxt: {
    width: '65%',
    flex: 1,
    marginLeft: 12,
    marginTop: 5,
    height: 50,
  },
  rentStoreBtn: {
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 4,
    height: 45,
    marginHorizontal: 10,
    backgroundColor: '#4277b4',
  },

  rentStoreTxt: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    fontStyle: 'italic',
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  selectContainer: {
    marginBottom: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  selectPlaceholder: {
    color: '#000',
    width: '48%',
    fontSize: 16,
    lineHeight: 25,
  },
});

export default DisplayRental;
