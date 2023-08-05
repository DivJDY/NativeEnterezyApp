import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigation from './Navigation';
import {theme} from './AppTheme';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </PaperProvider>
  );
};

export const hostName = 'http://3.25.50.139:5000';
export default App;
