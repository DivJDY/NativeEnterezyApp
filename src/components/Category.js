/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import TextInputComponent from './TextInputComponent';
import ButtonComponent from './ButtonComponent';
import {styles} from '../styles/formStyles';
import {rentalStyle} from '../screens/DisplayRental';
import {hostName} from '../../App';
import {FetchUtilityOptions} from '../fetchUtility/FetchRequestOption';
import LoadingIndicator from './LoadingIndicator';

const Category = () => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const requestHeader = FetchUtilityOptions();
  const handleSubmit = async () => {
    if (category !== '') {
      const data = {
        category_name: category,
      };

      setLoading(true);
      fetch(hostName + '/category', {
        method: 'POST',
        headers: requestHeader,
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
          setLoading(false);
          setCategory('');
        });
      setLoading(false);
    } else {
      Alert.alert('Please enter the mentioned mandatory data');
    }
  };

  const clearForm = () => {
    setCategory('');
  };
  return (
    <View style={{margin: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text style={rentalStyle.rentStoreTxt}>Create Category</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginBottom: 10}} />
        {loading && <LoadingIndicator />}
        <TextInputComponent
          placeholder={'Please Enter Category Name *'}
          onChangeText={text => setCategory(text)}
          value={category}
          style={styles.input}
        />

        <View style={{marginBottom: 5}} />
        <ButtonComponent name="Post Category" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Category;
