/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  Avatar,
  Title,
  Text,
  Button,
  IconButton,
  TextInput,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/ProfileScreenStyle';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataFound from '../components/NoDataFound';

const ProfileScreen = ({navigation}) => {
  const [userId, setUserId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [shopImage, setShopImage] = useState('');

  const handleBackNavigation = () => {
    navigation.navigate('HomeDrawer');
  };

  const [formData, setFormData] = useState({
    name: 'Ramesh',
    shopName: 'Food Kadai',
    mobile: '7089123402',
    address: 'Bangalore',
    email: 'johndoe@example.com',
    gstin: '',
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEditPress = () => {
    setEditMode(true);
  };

  const handleSavePress = () => {
    setEditMode(false);
    // Perform save or submit logic here
    console.log('Form Data:', formData);
  };

  const handleShopImageSelection = () => {
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
            setShopImage(targetPath); // Set the permanent image URI to display it
          })
          .catch(error => {
            console.log('Image copy error: ', error);
          });
      }
    });
  };

  const uploadDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Handle the selected document
      console.log('Selected Document:', res);
      setDocument(res);
    } catch (error) {
      console.log('Document picking error:', error);
    }
  };

  const fetchUser = async id => {
    setLoading(true);
    await fetch(hostName + '/user/' + id, {
      method: 'GET',
      FetchUtilityOptions,
    })
      .then(response => response.json())
      .then(response => {
        console.warn('User response ', response);
        setData(response);
        setLoading(false);
      })
      .catch(error => console.warn('Error while fetch user ', error));
  };

  // console.warn(' User Id ', userId);

  const getUserId = async () => {
    await AsyncStorage.getItem('userId')
      .then(id => {
        if (id !== null) {
          // Value found in AsyncStorage
          console.log(id);
          setUserId(id);
          fetchUser(id);
        } else {
          // Value not found in AsyncStorage
          console.log('No value found for key "userId"');
        }
      })
      .catch(error => {
        // Handle any errors that occur during AsyncStorage retrieval
        console.log('Error retrieving value:', error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <View style={{marginTop: '10%'}}>
          <LoadingIndicator />
        </View>
      ) : Object.keys(data).length === 0 ? (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: -5,
            }}>
            {/* <IconButton
              icon="arrow-back"
              style={{color: '#4277b4'}}
              size={28}
            /> */}
            <IconButton
              icon={() => (
                <Icon style={{color: '#4277b4'}} name="arrow-back" size={28} />
              )}
              onPress={handleBackNavigation}
            />
            {editMode ? (
              <Button
                style={{
                  backgroundColor: '#4277b4',
                  height: 40,
                  borderRadius: 12,
                }}
                onPress={handleSavePress}
                mode="contained">
                <Text style={{fontSize: 20, color: '#fff', paddingBottom: 10}}>
                  Save
                </Text>
              </Button>
            ) : (
              <Button
                style={{
                  backgroundColor: '#4277b4',
                  height: 40,
                  borderRadius: 12,
                }}
                onPress={handleEditPress}
                mode="contained">
                <Text style={{fontSize: 20, color: '#fff', marginTop: 10}}>
                  Edit
                </Text>
              </Button>
            )}
          </View>
          <KeyboardAvoidingView
            enabled
            style={{marginBottom: 100, marginLeft: 12}}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {shopImage ? (
                <Image source={require('../../assets/banner2.jpeg')} />
              ) : (
                <TouchableOpacity onPress={handleShopImageSelection()}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#000',
                      alignItems: 'center',
                      marginVertical: 10,
                      paddingTop: 10,
                      paddingBottom: 30,
                    }}>
                    <IconButton
                      icon="cloud-upload-outline"
                      style={{color: '#4277b4'}}
                      size={28}
                    />
                    <Text
                      variant="titleMedium"
                      style={{
                        marginBottom: 20,
                        marginTop: -3,
                        fontSize: 20,
                        color: '#4277b4',
                      }}>
                      Upload Shop Image
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <View style={{flex: 1, marginTop: 15}}>
                <Text style={{marginBottom: 5}} variant="titleLarge">
                  Name
                </Text>
                <TextInput
                  style={{marginBottom: 15, backgroundColor: '#fff'}}
                  value={formData.name}
                  onChangeText={value => handleInputChange('name', value)}
                  editable={editMode}
                />

                <Text style={{marginBottom: 5}} variant="titleLarge">
                  Shop Name
                </Text>
                <TextInput
                  style={{marginBottom: 15, backgroundColor: '#fff'}}
                  value={formData.shopName}
                  onChangeText={value => handleInputChange('shopName', value)}
                  editable={editMode}
                />

                <Text style={{marginBottom: 5}} variant="titleLarge">
                  Mobile No
                </Text>
                <TextInput
                  style={{marginBottom: 15, backgroundColor: '#fff'}}
                  value={formData.mobile}
                  onChangeText={value => handleInputChange('mobile', value)}
                  editable={editMode}
                />

                <Text style={{marginBottom: 5}} variant="titleLarge">
                  Address
                </Text>
                <TextInput
                  style={{marginBottom: 15, backgroundColor: '#fff'}}
                  value={formData.address}
                  onChangeText={value => handleInputChange('address', value)}
                  editable={editMode}
                />
              </View>

              {/* <Button textColor="#4277b4" onPress={uploadDocument}> */}

              <Text
                onPress={uploadDocument}
                color={
                  document === null ? {color: '#4277b4'} : {color: '#FECE00'}
                }
                style={{fontSize: 18, textAlign: 'center'}}>
                {document === null
                  ? 'Click to add documents'
                  : 'Documents uploaded successufully'}
              </Text>
              {/* </Button> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <NoDataFound message="Profile data not found" />
      )}
      {/* <View style={[styles.titleContainer, {marginBottom: '10%'}]}>
        <Button
          mode="contained"
          buttonColor="blue"
          onPress={() => navigation.navigate('ProfileLogIn')}
          style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </Button>
      </View> */}
    </>
  );
};

export default ProfileScreen;
