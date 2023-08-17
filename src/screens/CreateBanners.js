/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Provider as PaperProvider, Button, Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import {AWSAccessKeyId, AWSSecretKeyId} from '../AWSkeys';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {rentalStyle} from './DisplayRental';
import {styles} from '../styles/formStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';

// validation schema
const validationSchema = Yup.object().shape({
  banner_name: Yup.string().required('Banner name is required'),
  banner_desc: Yup.string(),
});

const CreateBanners = () => {
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [bannerImg, setBannerImg] = useState(null);

  const initialValues = {
    banner_name: '',
    banner_desc: '',
  };

  // Image selection
  const handleImageSelection = () => {
    setImgLoad(true);
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'Pictures/ImageUploadApp', // Desired permanent location in the device's storage
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image selection canceled');
      } else if (response.error) {
        console.log('Image selection error: ', response.error);
      } else {
        handleImageUpload(response.assets[0]);
      }
    });
  };

  // Image upload to AWS s3 bucket
  const handleImageUpload = image => {
    setImgLoad(true);
    const imageFile = {
      uri: image.uri,
      name: image.fileName, // Replace this with a suitable name for your image file
      type: image.type, // Replace this with the appropriate file type (e.g., 'image/png' for PNG images)
    };

    const options = {
      keyPrefix: 'enterezy-banner-images/', // The folder name where you want to store the image in the S3 bucket
      bucket: 'enterezy-app-images', // Replace this with the actual name of your S3 bucket
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
          setBannerImg(response.body.postResponse.location);
        }
      })
      .catch(error => {
        setImgLoad(false);
        console.error('Error uploading image to S3:', error);
      });
  };

  const requestHeader = FetchUtilityOptions();

  const handleFormSubmit = (values, {resetForm}) => {
    if (bannerImg !== null) {
      const data = {
        banner_name: values.banner_name,
        banner_image: bannerImg,
        banner_desc: values.banner_desc,
      };
      fetch(hostName + '/banner', {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          setLoading(false);
          Alert.alert(response.message);
        })
        .catch(error => {
          // Handle any errors
          setLoading(false);
          console.error('post error ', error);
        });
      resetForm();
      values.maximum_retail_price = '';
      setBannerImg('');
      setLoading(false);
    } else {
      Alert.alert('Please upload banner image');
    }
  };
  return (
    <PaperProvider>
      <View style={{alignItems: 'center', marginTop: 12}}>
        <Text style={rentalStyle.rentStoreTxt}>Create Banner</Text>
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{marginBottom: 80}}>
          <ScrollView>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formContainer}>
                  <View marginBottom={8}>
                    <TextInputComponent
                      label="Banner Name"
                      placeholder={'Enter Banner Name *'}
                      onChangeText={handleChange('banner_name')}
                      onBlur={handleBlur('banner_name')}
                      value={values.banner_name}
                      style={styles.input}
                    />
                    {errors.banner_name && touched.banner_name && (
                      <TextComponent
                        text={errors.banner_name}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>

                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Banner Description"
                      placeholder={'Enter Banner Description '}
                      onChangeText={handleChange('banner_desc')}
                      onBlur={handleBlur('banner_desc')}
                      value={values.banner_desc}
                      style={styles.input}
                      multiline={true}
                    />
                    {errors.banner_desc && touched.banner_desc && (
                      <TextComponent
                        text={errors.banner_desc}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>

                  <Button
                    mode="contained"
                    disabled={imgLoad ? true : false}
                    icon={
                      bannerImg
                        ? ({size, color}) =>
                            imgLoad ? (
                              <AntDesign
                                name="loading1"
                                size={size}
                                color={'#000'}
                              />
                            ) : (
                              <FontAwesome5
                                name="check-double"
                                size={size}
                                color={'#fff'}
                              />
                            )
                        : ({size, color}) => (
                            <FontAwesome5
                              name="upload"
                              size={size}
                              color={'#fff'}
                            />
                          )
                    }
                    onPress={handleImageSelection}
                    style={[
                      bannerImg ? style.btnSuccess : style.btn,
                      {borderRadius: 8, width: '90%'},
                    ]}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                      {bannerImg
                        ? 'Banner Image Uploaded'
                        : 'Upload a Banner Image *'}
                    </Text>
                  </Button>
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <Button
                      mode="contained"
                      style={{
                        marginRight: 15,
                        backgroundColor: 'black',
                        borderRadius: 10,
                        alignItems: 'center',
                      }}
                      onPress={handleSubmit}>
                      <Text style={[styles.btnStyle, {color: '#fff'}]}>
                        Submit
                      </Text>
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </PaperProvider>
  );
};

export default CreateBanners;

const style = StyleSheet.create({
  btnSuccess: {
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#FECE00',
  },
});
