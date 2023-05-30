/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles/cardStyles';
import QuantitySelector from './QuantitySelector';
// import {cartItems} from '../CartItems';

export const cartItems = [];

const CardDetailsComponent = props => {
  const [value, setValue] = useState();
  const [quantity, setQuantity] = useState();
  const [btnDisable, setBtnDisable] = useState(false);

  const navigation = useNavigation();

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity >= props.data?.minimum_product_order_quantity) {
      setQuantity(quantity - 1);
    } else {
      setBtnDisable(true);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(value);
    }
    showAlert();
  };

  const addToCart = item => {
    console.warn('Items in cartItems 000 ' + cartItems);
    const cartItem = {...item, quantity: quantity};
    console.warn(' Item 1st **** ' + JSON.stringify(cartItem));
    cartItems.push(cartItem);
    console.warn(' Item 2st **** ' + JSON.stringify(cartItems));

    // Function to add an item to the cart

    // const existingItemIndex = cartItems.findIndex(
    //   cartItem => cartItem.id === item.id,
    // );

    // if (existingItemIndex !== -1) {
    //   // Item already exists in the cart, update its quantity
    //   const updatedCartItems = cartItems.map((cartItem, index) => {
    //     if (index === existingItemIndex) {
    //       return {...cartItem, quantity: cartItem.quantity + 1};
    //     }
    //     return cartItem;
    //   });

    //   cartItems.push(updatedCartItems);
    // } else {
    //   // Item does not exist in the cart, add it with quantity 1
    //   cartItems.push([...cartItems, {...item, quantity: 1}]);
    // }

    // console.warn(' Item 2st **** ' + JSON.stringify(cartItems));
  };

  useEffect(() => {
    setValue(props.data);
    setQuantity(props.data?.minimum_product_order_quantity);
  }, [props.data]);

  const showAlert = () => {
    Alert.alert(
      '',
      'Item added successfully',
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
            navigation.navigate('Home');
            // console.log('OK pressed');
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View>
      <Card style={{margin: 15}} mode="elevated" key={value?.id}>
        <Card.Cover
          source={{uri: value?.product_image}}
          style={styles.cardCover}
          resizeMode="contain"
        />
        <Card.Content style={{backgroundColor: '#fff'}}>
          <Text style={styles.cardTitle} variant="titleLarge">
            {value?.product_name}
          </Text>
          <Text
            style={[styles.cardPara, {marginBottom: 5}]}
            variant="bodyMedium">
            {value?.product_desc}
          </Text>

          <Text
            style={[styles.cardSubtitle, {marginBottom: 5}]}
            variant="bodyMedium">
            Price: <Text style={{marginLeft: 5}}>{'\u20B9'}</Text>
            {''}
            {value?.product_price}
          </Text>

          <Text
            style={[styles.cardSubtitle, {color: 'gray', marginBottom: 5}]}
            variant="bodyMedium">
            MRP: <Text style={{marginLeft: 5, color: 'gray'}}>{'\u20B9'}</Text>
            {''} {value?.product_mrp}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <QuantitySelector
              disable={btnDisable}
              quantity={quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
            <Button
              mode="outlined"
              style={{
                marginLeft: 15,
                borderRadius: 12,
                borderColor: 'blue',
                borderWidth: 2,
              }}
              onPress={handleAddToCart}>
              Add to Cart
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardDetailsComponent;
