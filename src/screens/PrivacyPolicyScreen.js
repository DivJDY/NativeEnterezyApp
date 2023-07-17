/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

export default function PrivacyPolicyScreen() {
  return (
    <View style={{marginVertical: 20, marginHorizontal: 15}}>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 20,
          color: '#FECE00',
          fontWeight: '700',
          textDecorationLine: 'underline',
        }}
        variant="titleLarge">
        Privacy Policy
      </Text>
      <Text style={{textAlign: 'justify'}} variant="bodyLarge">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </Text>
    </View>
  );
}
