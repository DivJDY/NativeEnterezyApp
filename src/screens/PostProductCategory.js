/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Text} from 'react-native-paper';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {styles} from '../styles/formStyles';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from '../components/LoadingIndicator';

const PostProductCategory = () => {
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState(false);

  const requestOptions = FetchUtilityOptions('POST');
  const handleSubmit = async () => {
    if (category !== '' && discount !== '') {
      const data = {
        category_name: category,
        discount: discount,
      };

      console.warn(' data ', requestOptions, ' => ', data);

      setLoading(true);
      fetch(hostName + '/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          setLoading(false);
          clearForm();
          Alert.alert(response.message);
        })
        .catch(error => {
          // Handle any errors
          console.error('post error ', error);
        });
    } else {
      Alert.alert('Please enter the mentioned mandatory data');
    }
  };

  const clearForm = () => {
    setCategory('');
    setDiscount('');
  };
  return (
    <View style={{margin: 20}}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          style={{marginBottom: 15}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 28, marginBottom: 10, fontWeight: 'bold'}}>
              Product Category
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{marginBottom: 20}} />
            {loading && <LoadingIndicator />}
            <TextInputComponent
              placeholder={'Please Enter Category Name *'}
              onChangeText={text => setCategory(text)}
              value={category}
              style={styles.input}
            />
            <View style={{marginBottom: 20}} />
            <TextInputComponent
              placeholder={'Please Enter Category Discount *'}
              onChangeText={text => setDiscount(text)}
              keyboardType={'numeric'}
              value={discount}
              style={styles.input}
            />
            <View style={{marginBottom: 20}} />
            <ButtonComponent name="Post Category" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostProductCategory;
