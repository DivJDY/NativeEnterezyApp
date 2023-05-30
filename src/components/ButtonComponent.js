/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  // TouchableRipple
  Text,
} from 'react-native-paper';

function ButtonComponent({name, onPress}) {
  return (
    // <TouchableRipple
    //   style={{
    //     borderRadius: 8,
    //     backgroundColor: 'blue',
    //     overflow: 'hidden',
    //   }}
    //   onPress={onPress}
    //   rippleColor="black">
    <Button
      buttonColor="red"
      textColor="white"
      //   style={{
      //     borderRadius: 8,
      //     overflow: 'hidden',
      //   }}
      mode="contained"
      onPress={onPress}
      style={{marginTop: 10, width: '90%', borderRadius: 8}}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
        {name}
      </Text>
    </Button>
    // </TouchableRipple>
  );
}

export default ButtonComponent;
