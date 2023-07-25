/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Alert, View, Image} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/cardStyles';
import {hostName} from '../../App';

const CardComponent = ({name, item, fetchProduct}) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

  // console.warn('image aaaaa ', imageAddress);

  const handleButtonPress = () => {
    navigation.navigate(name, {data: item});
  };

  const deleteProductById = async id => {
    await fetch(hostName + '/products/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
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

  const handleImageError = error => {
    // Handle image loading error
    // console.log('Image Error:', error.nativeEvent.error);
    setImageError(true);
    if (error.nativeEvent.error.indexOf('ENOENT') !== -1) {
      console.log('The image file does not exist.');
      console.log(' img add ', item?.product_image);
      // Perform any additional error handling or actions
    }
  };

  // console.warn(' image error ==> ', imageError);
  const imageURL =
    'https://enterezy-images.s3.ap-southeast-2.amazonaws.com/eneterzyimages/w2.jpg'; // Replace this with the actual URL of the uploaded image

  return (
    <Card
      mode="elevated"
      style={styles.cardContainer}
      onPress={handleButtonPress}>
      <Card.Cover
        style={{marginBottom: 10}}
        // source={{uri: 'file://' + item?.product_image}}
        source={{uri: imageURL}}
        // source={require('../../assets/banner1.jpeg')}
        resizeMode="contain"
        // onError={handleImageError}
      />
      {imageError && (
        <Text style={styles.imageLoadError}>Error while loading an image</Text>
      )}
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
          <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
