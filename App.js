/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './Navigation';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  // return (
  //   <View>
  //     <Text>App</Text>
  //   </View>
  // );

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

// const hostName = 'http://127.0.0.1:5010';
// export const hostName="https://6fe8-202-131-134-244.ngrok-free.app"

export const hostName = 'http://3.26.14.137:5000';
export default App;
