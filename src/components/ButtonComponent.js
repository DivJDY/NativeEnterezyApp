/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Text} from 'react-native-paper';

function ButtonComponent({name, onPress}) {
  return (
    <Button
      buttonColor="black"
      mode="contained"
      onPress={onPress}
      style={{marginTop: 10, width: '90%', borderRadius: 8}}>
      <Text style={{color: '#FECE00', fontWeight: 'bold', fontSize: 17}}>
        {name}
      </Text>
    </Button>
  );
}

export default ButtonComponent;
