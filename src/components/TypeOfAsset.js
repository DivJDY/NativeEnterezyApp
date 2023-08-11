/* eslint-disable react-native/no-inline-styles */
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
  store_asset_name: Yup.string().required('Asset name required'),
  store_asset_desc: Yup.string(),
});

const initialValues = {
  store_asset_name: '',
  store_asset_desc: '',
};

const TypeOfAsset = () => {
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
      store_asset_name: values.store_asset_name,
      store_asset_desc: values.store_asset_desc,
    };
    fetch(hostName + '/typeofasset', {
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
      <View style={[adminStyle.brandFormCont, {marginTop: 10}]}>
        <Text style={rentalStyle.rentStoreTxt}>Create Asset</Text>
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
                  label="Asset Name"
                  placeholder={'Enter Store Asset Name *'}
                  onChangeText={handleChange('store_asset_name')}
                  onBlur={handleBlur('store_asset_name')}
                  value={values.store_asset_name}
                  style={styles.input}
                />
                {errors.store_asset_name && touched.store_asset_name && (
                  <TextComponent
                    text={errors.store_asset_name}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <View marginBottom={10}>
                <TextInputComponent
                  label="Asset Description"
                  placeholder={'Enter Store Asset Description '}
                  onChangeText={handleChange('store_asset_desc')}
                  onBlur={handleBlur('store_asset_desc')}
                  value={values.store_asset_desc}
                  style={styles.input}
                  multiline={true}
                />
                {errors.store_asset_desc && touched.store_asset_desc && (
                  <TextComponent
                    text={errors.store_asset_desc}
                    style={[styles.error, adminStyle.brandFormErr]}
                  />
                )}
              </View>

              <ButtonComponent name="Post Asset" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

export default TypeOfAsset;
