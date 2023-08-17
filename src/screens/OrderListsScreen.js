/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import {List, Divider, Text, IconButton, Menu} from 'react-native-paper';
import {hostName} from '../../App';
import LoadingIndicator from '../components/LoadingIndicator';
import {show_rental} from '../styles/showRentals';

const OrderListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page_limit, setPageLimit] = useState(8);
  const [visible, setVisible] = useState(null);

  const fetchOderList = async () => {
    setLoading(true);
    await fetch(hostName + `/order?page_limit=${page_limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.warn('Order lists ', response);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // Handle any errors
        console.error('post error ', error);
      });
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPageLimit(page_limit + 5);
      fetchOderList();
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchOderList();
  }, []);

  const handleMenuOpen = code => {
    setVisible(code);
  };

  const handleMenuClose = () => {
    setVisible(null);
  };

  const updateStatus = async (id, value) => {
    setLoading(true);
    const updateData = {status: value};

    await fetch(hostName + '/order/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn('fetch data ==> ', responseData.shelf_rentals);
        Alert.alert(responseData.message);
        fetchOderList();
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleStatusUpdate = (order_code, value) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to update the delivery status  ',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            updateStatus(order_code, value);
          },
        },
      ],
      {cancelable: true},
    );

    // Close the menu
    handleMenuClose();
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', marginTop: '10%'}}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>No order data</Text>
        </View>
      ) : (
        <ScrollView
          style={{marginLeft: 10, marginBottom: 50}}
          showsHorizontalScrollIndicator={false}>
          <List.Section>
            {data?.map((order, index) => (
              <View key={index}>
                <List.Item
                  style={{marginBottom: -20}}
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                  title={order.product_name}
                  left={() => (
                    <Image
                      source={{uri: order.product_image}}
                      style={{width: 80, height: 80}}
                      resizeMode="contain"
                    />
                  )}
                  right={() => (
                    <Text
                      style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
                      {order?.total_price} Rs | Qty: {order.quantity_purchased}
                    </Text>
                  )}
                />
                <List.Item
                  title={'Product Brand : ' + order.product_brand}
                  description={
                    'Order Placed Date : ' + order.order_created_at.slice(0, 10)
                  }
                  titleStyle={{fontSize: 16, lineHeight: 25, color: '#000'}}
                  descriptionStyle={{
                    fontSize: 16,
                    color: '#000',
                  }}
                  style={{marginBottom: -22}}
                />
                <List.Item
                  title={
                    'Expected Delivery Date : ' +
                    order.delivery_date.slice(0, 10)
                  }
                  description={'Status : ' + order.status}
                  right={() => (
                    <Menu
                      visible={visible === order.order_code}
                      onDismiss={handleMenuClose}
                      anchor={
                        <IconButton
                          icon="pencil"
                          size={22}
                          style={{color: '#000'}}
                          onPress={() => handleMenuOpen(order.order_code)}
                        />
                      }>
                      <Menu.Item
                        onPress={() =>
                          handleStatusUpdate(
                            order.order_code,
                            'Order processed',
                          )
                        }
                        title="Order processed"
                      />
                      <Menu.Item
                        onPress={() =>
                          handleStatusUpdate(order.order_code, 'Order shipped')
                        }
                        title="Order shipped"
                      />
                      <Menu.Item
                        onPress={() =>
                          handleStatusUpdate(
                            order.order_code,
                            'Order delivered',
                          )
                        }
                        title="Order delivered"
                      />
                    </Menu>
                  )}
                  titleStyle={{
                    fontSize: 16,
                    lineHeight: 25,
                    color: '#000',
                  }}
                  descriptionStyle={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                  style={{marginBottom: 3}}
                />
                <Divider style={{borderBottomWidth: 2}} />
              </View>
            ))}
          </List.Section>
          <TouchableOpacity onPress={handleLoadMore}>
            <Text style={[show_rental.loadMoreTxt, {marginTop: 10}]}>
              Load more
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderListScreen;
