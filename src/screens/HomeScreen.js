/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera and storage permissions granted');
      } else {
        console.log('Camera and storage permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLegacyStoragePermission = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles()],
      });
    } catch (error) {
      console.error('Error requesting access to external storage:', error);
    }
  };

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
      console.log('product data ', newData);
      setFilteredData(newData);

      setLoading(false);
      // console.warn(' jsonData.lengthjsonData.length ', jsonData.total);
      // setHasNoData(true);

      // setHasNoData(jsonData.total === filteredData.length ? true : false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
    requestCameraPermission();
    // requestExternalStoragePermission();
  }, []);

  // const requestExternalStoragePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Permission',
  //           message: 'App needs access to external storage to save images.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('External storage permission granted.');
  //       } else {
  //         console.log('External storage permission denied.');
  //       }
  //     } catch (error) {
  //       console.error('Error requesting external storage permission:', error);
  //     }
  //   }
  // };

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

  const renderItem = ({item}) => {
    AsyncStorage.setItem('imageAddress', item?.product_image);
    return (
      <CardComponent
        name="ProductDetails"
        item={item}
        fetchProduct={fetchProduct}
      />
    );
  };

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
          marginBottom: 10,
          marginTop: 15,
          marginHorizontal: 10,
          backgroundColor: '#4277b4',
        }}
        onPress={() => navigation.navigate('DisplayRental')}>
        <Text style={styles.btnStyle}>Click Here For Display Rentals</Text>
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
