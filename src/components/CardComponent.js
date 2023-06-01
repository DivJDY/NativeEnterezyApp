/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {deleteProduct, getAllProducts} from '../db/database';
import {styles} from '../styles/cardStyles';
import {hostName} from '../../App';

const CardComponent = ({name, item, fetchProduct}) => {
  const navigation = useNavigation();

  // console.warn('===> nav ' + name);
  const handleButtonPress = () => {
    console.warn('******** ' + typeof item.product_image);
    navigation.navigate(name, {data: item});
  };

  const deleteProductById = async id => {
    await fetch(hostName + '/products/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        // if (response.ok) {
        //   console.log('deleted ', response.message);
        //   // Record deleted successfully
        //   console.log('Record deleted successfully');
        // } else {
        //   // Handle the error response
        //   console.error('Failed to delete record');
        // }
        console.log(response.message);
        fetchProduct();
      })
      .catch(error => {
        // Handle any network or other errors
        console.error('Error:', error);
      });
  };

  const deleteProductItem = async id => {
    Alert.alert(
      '',
      'You want delete this product',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteProductById(id);
            // await deleteProduct(id)
            //   .then(async () => {
            //     console.log('Order deleted successfully');
            //     await getAllProducts();
            //   })
            //   .catch(error => {
            //     console.error('Error deleting order: ', error);
            //   });

            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <Card
      mode="elevated"
      style={styles.cardContainer}
      onPress={handleButtonPress}>
      <Card.Cover
        style={{marginBottom: 10}}
        source={{
          uri: item?.product_image,
        }}
        // source={require('C:UsersPcDesktopPython Flasklays.jpg')}
        // source={{uri: 'file:///C:/Users/Pc/Desktop/Python Flask/dryFruits.jpg'}}
        resizeMode="contain"
      />
      <Card.Content>
        <Text style={styles.cardTitle} variant="titleLarge">
          {item?.product_name}
        </Text>
        <Text style={styles.cardSubtitle} variant="bodyMedium">
          Price: <Text>{'\u20B9'}</Text>
          {''} {item?.product_price}
        </Text>
        <Text
          style={[styles.cardSubtitle, {color: 'gray'}]}
          variant="bodyMedium">
          MRP: <Text style={{marginLeft: 5, color: 'gray'}}>{'\u20B9'}</Text>
          {''} {item?.product_mrp}
        </Text>

        <Text style={[styles.cardPara, {marginBottom: 8}]} variant="bodyMedium">
          Minimum order(quantity): {item?.minimum_product_order_quantity}
        </Text>
        <TouchableOpacity onPress={() => deleteProductItem(item.id)}>
          <Icon name="delete" size={20} color="#900" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
