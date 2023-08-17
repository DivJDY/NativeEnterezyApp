/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Appbar,
  Text,
  Card,
  Dialog,
  Portal,
  Checkbox,
  Provider,
} from 'react-native-paper';
import {styles} from '../styles/cardStyles';
import {useNavigation} from '@react-navigation/native';
import {hostName} from '../../App';

const CartProceedScreen = ({route}) => {
  // eslint-disable-next-line no-unused-vars
  const [taxValue, setTaxValue] = useState(50);
  const [data, setData] = useState([]);
  const [toalAmount, setTotalAmount] = useState();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const discount = route?.params?.cartData.reduce(
    (total, item) => total + item.brand_discount,
    0,
  );
  const total_discount = discount * 100;
  const finalValue = toalAmount - total_discount;
  // console.log(' route data ', route?.params?.cartData);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // console.warn('place order ', data.id);

  const removeCartItem = async () => {
    fetch(hostName + '/emptyCart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        // console.warn(' *** ', response);
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const placeOrder = () => {
    // Adjust the locale as needed
    const postOrderData = [];

    // Push array1 into array2
    route?.params?.cartData.forEach(item => {
      postOrderData.push({
        cart_code: item.cart_code,
        product_code: item.product_code,
        product_name: item.product_name,
        product_desc: item.product_desc,
        maximum_retail_price: item.maximum_retail_price,
        selling_price: item.selling_price,
        product_brand: item.product_brand,
        quantity_purchased: item.quantity_purchased,
        product_image: item.product_image,
        brand_discount: item.brand_discount,
        total_price: finalValue,
        status: 'Order received',
        user_id: 1,
        user_name: 'Xyz',
      });
    });

    console.warn(' place order data ', ' ** ', postOrderData);

    fetch(hostName + '/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postOrderData),
    })
      .then(response => response.json())
      .then(response => {
        // Handle the response data
        // console.log('data response ', response);

        Alert.alert(response.message);
        hideDialog();
        setChecked(false);
        removeCartItem();
        navigation.navigate('Home');
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleRightIconPress = () => {
    console.log('pressed');
  };
  useEffect(() => {
    setData(route?.params?.cartData);
    const total = route?.params?.totalPrice + taxValue;

    setTotalAmount(total);
  }, [
    data?.total_product_price,
    route?.params?.cartData,
    route?.params?.totalPrice,
    taxValue,
  ]);
  return (
    <Provider>
      <View style={{flex: 1, marginVertical: 20}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: '10%',
            width: '80%',
          }}>
          <Appbar.Header style={{backgroundColor: 'yellow'}}>
            <Appbar.Action
              icon="percent"
              size={16}
              color="white"
              style={{backgroundColor: 'black', marginRight: 20}}
            />
            <Appbar.Content title="Apply Coupon" style={{fontWeight: 'bold'}} />
            <Appbar.Action
              icon="chevron-right"
              size={32}
              onPress={handleRightIconPress}
            />
          </Appbar.Header>
          <Card style={{marginTop: 50}}>
            <Card.Content>
              <Text variant="titleLarge" style={{textAlign: 'center'}}>
                Bill Details
              </Text>
            </Card.Content>
            <Card.Content flexDirection="row" flexWrap="wrap" marginTop={10}>
              <Text variant="bodyMedium" marginRight={'40%'}>
                Total Order value
              </Text>
              <Text variant="bodyMedium">
                {'\u20B9'} {route?.params?.totalPrice}
              </Text>
            </Card.Content>
            <Card.Content flexDirection="row" flexWrap="wrap" marginTop={10}>
              <Text
                variant="bodyMedium"
                marginRight={'60%'}
                style={{color: 'gray'}}>
                Total Tax
              </Text>
              <Text variant="bodyMedium">
                {'\u20B9'} {taxValue}
              </Text>
            </Card.Content>
            <Card.Content marginTop={10}>
              <Text style={{fontWeight: 'bold'}} variant="bodyLarge">
                Delivery in 1 day
              </Text>
            </Card.Content>

            <Card.Content flexDirection="row" flexWrap="wrap" marginTop={5}>
              <View style={styles.line} />

              <Text
                marginRight={'65%'}
                variant="bodyMedium"
                marginTop={10}
                marginBottom={3}>
                To pay
              </Text>
              <Text marginTop={10} marginBottom={3} variant="bodyMedium">
                {'\u20B9'} {toalAmount}
              </Text>
              <View style={styles.line} />
            </Card.Content>
          </Card>
        </View>

        <Button
          // style={styles.submitbtn}
          style={{
            marginHorizontal: 10,
            backgroundColor: 'black',
          }}
          onPress={() =>
            // navigation.navigate('HomeStack')
            showDialog()
          }>
          <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
            Proceed
          </Text>
        </Button>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}>
            <Checkbox.Item
              style={{marginLeft: 8, marginBottom: 5}}
              label="Cash on delivery"
              status={checked ? 'checked' : 'unchecked'}
              onPress={handleCheckbox}
              uncheckedColor="#000"
              color="#FECE00"
              theme={{
                colors: {
                  primary: '#000', // Use your primary color for the focused color
                },
              }}
            />

            <Dialog.Content
              flexDirection="row"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontWeight: 'bold'}}>Discount : </Text>
              <Text>
                {/* - {'\u20B9'} {data[0]?.discount} */} {'\u20B9'}{' '}
                {total_discount}
              </Text>
            </Dialog.Content>
            <Dialog.Content
              flexDirection="row"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginTop: -5,
              }}>
              <Text style={{fontWeight: 'bold'}}>Total amount :</Text>
              <Text>
                {'\u20B9'}
                {finalValue}
              </Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button
                mode="outlined"
                style={[
                  styles.submitbtn,
                  {borderWidth: 3, borderRadius: 10, paddingHorizontal: 5},
                ]}
                disabled={checked ? false : true}
                textAlign="center"
                onPress={placeOrder}>
                <Text
                  style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}
                  disabled={checked ? true : false}>
                  Place Order
                </Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default CartProceedScreen;
