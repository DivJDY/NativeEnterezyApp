/* eslint-disable prettier/prettier */
import React, {useEffect, useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isSigned, setIsSigned] = useState(false);

  const login = async () => {
    // await AsyncStorage.setItem('isSignedUp', 'true');

    AsyncStorage.setItem('isSignedUp', 'true')
      .then(() => {
        setIsSigned(true);
        console.log('Item stored successfully');
      })
      .catch(error => {
        console.log('Error storing item:', error);
      });
  };

  const logout = async () => {
    // await AsyncStorage.removeItem('isSignedUp');

    AsyncStorage.removeItem('isSignedUp')
      .then(() => {
        setIsSigned(false);
        console.log('Item removed successfully');
      })
      .catch(error => {
        console.log('Error removing item:', error);
      });
  };

  const isLoggedIn = async () => {
    try {
      const isSignedUpValue = await AsyncStorage.getItem('isSignedUp');
      setIsSigned(isSignedUpValue);
    } catch {
      console.warn('Error while signUp');
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{isSigned, login, logout, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
