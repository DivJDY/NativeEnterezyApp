import React from 'react';
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
  'https://e1eb-2409-4071-e01-d030-6d61-235e-6c56-9d10.ngrok-free.app';
