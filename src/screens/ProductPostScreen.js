/* eslint-disable react-hooks/exhaustive-deps */
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
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import {AWSAccessKeyId, AWSSecretKeyId} from '../AWSkeys';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {dropdownstyle} from '../styles/dropdownStyles';
import DropDownSelection from '../components/DropDownSelection';
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import {styles} from '../styles/formStyles';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';
import {rentalStyle} from './DisplayRental';

// validation schema
const validationSchema = Yup.object().shape({
  product_code: Yup.string()
    .length(3)
    .required('Enter 3 characters of product Code'),
  product_name: Yup.string().required('Product name is required'),
  product_desc: Yup.string().required('Product Description is required'),
  minimum_product_order_quantity: Yup.number()
    .min(1, 'Minimum product order quantity should be at least 1')
    .required('Product order quantity required'),
  //   product_quantity: Yup.number().min(0, 'Product quantity cannot be negative'),
  selling_price: Yup.number()
    .min(0, 'Product price cannot be negative')
    .required('Product price is required'),
  maximum_retail_price: Yup.number()
    .min(0, 'Product MRP cannot be negative')
    .required('Product MRP is required'),
});

const ProductPostScreen = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [brand, setBrand] = useState('');
  const [brandList, setBrandList] = useState([]);
  const [loadbrand, setLoadBrand] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgLoad, setImgLoad] = useState(false);

  const formik = useFormikContext();

  const requestHeader = FetchUtilityOptions();

  const clearFormData = () => {
    setBrand('');
    setUploadImage('');
    // formik.resetForm();
  };

  const navigation = useNavigation();

  const fetchProductBrand = async () => {
    setLoadBrand(true);
    await fetch(hostName + '/brand', {method: 'GET', headers: requestHeader})
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData);
        setBrandList(responseData);
        setLoadBrand(false);
      })
      .catch(error => {
        setLoadBrand(false);
        console.error(error);
      });
    setLoadBrand(false);
  };

  useEffect(() => {
    setLoadBrand(true);
    setLoading(true);
    fetchProductBrand();
  }, []);

  const handleFormSubmit = (values, {resetForm}) => {
    setLoading(true);
    // Handle form submission logic here
    if (uploadImage !== '') {
      const data = {
        product_code: values.product_code.toUpperCase(),
        product_name: values.product_name,
        brand_code: brand,
        selling_price: values.selling_price,
        maximum_retail_price: values.maximum_retail_price,
        product_desc: values.product_desc,
        minimum_product_order_quantity: values.minimum_product_order_quantity,
        product_image: uploadImage,
      };

      // console.warn(' post data => ', data);

      fetch(hostName + '/products', {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          // Handle the response data
          // console.log('data response ', response);
          setLoading(false);
          Alert.alert(response.message);
          navigation.navigate('HomeDrawer', {loading: loading});
        })
        .catch(error => {
          // Handle any errors
          setLoading(false);
          console.error('post error ', error);
        });
      resetForm();
      values.maximum_retail_price = '';
      setUploadImage('');
      setBrand('');
      setLoading(false);
    } else {
      Alert.alert('Please upload product image');
    }
  };

  const initialValues = {
    product_code: '',
    product_name: '',
    product_desc: '',
    minimum_product_order_quantity: '',
    selling_price: '',
    maximum_retail_price: '',
  };

  useEffect(() => {
    clearFormData();
  }, []);

  // Image upload to AWS s3 bucket
  const handleImageUpload = image => {
    setImgLoad(true);
    const imageFile = {
      uri: image.uri,
      name: image.fileName, // Replace this with a suitable name for your image file
      type: image.type, // Replace this with the appropriate file type (e.g., 'image/png' for PNG images)
    };

    const options = {
      keyPrefix: 'enterezy-product-images/', // The folder name where you want to store the image in the S3 bucket
      bucket: 'enterezy-app-images', // Replace this with the actual name of your S3 bucket
      region: 'ap-southeast-2', // Replace this with the AWS region where your S3 bucket is located (e.g., 'us-east-1')
      accessKey: AWSAccessKeyId, // Replace this with your AWS access key
      secretKey: AWSSecretKeyId, // Replace this with your AWS secret key
      successActionStatus: 201,
    };

    // const options = {
    //   keyPrefix: 'enterezy-product-images/', // The folder name where you want to store the image in the S3 bucket
    //   bucket: 'enterezy-images', // Replace this with the actual name of your S3 bucket
    //   region: 'ap-southeast-2', // Replace this with the AWS region where your S3 bucket is located (e.g., 'us-east-1')
    //   accessKey: AWSAccessKeyId, // Replace this with your AWS access key
    //   secretKey: AWSSecretKeyId, // Replace this with your AWS secret key
    //   successActionStatus: 201,
    // };

    RNS3.put(imageFile, options)
      .then(response => {
        if (response.status !== 201) {
          setImgLoad(false);
          console.error('Failed to upload image to S3:', response);
        } else {
          setImgLoad(false);
          console.log('Image successfully uploaded to S3:', response.body);
          setUploadImage(response.body.postResponse.location);
        }
      })
      .catch(error => {
        setImgLoad(false);
        console.error('Error uploading image to S3:', error);
      });
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
        // const sourcePath = response.assets[0].uri;
        // console.warn(' ----- source path ==> ', response);
        // const fileName = response.assets[0].fileName;

        handleImageUpload(response.assets[0]);
      }
    });
  };

  const handleChangeItem = item => {
    setBrand(item.brand_code);
  };

  const renderBrandItem = item => {
    return (
      <View style={dropdownstyle.item}>
        <Text style={dropdownstyle.textItem}>{item.brand_name}</Text>
        {item.brand_code === brand && (
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

  return (
    <PaperProvider>
      <View style={{alignItems: 'center', marginTop: 12}}>
        <Text style={rentalStyle.rentStoreTxt}>Create Product</Text>
      </View>

      {loadbrand && loading ? (
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
                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Product Code"
                      placeholder={'Enter Product Code *'}
                      onChangeText={handleChange('product_code')}
                      onBlur={handleBlur('product_code')}
                      value={values.product_code}
                      style={styles.input}
                    />
                    {errors.product_desc && touched.product_desc && (
                      <TextComponent
                        text={errors.product_code}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>
                  <View marginBottom={8}>
                    <TextInputComponent
                      label="Product Name"
                      placeholder={'Enter Product Name *'}
                      onChangeText={handleChange('product_name')}
                      onBlur={handleBlur('product_name')}
                      value={values.product_name}
                      style={styles.input}
                    />
                    {errors.product_name && touched.product_name && (
                      <TextComponent
                        text={errors.product_name}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>

                  <View marginBottom={14} marginLeft={-5}>
                    {brandList && (
                      <DropDownSelection
                        width={'89%'}
                        data={brandList}
                        selectedValue={brand}
                        onChange={handleChangeItem}
                        renderItem={renderBrandItem}
                        labelField={'brand_name'}
                        valueField={'brand_code'}
                        placeholder={'Select the Product Brand *'}
                        searchPlaceholder={'Search brand....'}
                      />
                    )}
                  </View>
                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Product Description"
                      placeholder={'Enter Product Description *'}
                      onChangeText={handleChange('product_desc')}
                      onBlur={handleBlur('product_desc')}
                      value={values.product_desc}
                      style={styles.input}
                      multiline={true}
                    />
                    {errors.product_desc && touched.product_desc && (
                      <TextComponent
                        text={errors.product_desc}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>

                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Minimum Product Order Quantity"
                      placeholder={'Enter Minimum Product Order Quantity *'}
                      onChangeText={handleChange(
                        'minimum_product_order_quantity',
                      )}
                      onBlur={handleBlur('minimum_product_order_quantity')}
                      value={values.minimum_product_order_quantity}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {errors.minimum_product_order_quantity &&
                      touched.minimum_product_order_quantity && (
                        <TextComponent
                          text={errors.minimum_product_order_quantity}
                          style={[
                            styles.error,
                            {color: 'red', marginTop: -6, marginBottom: 8},
                          ]}
                        />
                      )}
                  </View>

                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Product Price"
                      placeholder={'Enter Product Selling Price *'}
                      onChangeText={handleChange('selling_price')}
                      onBlur={handleBlur('selling_price')}
                      value={values.selling_price}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {errors.selling_price && touched.selling_price && (
                      <TextComponent
                        text={errors.selling_price}
                        style={[
                          styles.error,
                          {color: 'red', marginTop: -6, marginBottom: 8},
                        ]}
                      />
                    )}
                  </View>

                  <View marginBottom={4}>
                    <TextInputComponent
                      label="Product MRP"
                      placeholder={'Enter Product MRP *'}
                      onChangeText={handleChange('maximum_retail_price')}
                      on44Blur={handleBlur('maximum_retail_price')}
                      value={values.product_mrp}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {errors.maximum_retail_price &&
                      touched.maximum_retail_price && (
                        <TextComponent
                          text={errors.maximum_retail_price}
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
                      uploadImage
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
                              color={color}
                            />
                          )
                    }
                    onPress={handleImageSelection}
                    style={[
                      uploadImage ? style.btnSuccess : style.btn,
                      {marginVertical: 15, borderRadius: 8, width: '90%'},
                    ]}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                      {uploadImage
                        ? 'Product Image Uploaded'
                        : 'Upload a Product Image *'}
                    </Text>
                  </Button>

                  <Button
                    mode="contained"
                    style={{
                      marginRight: 15,
                      backgroundColor: 'black',
                      borderRadius: 10,
                    }}
                    onPress={handleSubmit}>
                    <Text style={[styles.btnStyle, {color: '#fff'}]}>
                      Submit
                    </Text>
                  </Button>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </PaperProvider>
  );
};

export default ProductPostScreen;

const style = StyleSheet.create({
  btnSuccess: {
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#FECE00',
  },
});
