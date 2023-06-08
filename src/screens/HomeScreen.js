/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
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

  // eslint-disable-next-line no-unused-vars
  const [hasNoData, setHasNoData] = useState(false);
  const [page_limit, setPageLimit] = useState(2);

  const navigation = useNavigation();

  const fetchProduct = async () => {
    // console.warn(' 00000 ', hasNoData);
    setLoading(true);
    try {
      const response = await fetch(
        `${hostName}/products?page_limit=${page_limit}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      const newData = jsonData.products;
      setFilteredData(newData);

      setLoading(false);
      // console.warn(' jsonData.lengthjsonData.length ', jsonData.total);
      // setHasNoData(true);

      // setHasNoData(jsonData.total === filteredData.length ? true : false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [route, page_limit]);

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

  const handleLoadMore = () => {
    setSearchQuery('');
    console.warn(' Search query ', searchQuery);
    if (!loading) {
      setPageLimit(page_limit + 2);
      fetchProduct();
    }
  };

  const footerView = () => {
    // console.warn('gggg ', filteredData.length);
    return (
      <View style={{flex: 1}}>
        {filteredData.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            No Data Found
          </Text>
        ) : loading ? (
          <LoadingIndicator />
        ) : (
          <TouchableOpacity onPress={handleLoadMore}>
            <Text
              style={[hasNoData ? styles.loadMoreTxtdis : styles.loadMoreTxt]}>
              {hasNoData ? 'No more data' : 'Load more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <Button
        mode="contained"
        style={{
          marginBottom: 8,
          marginTop: 15,
          marginHorizontal: 10,
        }}
        onPress={() => navigation.navigate('DisplayRental')}>
        <Text style={styles.btnStyle}>Display Rentals</Text>
      </Button>
      <BannerLists />
      <View style={styles.container}>
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
            ListFooterComponent={footerView}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </>
  );
};

export default HomeScreen;
