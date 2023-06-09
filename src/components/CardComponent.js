/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles/cardStyles';
import {hostName} from '../../App';

const CardComponent = ({name, item, fetchProduct}) => {
  const navigation = useNavigation();
  const [imageError, setImageError] = React.useState(false);

  // console.warn('===> nav ' + name);
  const handleButtonPress = () => {
    // console.warn('******** ' + typeof item.product_image);
    // console.warn(' image address ==> ', item.product_image);
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

  const handleImageError = () => {
    // Handle image loading error
    setImageError(true);
  };

  // console.warn(' image error ==> ', imageError);

  return (
    <Card
      mode="elevated"
      style={styles.cardContainer}
      onPress={handleButtonPress}>
      <Card.Cover
        style={{marginBottom: 10}}
        source={{
          uri: item.product_image,
        }}
        resizeMode="contain"
        onError={handleImageError}
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
