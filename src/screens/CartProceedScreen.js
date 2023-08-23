/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  Card,
  Dialog,
  Portal,
  Checkbox,
  Provider,
  IconButton,
} from 'react-native-paper';
import {styles} from '../styles/cardStyles';
import {useNavigation} from '@react-navigation/native';
import {hostName} from '../../App';

const CartProceedScreen = ({route}) => {
  // const [taxValue, setTaxValue] = useState(50);
  const [data, setData] = useState([]);
  const [toalAmount, setTotalAmount] = useState();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState([]);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    shipping_address: route?.params?.cartData[0].shipping_address,
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEditPress = () => {
    setEditMode(true);
  };

  const handleSavePress = () => {
    setEditMode(false);
    update_ShippingAdd(route?.params?.cartData[0].cart_code);
    // Perform save or submit logic here
    console.log('Form Data:', formData);
  };

  const discount = route?.params?.cartData.reduce(
    (total, item) => total + item?.brand_discount,
    0,
  );

  const total_tax_amount = route?.params?.cartData.reduce(
    (total, item) => total + item?.tax_amount,
    0,
  );

  const total_tax = route?.params?.cartData.reduce(
    (total, item) => total + item?.tax_rate,
    0,
  );

  const tax = parseFloat(total_tax).toString();
  // const tax = total_tax.replace(/^0+/, '');
  // console.warn(' tax 0000000000 ', tax.discount);
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
        console.warn(' *** ', response);
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
        tax_rate: item.tax_rate,
        status: 'Order received',
        user_id: 1,
        user_name: 'Xyz',
        shipping_address: formData.shipping_address,
      });
    });

    // console.warn(' place order data ', ' ** ', postOrderData);

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
        navigation.navigate('HomeDrawer');
      })
      .catch(error => {
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const fetchUserData = async () => {
    await fetch(hostName + '/user/1')
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    setData(route?.params?.cartData);
    const total = route?.params?.totalPrice;
    setTotalAmount(total);
    fetchUserData();
  }, [
    data?.total_product_price,
    route?.params?.cartData,
    route?.params?.totalPrice,
  ]);

  const update_ShippingAdd = async id => {
    const body = {shipping_address: formData.shipping_address};

    await fetch(hostName + '/cart/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(responseData => {
        // Update the state or perform any necessary actions
        console.warn(responseData[0].message);
        Alert.alert(responseData[0].message);
        // fetchUser();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  // const [isPressed, setIsPressed] = useState(false);

  // const handlePressIn = () => {
  //   setIsPressed(true);
  // };

  // const handlePressOut = () => {
  //   setIsPressed(false);
  // };

  // const underlineColor = isPressed ? 'yellow' : 'red';

  return (
    <Provider>
      <View style={{flex: 1, marginVertical: 20}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            width: '90%',
          }}>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{marginBottom: 80}}>
            <Card style={{marginTop: 50, backgroundColor: '#fff'}}>
              <Card.Content
                marginTop={5}
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center">
                <Text
                  style={{fontWeight: 'bold', fontSize: 16, width: '40%'}}
                  variant="titleMedium">
                  Delivery address :
                </Text>
                {/* <TouchableWithoutFeedback
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}> */}
                <TextInput
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                    width: '48%',
                    color: '#000',
                    lineHeight: 20,
                    // borderWidth: 1,
                    // borderColor: 'gray',
                  }}
                  underlineColorAndroid="transparent" // Hide default Android underline
                  value={formData.shipping_address}
                  onChangeText={value =>
                    handleInputChange('shipping_address', value)
                  }
                  editable={editMode}
                  multiline
                  numberOfLines={3}
                  returnKeyLabel="done"
                  returnKeyType="done"
                />
                {/* </TouchableWithoutFeedback> */}

                {!editMode ? (
                  <IconButton
                    icon="pencil"
                    size={26}
                    color="#000"
                    style={{width: '8%'}}
                    onPress={handleEditPress}
                  />
                ) : (
                  <IconButton
                    icon="check-circle"
                    size={26}
                    // color="#FECE00"
                    color="green"
                    style={{width: '8%'}}
                    onPress={handleSavePress}
                  />
                )}
              </Card.Content>

              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={{
                    textAlign: 'center',
                    marginVertical: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Bill Details
                </Text>
              </Card.Content>
              <Card.Content
                flexDirection="row"
                flexWrap="wrap"
                marginTop={10}
                justifyContent="space-between">
                <Text variant="bodyMedium">Total Order value</Text>
                <Text variant="bodyMedium">
                  {'\u20B9'} {route?.params?.totalPrice.toFixed(2)}
                </Text>
              </Card.Content>
              {/* <Card.Content flexDirection="row" flexWrap="wrap" marginTop={10}>
              <Text
                variant="bodyMedium"
                marginRight={'60%'}
                style={{color: 'gray'}}>
                Total Tax
              </Text>
              <Text variant="bodyMedium">
                {'\u20B9'} {taxValue}
              </Text>
            </Card.Content> */}

              <Card.Content
                flexDirection="row"
                flexWrap="wrap"
                marginTop={10}
                justifyContent="space-between">
                <Text variant="bodyMedium">Total Tax</Text>
                <Text variant="bodyMedium">
                  {'\u20B9'} {total_tax_amount}
                </Text>
              </Card.Content>

              <Card.Content flexDirection="row" flexWrap="wrap" marginTop={5}>
                <View style={styles.line} />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    variant="bodyMedium"
                    marginRight="70%"
                    marginTop={10}
                    marginBottom={3}>
                    To pay
                  </Text>
                  <Text marginTop={10} marginBottom={3} variant="bodyMedium">
                    {'\u20B9'} {toalAmount?.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.line} />
              </Card.Content>
            </Card>
          </KeyboardAvoidingView>

          <Button
            // style={styles.submitbtn}
            style={{
              // position: 'absolute',
              marginHorizontal: 10,
              backgroundColor: 'black',
              // right: '40%',
              // left: '50%',
              // bottom: 0,
            }}
            onPress={() =>
              // navigation.navigate('HomeStack')
              showDialog()
            }>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              Proceed
            </Text>
          </Button>
        </View>

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
                {finalValue.toFixed(2)}
              </Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button
                mode="outlined"
                // style={[
                //   styles.submitbtn,
                //   {borderWidth: 3, borderRadius: 10, paddingHorizontal: 5},
                // ]}

                style={checked ? styles.submitbtn : styles.disableSubBtn}
                disabled={checked ? false : true}
                textAlign="center"
                onPress={placeOrder}>
                <Text
                  style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}
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
