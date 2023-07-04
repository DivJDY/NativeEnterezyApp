import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './AppTheme';
// import MainNavigation from './MainNavigation';
import AppNavigator from './MainNavigation';

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </>
  );
};

export default App;

export const hostName =
  'https://8248-2409-4071-e01-d030-dc9b-1e30-e888-b824.ngrok-free.app';
