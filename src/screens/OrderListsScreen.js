/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import {List, Divider, Text} from 'react-native-paper';
import {hostName} from '../../App';
import LoadingIndicator from '../components/LoadingIndicator';

const OrderListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOderList = async () => {
    setLoading(true);
    await fetch(hostName + '/invoice', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.warn(response);
        setData(response);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // Handle any errors
        console.error('post error ', error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchOderList();
  }, []);

  return (
    <View style={{flex: 1}}>
      {data.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', marginTop: '10%'}}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>No order data</Text>
        </View>
      ) : loading ? (
        <LoadingIndicator />
      ) : (
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView style={{marginLeft: 10, marginBottom: 20}}>
            <List.Section>
              {data?.map((order, index) => (
                <View key={index}>
                  <List.Item
                    style={{marginBottom: -12}}
                    titleStyle={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    title={order.product_name}
                    left={() => (
                      <Image
                        source={{uri: order.product_image}}
                        style={{width: 50, height: 50}}
                      />
                    )}
                    right={() => (
                      <Text>
                        {order.order_amount.toFixed(2)} Rs | Qty:{' '}
                        {order.quantity}
                      </Text>
                    )}
                  />
                  <List.Item
                    title={'Expected Delivery Date : ' + order.delivery_date}
                    description={'Status : ' + order.delivery_status}
                    descriptionStyle={{
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                    style={{marginBottom: 3}}
                  />
                  <Divider style={{borderBottomWidth: 2}} />
                </View>
              ))}
            </List.Section>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default OrderListScreen;
