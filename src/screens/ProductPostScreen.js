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
  PermissionsAndroid,
} from 'react-native';
import {Provider as PaperProvider, Button, Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import {AWSAccessKeyId, AWSSecretKeyId} from '../../keys';
import DocumentPicker from 'react-native-document-picker';
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
import AwsUpload from '../components/AwsUpload';

// validation schema
const validationSchema = Yup.object().shape({
  product_name: Yup.string().required('Product name is required'),
  product_desc: Yup.string().required('Product Description is required'),
  minimum_product_order_quantity: Yup.number()
    .min(1, 'Minimum product order quantity should be at least 1')
    .required('Product order quantity required'),
  //   product_quantity: Yup.number().min(0, 'Product quantity cannot be negative'),
  product_price: Yup.number()
    .min(0, 'Product price cannot be negative')
    .required('Product price is required'),
  product_mrp: Yup.number()
    .min(0, 'Product MRP cannot be negative')
    .required('Product MRP is required'),
});

// Set AWS credentials
// AWS.config.update({
//   region: 'Asia Pacific (Sydney) ap-southeast-2',
//   accessKeyId: 'AWSAccessKeyId',
//   secretAccessKey: 'AWSSecretKeyId',
// });

// const s3 = new AWS.S3();

const ProductPostScreen = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [loadcategory, setLoadCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestHeader = FetchUtilityOptions();

  const clearFormData = () => {
    setCategory('');
    setUploadImage('');
  };

  const navigation = useNavigation();

  const fetchProductCategory = async () => {
    setLoadCategory(true);
    await fetch(hostName + '/category', {method: 'GET', headers: requestHeader})
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData);
        setCategoryList(responseData);
        setLoadCategory(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoadCategory(true);
    setLoading(true);
    fetchProductCategory();
    clearFormData();
  }, []);

  const handleFormSubmit = (values, {resetForm}) => {
    setLoading(true);
    // Handle form submission logic here
    if (uploadImage !== '') {
      // const product_image = uploadImage?.assets[0].uri;
      // values.product_image = uploadImage;

      const data = {
        category_id: category,
        product_name: values.product_name,
        product_price: values.product_price,
        product_mrp: values.product_mrp,
        product_desc: values.product_desc,
        minimum_product_order_quantity: values.minimum_product_order_quantity,
        product_image: uploadImage,
      };

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
          console.error('post error ', error);
        });
      resetForm();
      setUploadImage('');
      setCategory('');
    } else {
      Alert.alert('Please upload product image');
    }
  };

  const initialValues = {
    product_name: '',
    product_desc: '',
    minimum_product_order_quantity: '',
    product_price: '',
    product_mrp: '',
  };

  useEffect(() => {
    requestExternalStoragePermission();
  }, []);

  const requestExternalStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Permission',
            message: 'App needs access to external storage to save images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('External storage permission granted.');
        } else {
          console.log('External storage permission denied.');
        }
      } catch (error) {
        console.error('Error requesting external storage permission:', error);
      }
    }
  };

  const [filePath, setFilePath] = useState({});

  const uploadFile = () => {
    console.log(' 88888 ');
    if (Object.keys(filePath).length === 0) {
      alert('Please select image first');
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.assets[0].uri,
        name: filePath.assets[0].fileName,
        type: filePath.assets[0].type,
      },
      {
        keyPrefix: 'enterezyImages/', // Ex. myuploads/
        bucket: 'enterezy-images', // Ex. aboutreact
        region: 'Asia Pacific (Sydney) ap-southeast-2', // Ex. ap-south-1
        accessKey: AWSAccessKeyId,
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: AWSSecretKeyId,
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      },
    )
      .progress(progress =>
        // setUploadSuccessMessage(
        //   `Uploading: ${progress.loaded / progress.total} (${
        //     progress.percent
        //   }%)`,
        // ),
        console.warn(' progresss ====> ', progress),
      )
      .then(response => {
        if (response.status !== 201) alert('Failed to upload image to S3');
        console.log(response.body);
        let {bucket, etag, key, location} = response.body.postResponse;
        // setUploadSuccessMessage(
        //   `Uploaded Successfully:
        //   \n1. bucket => ${bucket}
        //   \n2. etag => ${etag}
        //   \n3. key => ${key}
        //   \n4. location => ${location}`,
        // );

        console.warn(
          ' 88888888 ==> ',
          `Uploaded Successfully: 
        \n1. bucket => ${bucket}
        \n2. etag => ${etag}
        \n3. key => ${key}
        \n4. location => ${location}`,
        );
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      });
  };

  const handleImageSelection = () => {
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
        const sourcePath = response.assets[0].uri;
        console.warn(' ----- source path ==> ', response);
        const fileName = response.assets[0].fileName;

        setFilePath(response);
        uploadFile();

        // uploadImageToS3(response);
        // setUploadImage(sourcePath);
        // setImageName(fileName);
        // saveImageToPermanentLocation(response);
      }
    });
  };

  const handleChangeItem = item => {
    setCategory(item.id);
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

  return (
    <PaperProvider>
      <View style={{alignItems: 'center', marginTop: 12}}>
        <Text style={{fontSize: 28, marginBottom: 8, fontWeight: 'bold'}}>
          Create Product
        </Text>
      </View>

      {loadcategory && loading ? (
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
                      style={styles.error}
                    />
                  )}

                  <View marginBottom={10} marginLeft={-15}>
                    {categoryList && (
                      <DropDownSelection
                        width={'87%'}
                        data={categoryList}
                        selectedValue={category}
                        onChange={handleChangeItem}
                        renderItem={renderCategoryItem}
                        labelField={'category_name'}
                        valueField={'id'}
                        placeholder={'Select product category *'}
                        searchPlaceholder={'Search category....'}
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
                        style={styles.error}
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
                          style={styles.error}
                        />
                      )}
                  </View>

                  <View marginBottom={10}>
                    <TextInputComponent
                      label="Product Price"
                      placeholder={'Enter Product Price *'}
                      onChangeText={handleChange('product_price')}
                      onBlur={handleBlur('product_price')}
                      value={values.product_price}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {errors.product_price && touched.product_price && (
                      <TextComponent
                        text={errors.product_price}
                        style={styles.error}
                      />
                    )}
                  </View>

                  <View marginBottom={4}>
                    <TextInputComponent
                      label="Product MRP"
                      placeholder={'Enter Product MRP *'}
                      onChangeText={handleChange('product_mrp')}
                      onBlur={handleBlur('product_mrp')}
                      value={values.product_mrp}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {errors.product_mrp && touched.product_mrp && (
                      <TextComponent
                        text={errors.product_mrp}
                        style={styles.error}
                      />
                    )}
                  </View>

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
                  <AwsUpload />
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
