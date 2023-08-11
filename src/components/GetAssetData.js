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

const GetAssetData = () => {
  const [asset, setAsset] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAsset();
  }, []);

  const fetchAsset = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoading(true);
    await fetch(hostName + '/typeofasset', requestOptions)
      .then(res => res.json())
      .then(res => setAsset(res))
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const deleteAssetItem = async code => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoading(true);
    await fetch(hostName + '/typeofasset/' + code, requestOptions)
      .then(res => res.json())
      .then(res => {
        Alert.alert(res.message);
        fetchAsset();
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const deleteAsset = store_asset_code => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this Asset ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            deleteAssetItem(store_asset_code);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderAssetItem = ({item, index}) => (
    <>
      <List.Item
        titleStyle={styles.item}
        descriptionStyle={styles.description}
        title={`Asset Code: ${item.store_asset_code}`}
        description={`Asset Name: ${item.store_asset_name}`}
        right={() => (
          <TouchableOpacity onPress={() => deleteAsset(item.store_asset_code)}>
            <Icon name="delete" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
      {index !== asset.length - 1 && <Divider style={{borderWidth: 1}} />}
    </>
  );
  return (
    <View>
      <View
        style={[adminStyle.brandFormCont, {marginBottom: 8, marginTop: 10}]}>
        <Text style={rentalStyle.rentStoreTxt}>List Of Asset Data</Text>
      </View>
      {loading && <LoadingIndicator />}

      {asset.length !== [] ? (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <FlatList
            data={asset}
            renderItem={renderAssetItem}
            keyExtractor={item => item.store_asset_code.toString()}
          />
        </ScrollView>
      ) : (
        <NoDataFound message={'Asset data not found'} />
      )}
    </View>
  );
};

export default GetAssetData;
