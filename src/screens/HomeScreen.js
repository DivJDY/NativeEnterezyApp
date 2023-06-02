/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import BannerLists from '../components/BannerLists';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import {styles} from '../styles/homeScreen';
import {hostName} from '../../App';

const keyExtractor = item => item.id;

const HomeScreen = ({route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(
    route?.params ? route?.params.loading : false,
  );

  const navigation = useNavigation();

  const reloadData = () => {
    // Toggle the reload state to trigger a re-render of the component
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setLoading(true);
  };

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
    reloadData();
    fetchProduct();
    setLoading(false);
    // console.log(' Route ', route?.params.loading);
  }, [route]);

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
            onEndReached={() => reloadData}
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
