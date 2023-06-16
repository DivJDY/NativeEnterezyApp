/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles/cardStyles';
import QuantitySelector from './QuantitySelector';
import {hostName} from '../../App';

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
    addToCart(value);
  };

  const addToCart = item => {
    // console.log(' Item post cart ' + JSON.stringify(item));
    const cartItem = {...item, quantity: quantity};
    // console.warn(' Item 1st **** ' + JSON.stringify(cartItem));

    const data = {
      id: cartItem.id,
      quantity: cartItem.minimum_product_order_quantity,
    };

    fetch(hostName + '/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        // Handle the response data
        // console.log('data response ', response);
        // Alert.alert(response.message);
        showAlert(response.message);
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  useEffect(() => {
    setValue(props.data);
    setQuantity(props.data?.minimum_product_order_quantity);
  }, [props.data]);

  const showAlert = message => {
    Alert.alert(
      '',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Action to perform when OK is pressed
            navigation.navigate('Home');
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
          source={{uri: 'file://' + value?.product_image}}
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
                borderColor: '#FECE00',
                borderWidth: 3,
              }}
              onPress={handleAddToCart}>
              <Text style={styles.btnStyle}>Add to Cart</Text>
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardDetailsComponent;
