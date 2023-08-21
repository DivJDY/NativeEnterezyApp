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
    setIsLoading(true);
    await fetch(hostName + '/cart/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.message);
        Alert.alert(response.message);
        getCartItems();
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        // Handle any network or other errors
        console.error('Error:', error);
      });
    setIsLoading(false);
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
        console.warn('fetch cart data ==> ', responseData);
        setItem(responseData);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
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
    const price = parseFloat(product.total_price);

    if (!isNaN(price)) {
      return total + price;
    } else {
      return total;
    }
  }, 0);

  const RenderCart = ({item}) => (
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
            Product Brand: {item?.product_brand}
          </Text>

          <Text style={[styles.cardSubtitle]} variant="bodyMedium">
            Product quantity purchased: {item?.quantity_purchased}
          </Text>
          <Text
            style={[styles.cardSubtitle, {lineHeight: 25}]}
            variant="bodyMedium">
            Tax: {item?.tax_rate}
          </Text>
          <Text
            style={[styles.cardSubtitle, {marginVertical: 5}]}
            variant="bodyMedium">
            Price: <Text style={{marginLeft: 5}}>{'\u20B9'}</Text>
            {item?.selling_price}
          </Text>
          <Text
            style={[styles.cardSubtitle, {marginBottom: 5}]}
            variant="bodyMedium">
            Total Price: <Text style={{marginLeft: 5}}>{'\u20B9'}</Text>
            {item?.total_price.toFixed(2)}
          </Text>
        </View>
      </View>
      <Button onPress={() => showAlert(item.cart_code)}>
        <Text
          style={{
            fontSize: 17,
            color: '#FECE00',
            fontWeight: 600,
            lineHeight: 20,
          }}>
          Remove
        </Text>
      </Button>
    </Card>
  );

  return (
    <View style={{flex: 1}}>
      {isLoading && <LoadingIndicator />}

      {Item.length !== 0 ? (
        <>
          <FlatList
            data={Item}
            renderItem={RenderCart}
            keyExtractor={item => item.cart_code}
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
                {totalPrice.toFixed(2)}
              </Text>
            </Button>
            <Button
              mode="contained"
              style={{
                marginLeft: 10,
                backgroundColor: 'black',
              }}
              onPress={() =>
                navigation.navigate('CartProceed', {
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
        <NoDataFound message="No Cart Item Found" />
      )}
      <View
        style={{
          alignItems: 'center',
          flexWrap: 'nowrap',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <Button
          mode="contained"
          style={{
            backgroundColor: '#FECE00',
            alignItems: 'center',
          }}
          onPress={() => getCartItems()}>
          Update Cart
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
