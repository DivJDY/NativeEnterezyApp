/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View, Alert} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles/cardStyles';
import NoDataFound from '../components/NoDataFound';
import {useNavigation} from '@react-navigation/native';
// import {cartItems} from '../CartItems';
import {cartItems} from '../components/CardDetailsComponent';

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

  // const reloadData = () => {
  //   // Set the loading state to true
  //   setIsLoading(true);

  //   // Perform the data fetching or reloading logic
  //   // Once the data is fetched or reloaded, update the state and set isLoading to false
  //   // You can use an API call or any other data retrieval mechanism here

  //   // Example of simulating an asynchronous data fetch
  //   setTimeout(() => {
  //     // Update the state and set isLoading to false
  //     setIsLoading(false);
  //     // Update your data state or trigger any necessary actions after reloading the data
  //   }, 2000); // Simulating a 2-second delay
  // };

  console.warn(' Yashas ' + Item);

  // Inside your component or function
  const showAlert = itemId => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // Action to perform when Cancel is pressed
            // console.log('Cancel pressed');
          },
        },
        {
          text: 'OK',
          onPress: () => {
            // Action to perform when OK is pressed
            removeFromCart(itemId);
            // console.log('OK pressed');
          },
        },
      ],
      {cancelable: true},
    );
  };

  // let uniqueData = [];

  // async function updateCart() {
  //   // Perform asynchronous operations
  //   uniqueData = await [...new Set(cartItems?.map(item => item.id))].map(id => {
  //     return cartItems.find(item => item.id === id);
  //   });

  //   await setItem(uniqueData);
  //   console.warn('==> ' + JSON.stringify(uniqueData));
  //   cartItems.length = 0;
  //   Array.prototype.push.apply(cartItems, uniqueData);
  //   console.warn(' 88888888888888 999999999' + JSON.stringify(Item));
  // }
  async function updateCart() {
    // Perform asynchronous operations
    const uniqueData = [...new Set(cartItems?.map(item => item.id))].map(id => {
      return cartItems.find(item => item.id === id);
    });

    await setItem(uniqueData);
    // setItem(prevState => ({
    //   ...prevState,
    //   Item: uniqueData,
    // }));
    reloadData();
    console.warn('==> ' + JSON.stringify(uniqueData));
    cartItems.length = 0;
    Array.prototype.push.apply(cartItems, uniqueData);
    // console.warn(' 88888888888888 999999999' + JSON.stringify(Item));
  }

  useEffect(() => {
    // setTimeout(() => {
    // const uniqueData = [...new Set(cartItems?.map(item => item.id))].map(id => {
    //   return cartItems.find(item => item.id === id);
    // });
    // setItem(uniqueData);

    // cartItems.length = 0;
    // Array.prototype.push.apply(cartItems, uniqueData);
    // }, 2000);

    updateCart();

    // console.warn(' ==> Data ' + Item);
    setIsLoading(false);
    // window.location.reload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(Item);
    // setItem(item => [...item]);
  }, [Item]);

  // Function to remove an item from the cart
  const removeFromCart = itemId => {
    const updatedCartItems = Item.filter(item => item.id !== itemId);

    setItem(updatedCartItems);
    // Update the imported array reference
    cartItems.length = 0;
    Array.prototype.push.apply(cartItems, updatedCartItems);
  };

  let totalPrice = 0;
  totalPrice = Item?.reduce((total, product) => {
    const price = parseFloat(product.product_price);

    if (!isNaN(price)) {
      return total + price;
    } else {
      return total;
    }
  }, 0);

  const RenderCart = ({item}) => {
    const totalProductPrice = item?.product_price * item?.quantity;

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
                {totalProductPrice}
              </Text>
              <Text style={[styles.cardSubtitle]} variant="bodyMedium">
                Product quantity: {item?.quantity}
              </Text>
            </View>
          </View>
          <Button color="black" onPress={() => showAlert(item.id)}>
            Remove
          </Button>
        </Card>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <ActivityIndicator
          style={{paddingVertical: 8}}
          size="large"
          color="blue"
        />
      )}

      {Item.length !== 0 ? (
        <>
          <FlatList
            data={Item}
            renderItem={({item}) => <RenderCart item={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => reloadData}
            onEndReachedThreshold={0.5}
          />
          {/* <View
            style={{alignItems: 'center', flexWrap: 'nowrap', marginTop: 20}}>
            <Button
              mode="outlined"
              style={{borderRadius: 12, alignItems: 'center'}}
              onPress={() => reloadData()}>
              Update Cart
            </Button>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Button>
              <Text style={{fontSize: 16, color: '#5832a8'}}>
                Total: <Text style={{color: '#5832a8'}}>{'\u20B9'}</Text>
                {totalPrice}
              </Text>
            </Button>
            <Button
              mode="contained"
              style={{borderRadius: 12, marginLeft: 10}}
              onPress={() =>
                Alert.alert(
                  'You want to proceed',
                  navigation.navigate('Payment'),
                )
              }>
              <Text
                style={{fontSize: 16, color: '#fff'}}
                // onPress={() => navigation.navigate('Payment')}
              >
                Proceed
              </Text>
            </Button>
          </View>
        </>
      ) : (
        <>
          <NoDataFound />
          {/* <View
            style={{alignItems: 'center', flexWrap: 'nowrap', marginTop: 20}}>
            <Button
              mode="outlined"
              style={{borderRadius: 12, alignItems: 'center'}}
              onPress={() => updateCart()}>
              Update Cart
            </Button>
          </View> */}
        </>
      )}
      <View
        style={{alignItems: 'center', flexWrap: 'nowrap', marginVertical: 20}}>
        <Button
          mode="outlined"
          style={{borderRadius: 12, alignItems: 'center'}}
          onPress={() => updateCart()}>
          Update Cart
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
