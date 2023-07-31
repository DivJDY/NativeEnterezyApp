import React, {useEffect} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Navigation from './Navigation';
import {theme} from './AppTheme';
import {AuthProvider} from './src/context/AuthContext';

// const theme = {
//   ...DefaultTheme,
//   // fonts: {

//   // regular: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'normal',
//   // },
//   // titleLarge: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'bold',
//   // },
//   // titleMedium: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'bold',
//   // },
//   // bodyLarge: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'bold',
//   // },
//   // bodyMedium: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'bold',
//   // },
//   // labelLarge: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'bold',
//   // },
//   // displaySmall: {
//   //   fontFamily: 'Times New Roman', // Replace with your desired font family
//   //   fontWeight: 'normal',
//   // },
//   // },
// };

const App = () => {
  // useEffect(() => {
  //   Font.loadAsync({
  //     'times-new-roman': require('./assets/fonts/timesnewroman.ttf'),
  //   });
  // });
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </PaperProvider>
  );
};

export const hostName = 'http://3.26.14.137:5000';
export default App;
