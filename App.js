import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
  'https://6a73-2409-4071-e01-d030-34f9-67a9-177-c8a9.ngrok-free.app';
