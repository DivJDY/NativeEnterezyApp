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

const GetCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoading(true);
    await fetch(hostName + '/category', requestOptions)
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const deleteCategoryItem = async id => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    setLoading(true);
    await fetch(hostName + '/category/' + id, requestOptions)
      .then(res => res.json())
      .then(res => {
        Alert.alert(res.message);
        fetchCategory();
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const deleteCategory = id => {
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
            deleteCategoryItem(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderCategoryItem = ({item, index}) => (
    <>
      <List.Item
        titleStyle={styles.item}
        descriptionStyle={styles.description}
        title={`Category Id: ${item.id}`}
        description={`Category Name: ${item.category_name}`}
        right={() => (
          <TouchableOpacity onPress={() => deleteCategory(item.id)}>
            <Icon name="delete" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
      {index !== category.length - 1 && <Divider style={{borderWidth: 1}} />}
    </>
  );
  return (
    <View>
      <View
        style={[adminStyle.brandFormCont, {marginBottom: 8, marginTop: 10}]}>
        <Text style={rentalStyle.rentStoreTxt}>List Of Category</Text>
      </View>
      {loading && <LoadingIndicator />}

      {category !== [] ? (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <FlatList
            data={category}
            renderItem={renderCategoryItem}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      ) : (
        <NoDataFound message={'Asset data not found'} />
      )}
    </View>
  );
};

export default GetCategory;
