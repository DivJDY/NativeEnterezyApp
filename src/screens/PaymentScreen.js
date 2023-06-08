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
} from 'react-native-paper';
import {styles} from '../styles/cardStyles';
import {useNavigation} from '@react-navigation/native';
import {hostName} from '../../App';

const PaymentScreen = ({route}) => {
  // eslint-disable-next-line no-unused-vars
  const [taxValue, setTaxValue] = useState(50);
  const [data, setData] = useState();
  const [toalAmount, setTotalAmount] = useState();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const discount = 15.12;
  const navigation = useNavigation();

  console.log(' route data ', route?.params?.cartData);

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
        console.warn(' *** ', response);
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const placeOrder = () => {
    const customer_name = 'Unknown';
    const date = new Date(); // Example delivery_date as a Date object

    const delivery_date = date.toLocaleDateString('en-GB'); // Adjust the locale as needed
    const delivery_status = 'assigned';
    const postOrderData = [];
    // Push array1 into array2
    route?.params?.cartData.forEach(item => {
      postOrderData.push({
        cart_id: item.id,
        product_name: item.product_name,
        product_image: item.product_image,
        quantity: item.quantity,
        delivery_date: delivery_date,
        customer_name: customer_name,
        category_name: item.category_name,
        discount: item.discount,
        order_amount: item.total_product_price,
        delivery_status: delivery_status,
      });
    });

    // console.warn(' place order data ', ' ** ', postOrderData);

    fetch(hostName + '/invoice', {
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
        navigation.navigate('HomeStack');
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
    <>
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
            <Appbar.Content title="Appy Coupon" style={{fontWeight: 'bold'}} />
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
            />

            <Dialog.Content flexDirection="row">
              <Text>Discount</Text>
              <Text marginLeft={'60%'} style={{fontWeight: '800'}}>
                {' '}
                {/* - {'\u20B9'} {data[0]?.discount} */}- {'\u20B9'} {discount}
              </Text>
            </Dialog.Content>
            <Dialog.Content flexDirection="row" marginTop={'-5%'}>
              <Text>Total amount</Text>
              <Text marginLeft={'45%'} style={{fontWeight: '800'}}>
                - {'\u20B9'} {toalAmount - discount}
              </Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button
                mode="outlined"
                style={[styles.submitbtn, {borderWidth: 3}]}
                disabled={checked ? false : true}
                textAlign="center"
                onPress={placeOrder}>
                {/* <Text style={{fontSize: 16}} disabled={checked ? true : false}> */}
                Place Order
                {/* </Text> */}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

export default PaymentScreen;
