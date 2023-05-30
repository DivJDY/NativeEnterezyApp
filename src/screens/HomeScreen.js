/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  // Dimensions
} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import CardComponent from '../components/CardComponent';
// import {productdata} from '../ProductJsonData';
import BannerLists from '../components/BannerLists';
import {useNavigation} from '@react-navigation/native';
import {getAllProducts, createProductTable} from '../db/database';
import LoadingIndicator from '../components/LoadingIndicator';
import {styles} from '../styles/homeScreen';
import NoDataFound from '../components/NoDataFound';

// const {width} = Dimensions.get('window');
// const CARD_WIDTH = (width - 20) / 2 - 10; // Subtracting margin and padding

const keyExtractor = item => item.id;

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchProduct = async () => {
    setLoading(true);
    await getAllProducts()
      .then(async products => {
        console.log('All products: ', products);
        setFilteredData(await products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
      });
  };

  useEffect(() => {
    setLoading(true);
    createProductTable();
    fetchProduct();
  }, []);

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
    <CardComponent name="ProductDetails" item={item} />
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
        {filteredData.length === 0 && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            No Data Found
          </Text>
        )}
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
      </View>
    </>
  );
};

export default HomeScreen;
