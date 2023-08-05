import {View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-paper';
// import {Formik, useFormikContext} from 'formik';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import TextInputComponent from './TextInputComponent';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import {styles} from '../styles/formStyles';
import {rentalStyle} from '../screens/DisplayRental';
import {adminStyle} from '../styles/adminInputStyles';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from './LoadingIndicator';

const validationSchema = Yup.object().shape({
  brand_code: Yup.string()
    .length(3)
    .required('Enter 3 characters of Brand Code'),
  brand_name: Yup.string().required('Brand name required'),
  brand_desc: Yup.string(),
  brand_discount: Yup.number().min(0, 'Brand discount cannot be negative'),
});

const initialValues = {
  brand_code: '',
  brand_name: '',
  brand_desc: '',
  brand_discount: '',
};

const Brand = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormikContext();

  // useEffect(() => {
  //   // Reset the form values to initial values on component reload
  //   if (formik) {
  //     formik.resetForm({values: initialValues});
  //   }
  // }, [formik, initialValues]);

  const requestHeader = FetchUtilityOptions();
  const handleFormSubmit = async (values, {resetForm}) => {
    setLoading(true);
    console.warn(' From data ===> ', values);

    const data = {
      brand_code: values.brand_code.toUpperCase(),
      brand_name: values.brand_name,
      brand_discount: values.brand_discount,
      brand_desc: values.brand_desc,
    };
    fetch(hostName + '/brand', {
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
        console.error('post error ', error);
        setLoading(false);
      });
    resetForm();
    setLoading(false);
  };

  return (
    <>
      <View style={adminStyle.brandFormCont}>
        <Text style={rentalStyle.rentStoreTxt}>Create Brand</Text>
      </View>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
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
                  label="Brand Code"
                  placeholder={'Enter Brand Code *'}
                  onChangeText={handleChange('brand_code')}
                  onBlur={handleBlur('brand_code')}
                  value={values.brand_code}
                  style={styles.input}
                />
                {errors.brand_code && touched.brand_code && (
                  <TextComponent
                    text={errors.brand_code}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <View marginBottom={10}>
                <TextInputComponent
                  label="Brand Name"
                  placeholder={'Enter Brand Name *'}
                  onChangeText={handleChange('brand_name')}
                  onBlur={handleBlur('brand_name')}
                  value={values.brand_name}
                  style={styles.input}
                />
                {errors.brand_code && touched.brand_name && (
                  <TextComponent
                    text={errors.brand_name}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <View marginBottom={10}>
                <TextInputComponent
                  label="Brand Discount"
                  placeholder={'Enter Brand Discount '}
                  onChangeText={handleChange('brand_discount')}
                  onBlur={handleBlur('brand_discount')}
                  value={values.brand_discount}
                  style={styles.input}
                  keyboardType={'numeric'}
                />
                {errors.brand_discount && touched.brand_discount && (
                  <TextComponent
                    text={errors.brand_discount}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <View marginBottom={10}>
                <TextInputComponent
                  label="Brand Description"
                  placeholder={'Enter Brand Description '}
                  onChangeText={handleChange('brand_desc')}
                  onBlur={handleBlur('brand_desc')}
                  value={values.brand_desc}
                  style={styles.input}
                />
                {errors.brand_desc && touched.brand_desc && (
                  <TextComponent
                    text={errors.brand_desc}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <ButtonComponent name="Post Brand" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

export default Brand;
