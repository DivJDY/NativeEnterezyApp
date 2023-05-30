import {View} from 'react-native';
import React from 'react';
import CardDetailsComponent from '../components/CardDetailsComponent';

const ProductDetailsScreen = ({route}) => {
  const item = route.params;
  // console.warn('param value => ' + JSON.stringify(item));
  return (
    <View>
      <CardDetailsComponent data={item.data} />
    </View>
  );
};

export default ProductDetailsScreen;
