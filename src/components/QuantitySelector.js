/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const QuantitySelector = ({quantity, onIncrease, onDecrease, disable}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={onDecrease} disabled={disable}>
        <Text style={styles.operator}>-</Text>
      </TouchableOpacity>
      <Text style={[styles.operator, {fontSize: 16}]}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrease}>
        <Text style={[styles.operator]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;

const styles = StyleSheet.create({
  operator: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
