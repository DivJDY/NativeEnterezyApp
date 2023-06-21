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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {dropdownstyle} from '../styles/dropdownStyles';
import DropDownSelection from '../components/DropDownSelection';
import RNFS from 'react-native-fs';
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import {styles} from '../styles/formStyles';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';

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

const ProductPostScreen = () => {
  const [uploadImage, setUploadImage] = useState('');
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
      values.product_image = uploadImage;

      const data = {
        category_id: category,
        product_name: values.product_name,
        product_price: values.product_price,
        product_mrp: values.product_mrp,
        product_desc: values.product_desc,
        minimum_product_order_quantity: values.minimum_product_order_quantity,
        product_image: values.product_image,
      };

      console.warn('Product post data ==> ', data);

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
          navigation.navigate('Home', {loading: loading});
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
            console.warn(' Image uploaded ', sourcePath, targetPath);
            setUploadImage(targetPath); // Set the permanent image URI to display it
          })
          .catch(error => {
            console.log('Image copy error: ', error);
          });
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

                  <ButtonComponent name="Submit" onPress={handleSubmit} />
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
