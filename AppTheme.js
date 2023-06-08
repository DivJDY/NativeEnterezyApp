import {DefaultTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'RobotoCondensed-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'normal',
    },
    // Define additional font styles as needed
  },
};

const theme = {
  ...DefaultTheme,
  // fonts: configureFonts(fontConfig),
  roundness: 2, // Customize the button border radius
  colors: {
    ...DefaultTheme.colors,
    text: 'black',

    primary: '#FECE00', // replace with your desired background color
    // text: 'white',
    // accent: 'black', // Customize the accent button color
  },
};

export default theme;
