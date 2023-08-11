/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {List, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {hostName} from '../../App';
import LoadingIndicator from './LoadingIndicator';
import NoDataFound from './NoDataFound';
import {styles} from '../styles/userListsStyle';
import {adminStyle} from '../styles/adminInputStyles';
import {rentalStyle} from '../screens/DisplayRental';

const BrandData = () => {
  const [brand, setBrand] = useState([]);
  const [loadBrand, setLoadBrand] = useState(false);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoadBrand(true);
    await fetch(hostName + '/brand', requestOptions)
      .then(res => res.json())
      .then(res => setBrand(res))
      .catch(error => {
        console.log(error);
        setLoadBrand(false);
      });
    setLoadBrand(false);
  };

  const deleteBrandItem = async code => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoadBrand(true);
    await fetch(hostName + '/brand/' + code, requestOptions)
      .then(res => res.json())
      .then(res => {
        Alert.alert(res.message);
        fetchBrand();
      })
      .catch(error => {
        console.log(error);
        setLoadBrand(false);
      });
    setLoadBrand(false);
  };

  const deleteBrand = brand_code => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this brand ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            deleteBrandItem(brand_code);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderBrandItem = ({item, index}) => (
    <>
      <List.Item
        titleStyle={styles.item}
        descriptionStyle={styles.description}
        title={`Brand Code: ${item.brand_code}`}
        description={`Brand Name: ${item.brand_name}`}
        right={() => (
          <TouchableOpacity onPress={() => deleteBrand(item.brand_code)}>
            <Icon name="delete" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
      {index !== brand.length - 1 && <Divider style={{borderWidth: 1}} />}
    </>
  );
  return (
    <View>
      <View style={[adminStyle.brandFormCont, {marginBottom: 8}]}>
        <Text style={rentalStyle.rentStoreTxt}>List Of Brand Data</Text>
      </View>
      {loadBrand && <LoadingIndicator />}

      {brand !== [] ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={brand}
            renderItem={renderBrandItem}
            keyExtractor={item => item.brand_code}
          />
        </ScrollView>
      ) : (
        <NoDataFound message={'Brand data not found'} />
      )}
    </View>
  );
};

export default BrandData;
