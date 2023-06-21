/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Provider as PaperProvider} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import TextInputComponent from '../components/TextInputComponent';
import {styles} from '../styles/formStyles';
import Selection from '../components/Selection';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import {hostName} from '../../App';
import LoadingIndicator from '../components/LoadingIndicator';
import DropDownSelection from '../components/DropDownSelection';
import {dropdownstyle} from '../styles/dropdownStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Options
const shelfRackOptions = [
  {shelf_name: 'Gondola'},
  {shelf_name: 'Shelf'},
  {shelf_name: 'Clip Strip'},
  {shelf_name: 'Store Wall Branding'},
  {shelf_name: 'Store Name Branding'},
];

function DisplayRental() {
  const [selectShelf, setSelectShelf] = useState([]);
  const [productCost, setProductCost] = useState();
  const [address, setAddress] = useState('');
  const [avgStore, setAvgStore] = useState('');
  const [shelfImage, setShelfImage] = useState('');
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [loading, setLoading] = useState(false);
  //  Shelf visibility list
  const [shelfvisibility, setShelfvisibility] = useState([]);
  const [shelfvisibilityList, setShelfvisibilityList] = useState([]);
  // Category list
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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
  // close the selection dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // const ShelfArray = shelfvisibility?.map(itemId => {
  //   const shelfRackOption = shelfvisibilityList.find(
  //     option => option.id === itemId,
  //   );
  //   return {
  //     shelf_id: shelfRackOption ? shelfRackOption.id : '',
  //   };
  // });

  // const shelf_ids = ShelfArray.map(obj => obj.shelf_id);

  const navigation = useNavigation();

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
        const sourcePath = response.assets[0].uri;
        const targetPath =
          RNFS.DocumentDirectoryPath + `/${response.assets[0].fileName}`;

        RNFS.copyFile(sourcePath, targetPath)
          .then(() => {
            // console.warn(
            //   'Image copied to permanent location ',
            //   targetPath,
            //   ' 888 ',
            //   sourcePath,
            // );
            setShelfImage(targetPath); // Set the permanent image URI to display it
          })
          .catch(error => {
            console.log('Image copy error: ', error);
          });
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
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchProductCategory();
    fetchShelfVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFormData = () => {
    setLength('');
    setHeight('');
    setAddress('');
    setAvgStore('');
    setShelfvisibility([]);
    setCategory([]);
    setShelfImage('');
  };

  const fetchRental = formData => {
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
        // Handle any errors
        console.error('post error ', error);
      });
  };

  // const handleSubmitData = (ShelfArrayData, formData) => {
  //   console.warn('Form Data => ShelfArrayData ', ShelfArrayData);
  //   // formData.push({
  //   //   id: ShelfArrayData.id,
  //   // });

  //   fetch(hostName + '/type_of_shelf_vibility', {
  //     method: 'POST',
  //     headers: requestHeader,
  //     body: JSON.stringify(ShelfArrayData),
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       // setLoading(false);
  //       // clearFormData()
  //       Alert.alert(response.message);
  //     })
  //     .catch(error => {
  //       // Handle any errors
  //       console.error('post error ', error);
  //     });
  // };

  const submitData = () => {
    let formData;

    if (
      length !== '' &&
      height !== '' &&
      shelfvisibility !== [] &&
      category !== [] &&
      shelfImage !== ''
    ) {
      formData = {
        product_length: length,
        product_height: height,
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
      <View style={{alignItems: 'center', marginTop: 15}}>
        <Text
          style={{
            fontSize: 28,
            marginBottom: 8,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Display Rental
        </Text>
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAvoidingView
          enabled
          style={{marginBottom: 100, marginLeft: 12}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 15}} />

            {shelfvisibilityList && (
              <DropDownSelection
                data={shelfvisibilityList}
                selectedValue={shelfvisibility}
                onChange={handleChangeRental}
                renderItem={renderRentalItem}
                labelField={'shelf_name'}
                valueField={'id'}
                placeholder={'Type of Rental *'}
                searchPlaceholder={'Search rental....'}
              />
            )}

            {categoryList && (
              <DropDownSelection
                data={categoryList}
                selectedValue={category}
                onChange={handleChangeItem}
                renderItem={renderCategoryItem}
                labelField={'category_name'}
                valueField={'id'}
                placeholder={'Type of category * *'}
                searchPlaceholder={'Search category....'}
              />
            )}

            <View style={{marginBottom: 15}} />
            <TextInputComponent
              placeholder={'Please Enter Product Length'}
              onChangeText={text => setLength(text)}
              keyboardType={'numeric'}
              value={length}
              style={[styles.input, {width: '85%', flex: 1, marginLeft: 18}]}
            />

            <View style={{marginBottom: 15}} />
            <TextInputComponent
              placeholder={'Please Enter Product Height'}
              onChangeText={text => setHeight(text)}
              keyboardType={'numeric'}
              value={height}
              style={[styles.input, {width: '85%', flex: 1, marginLeft: 18}]}
            />

            <View style={{marginBottom: 15}} />
            <TextInputComponent
              placeholder={'Please Enter Product Cost *'}
              onChangeText={text => setProductCost(text)}
              keyboardType={'numeric'}
              value={productCost}
              style={[styles.input, {width: '85%', flex: 1, marginLeft: 18}]}
            />

            <View style={{marginBottom: 15}} />
            <TextInputComponent
              placeholder={'Location of Shelf in Store'}
              onChangeText={text => setAddress(text)}
              multiline={true}
              value={address}
              style={[styles.input, {width: '85%', flex: 1, marginLeft: 18}]}
            />

            <View style={{marginBottom: 15}} />
            <TextInputComponent
              placeholder={'Avg Store Foot Falls (Approx)'}
              onChangeText={text => setAvgStore(text)}
              keyboardType={'numeric'}
              value={avgStore}
              style={[styles.input, {width: '85%', flex: 1, marginLeft: 18}]}
            />

            <View style={{marginBottom: 15}} />
            <Button
              mode="contained"
              icon={
                shelfImage
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
              onPress={handleImageSelection}
              style={[
                shelfImage ? style.btnSuccess : style.btn,
                {
                  marginBottom: 15,
                  width: '85%',
                  marginLeft: 18,
                  borderRadius: 10,
                },
              ]}>
              {' '}
              <Text style={{fontWeight: 'bold'}}>
                {shelfImage ? 'Shelf Pic uploaded' : 'Upload a Shelf Pic *'}
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
                marginLeft: '-4%',
              }}>
              <Button
                mode="contained"
                style={{
                  marginRight: 15,
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}
                onPress={submitData}>
                <Text style={[styles.btnStyle, {color: '#FECE00'}]}>
                  Submit Data
                </Text>
              </Button>
              <Button
                mode="contained"
                style={{backgroundColor: 'black', borderRadius: 10}}
                onPress={clearFormData}>
                {' '}
                <Text style={[styles.btnStyle, {color: '#FECE00'}]}>
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

const style = StyleSheet.create({
  btnSuccess: {
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#FECE00',
  },
});

export default DisplayRental;
