/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, View, Alert} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {styles} from '../styles/cardStyles';
import NoDataFound from '../components/NoDataFound';
import {useNavigation} from '@react-navigation/native';
import {hostName} from '../../App';
import LoadingIndicator from '../components/LoadingIndicator';

const CartScreen = () => {
  const [Item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const reloadData = () => {
    // Toggle the reload state to trigger a re-render of the component
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setIsLoading(true);
  };

  const deleteCartItem = async id => {
    await fetch(hostName + '/cart/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.message);
        getCartItems();
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('Error:', error);
      });
  };

  // Inside your component or function
  const showAlert = id => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this Cart Item  ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            deleteCartItem(id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  async function getCartItems() {
    setIsLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    // console.warn(' endpoint ' + hostName + '/cart');
    await fetch(hostName + '/cart', requestOptions)
      .then(response => response.json())
      .then(responseData => {
        console.warn('fetch data ==> ', responseData);
        setItem(responseData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getCartItems();
    setIsLoading(false);
  }, []);

  let totalPrice = 0;
  totalPrice = Item?.reduce((total, product) => {
    const price = parseFloat(product.total_product_price);

    if (!isNaN(price)) {
      return total + price;
    } else {
      return total;
    }
  }, 0);

  const RenderCart = ({item}) => {
    return (
      <>
        <Card style={{marginHorizontal: 10, marginVertical: 10, padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image
              size={110}
              mode="contain"
              source={{uri: item?.product_image}}
            />
            <View style={{flexDirection: 'column', marginLeft: 20}}>
              <Text style={styles.cardTitle} variant="titleLarge">
                {item?.product_name}
              </Text>

              <Text
                style={[styles.cardSubtitle, {marginVertical: 5}]}
                variant="bodyMedium">
                Price: <Text style={{marginLeft: 5}}>{'\u20B9'}</Text>
                {item?.product_price}
              </Text>
              <Text
                style={[styles.cardSubtitle, {marginBottom: 5}]}
                variant="bodyMedium">
                Total Price: <Text style={{marginLeft: 5}}>{'\u20B9'}</Text>
                {item?.total_product_price}
              </Text>
              <Text style={[styles.cardSubtitle]} variant="bodyMedium">
                Product quantity: {item?.quantity}
              </Text>
            </View>
          </View>
          <Button onPress={() => showAlert(item.id)}>
            <Text
              style={{
                fontSize: 17,
                color: '#FECE00',
                fontWeight: 'semi-bold',
                lineHeight: 20,
              }}>
              Remove
            </Text>
          </Button>
        </Card>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && <LoadingIndicator />}

      {Item.length !== 0 ? (
        <>
          <FlatList
            data={Item}
            renderItem={({item}) => <RenderCart item={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => reloadData}
            onEndReachedThreshold={0.5}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 12,
            }}>
            <Button>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',

                  fontWeight: 'bold',
                }}>
                Total: {'\u20B9'}
                {totalPrice}
              </Text>
            </Button>
            <Button
              mode="contained"
              style={{
                marginLeft: 10,
                backgroundColor: 'black',
              }}
              onPress={() =>
                navigation.navigate('Payment', {
                  cartData: Item,
                  totalPrice: totalPrice,
                })
              }>
              <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                Proceed
              </Text>
            </Button>
          </View>
        </>
      ) : (
        <NoDataFound />
      )}
      <View
        style={{
          alignItems: 'center',
          flexWrap: 'nowrap',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <Button
          mode="outlined"
          style={{
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 3,
          }}
          onPress={() => getCartItems()}>
          Update Cart
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
