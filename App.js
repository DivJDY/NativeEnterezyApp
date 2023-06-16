import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './AppTheme';
import MainNavigation from './MainNavigation';

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;

export const hostName = 'https://26bd-202-131-134-207.ngrok-free.app';
