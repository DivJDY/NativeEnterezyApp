/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
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

const PaymentScreen = ({route}) => {
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

  console.warn('place order ', data.id);

  const placeOrder = () => {
    const delivery_date = Date.now();
    const customer_name = 'Unknown';
    const cart_id = data[0]?.id;
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
        {/* <Text
          variant="titleLarge"
          style={[styles.cardTitle, {textAlign: 'center', marginBottom: 30}]}>
          Please take screen shot of the QR code to make payment
        </Text>

        <Image
          resizeMode="contain"
          source={require('../../assets/QRCode.png')}
          style={{marginBottom: 50}}
        /> */}
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
              style={{backgroundColor: 'red', marginRight: 20}}
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
                marginRight={'67%'}
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
          mode="outlined"
          style={styles.submitbtn}
          onPress={() =>
            // navigation.navigate('HomeStack')
            showDialog()
          }>
          Proceed
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
              <Text marginLeft={'60%'} style={{color: 'red'}}>
                {' '}
                {/* - {'\u20B9'} {data[0]?.discount} */}
              </Text>
            </Dialog.Content>
            <Dialog.Content flexDirection="row" marginTop={'-5%'}>
              <Text>Total amount</Text>
              <Text marginLeft={'50%'} style={{color: 'red'}}>
                {' '}
                {/* - {'\u20B9'} {toalAmount - data[0]?.discount} */}
              </Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button
                mode="outlined"
                style={[styles.submitbtn]}
                disabled={checked ? false : true}
                textAlign="center"
                onPress={placeOrder}>
                Place Order
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

export default PaymentScreen;
