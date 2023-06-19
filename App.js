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
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;

export const hostName =
  'https://2e08-2405-204-568f-1b18-751e-53f3-eae5-cbf1.ngrok-free.app';
