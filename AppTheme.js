import {DefaultTheme, configureFonts} from 'react-native-paper';
import {Platform} from 'react-native';

const fontConfig = {
  default: {
    regular: {
      fontFamily: './assets/fonts/RobotoCondensed-Regular.ttf',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: './assets/fonts/RobotoCondensed-Light.ttf',
      fontWeight: 'normal',
    },
    // Define additional font styles as needed
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 2, // Customize the button border radius
  colors: {
    ...DefaultTheme.colors,
    primary: '#007aff', // Customize the primary button color
    accent: '#ff5c5c', // Customize the accent button color
  },
};

export default theme;
