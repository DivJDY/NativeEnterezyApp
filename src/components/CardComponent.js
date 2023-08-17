/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, Alert, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles/cardStyles';
import {hostName} from '../../App';

const CardComponent = ({name, item, fetchProduct}) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

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
        Alert.alert(response.message);
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
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleImageError = error => {
    setImageError(true);
    if (error.nativeEvent.error.indexOf('ENOENT') !== -1) {
      // console.log('The image file does not exist.');
      console.log(' img add ', item?.product_image);
      // Perform any additional error handling or actions
    }
  };

  return (
    <Card
      mode="elevated"
      style={styles.cardContainer}
      onPress={handleButtonPress}>
      <View>
        <Card.Cover
          style={{marginBottom: 10}}
          source={{uri: item?.product_image}}
          resizeMode="contain"
          onError={handleImageError}
        />

        <View style={styles.productBrandContainer}>
          <Text style={styles.productBrandTxt}>{item?.product_brand}</Text>
        </View>
      </View>
      {imageError && (
        <Text style={styles.imageLoadError}>Error while loading an image</Text>
      )}
      <Card.Content>
        <Text style={styles.cardTitle} variant="titleLarge">
          {item?.product_name}
        </Text>
        <Text style={styles.cardSubtitle} variant="bodyMedium">
          Price: <Text>{'\u20B9'}</Text>
          {item?.selling_price}
        </Text>
        <Text
          style={[styles.cardSubtitle, {color: 'gray'}]}
          variant="bodyMedium">
          MRP: <Text style={{marginLeft: 5, color: 'gray'}}>{'\u20B9'}</Text>
          {item?.maximum_retail_price}
        </Text>

        <Text style={[styles.cardPara, {marginBottom: 8}]} variant="bodyMedium">
          Minimum order(quantity): {item?.minimum_product_order_quantity}
        </Text>
        <TouchableOpacity onPress={() => deleteProductItem(item.product_code)}>
          <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
