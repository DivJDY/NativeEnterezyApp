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

// export const hostName = 'http://127.0.0.1:8000';

export const hostName = 'https://78a7-202-131-135-106.ngrok-free.app';
