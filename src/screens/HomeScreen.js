/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Button, Searchbar, Text, Card} from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import BannerLists from '../components/BannerLists';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import {styles} from '../styles/homeScreen';
import {hostName} from '../../App';
import Icon from 'react-native-vector-icons/AntDesign';
import {cardstyles} from '../styles/cardStyles';

const keyExtractor = item => item.id;

const HomeScreen = ({route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchProduct = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    console.warn(' endpoint ' + hostName + '/products');
    await fetch(hostName + '/products', requestOptions)
      .then(response => response.json())
      .then(responseData => {
        console.warn('fetch data ==> ', responseData);
        setFilteredData(responseData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchProduct();

    setLoading(false);
    console.warn('ttt ', JSON.stringify(route?.params));
  }, [route?.params]);

  const handleSearch = query => {
    if (query !== '') {
      setSearchQuery(query);

      const filteredItems = filteredData?.filter(item =>
        item.product_name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filteredItems);
    } else {
      fetchProduct();
    }
  };

  const renderItem = ({item}) => (
    <CardComponent
      name="ProductDetails"
      item={item}
      fetchProduct={fetchProduct}
    />
  );

  return (
    <>
      <BannerLists />
      <View style={styles.container}>
        <Button
          mode="contained"
          style={{marginBottom: 8}}
          onPress={() => navigation.navigate('DisplayRental')}>
          Display Rentals
        </Button>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {loading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
        {filteredData.length === 0 && (
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            No Data Found
          </Text>
        )}
      </View>
    </>
  );
};

export default HomeScreen;
