/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
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
import TextInputComponent from '../components/TextInputComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import {styles} from '../styles/formStyles';
import {hostName} from '../../App';
import {useNavigation} from '@react-navigation/native';

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
  const [loading] = useState(true);

  const navigation = useNavigation();

  const handleFormSubmit = (values, {resetForm}) => {
    // Handle form submission logic here
    if (uploadImage !== '') {
      const product_image = uploadImage?.assets[0].uri;
      values.product_image = product_image;

      const data = {
        product_name: values.product_name,
        product_price: values.product_price,
        product_mrp: values.product_mrp,
        product_desc: values.product_desc,
        minimum_product_order_quantity: values.minimum_product_order_quantity,
        product_image: values.product_image,
      };

      fetch(hostName + '/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          // Handle the response data
          // console.log('data response ', response);
          Alert.alert(response.message);
          navigation.navigate('HomeStack', {loading: loading});
        })
        .catch(error => {
          // Handle any errors
          console.error('post error ', error);
        });
      resetForm();
      setUploadImage('');
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

  const selectImage = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setUploadImage(response);
      }
    });
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{marginBottom: 18}}>
          <Text
            variant="headlineSmall"
            style={{
              textAlign: 'center',
              marginTop: 12,
              textDecorationLine: 'underline',
            }}>
            Create Product
          </Text>
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

                <TextInputComponent
                  label="Minimum Product Order Quantity"
                  placeholder={'Enter Minimum Product Order Quantity *'}
                  onChangeText={handleChange('minimum_product_order_quantity')}
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
                  onPress={selectImage}
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
    </PaperProvider>
  );
};

export default ProductPostScreen;

const style = StyleSheet.create({
  btnSuccess: {
    backgroundColor: 'green',
  },
  btn: {
    backgroundColor: 'blue',
  },
});
