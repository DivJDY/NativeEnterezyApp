/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import React, {useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

// Styles
import {header_styles} from './src/styles/Header';

// Import your screens/components here
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import StartupScreen from './src/screens/StartupScreen';
import SingupScreen from './src/screens/SingupScreen';
import GetOtpScreen from './src/screens/GetOtpScreen';
import CreateAccount from './src/screens/CreateAccount';
import GMapScreen from './src/screens/GMapScreen';
import ThanksSignup from './src/screens/ThanksSignup';
import CustomDrawer from './src/components/CustomDrawer';
import LoginScreen from './src/screens/LoginScreen';
import {AuthContext} from './src/context/AuthContext';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import DisplayRental from './src/screens/DisplayRental';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CartProceedScreen from './src/screens/CartProceedScreen';
import ProductPostScreen from './src/screens/ProductPostScreen';
import AdminInputs from './src/screens/AdminInputs';
import OrderListScreen from './src/screens/OrderListsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UserLists from './src/screens/UserLists';
import ShowRentals from './src/screens/ShowRentals';
import Admin from './src/screens/Admin';
import CreateBanners from './src/screens/CreateBanners';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={26} color={focused ? '#FECE00' : 'black'} />
          ),
          tabBarLabel: ({focused}) => (
            <Text style={header_styles.tabBarLabel}>Home</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={26}
              color={focused ? '#FECE00' : 'black'}
            />
          ),
          tabBarLabel: () => (
            <Text style={header_styles.tabBarLabel}>Cart</Text>
          ),
        }}
      />

      <Tab.Screen
        name="DisplayRental"
        component={DisplayRental}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="rupee"
              size={26}
              color={focused ? '#FECE00' : 'black'}
            />
          ),
          tabBarLabel: () => (
            <Text style={header_styles.tabBarLabel}>Display Rentals</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HeaderImage = () => (
  <Image
    source={require('./assets/logo.jpg')}
    style={{width: 40, height: 28}}
    resizeMode="stretch"
  />
);

const DrawerNavigation = () => (
  <Drawer.Navigator
    screenOptions={({navigation}) => ({
      drawerContentOptions: {
        contentContainerStyle: {
          borderRadius: '50%', // Set the desired border radius for drawer items
          // Add other styles for background color, padding, etc.
        },
      },
      headerStyle: {
        backgroundColor: '#FECE00',
        height: 60,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={header_styles.headerLeft}>
          <FontAwesome name="bars" size={20} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={header_styles.headerRight}>
          <FontAwesome name="bell" size={20} color="black" />
        </View>
      ),

      drawerLabelStyle: {
        marginLeft: -10,
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        fontWeight: 'bold',
      },
      drawerActiveBackgroundColor: 'black',
      drawerActiveTintColor: '#fff',
    })}
    drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Screen
      name="HomeDrawer"
      component={BottomTabNavigator}
      options={{
        title: 'Home',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <Ionicons name="home" size={30} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="ProductPost"
      component={ProductPostScreen}
      options={{
        title: 'Create Product',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <FontAwesome name="product-hunt" size={28} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="adminInputs"
      component={AdminInputs}
      options={{
        title: 'Admin Inputs',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <Feather name="grid" size={30} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="OrderList"
      component={OrderListScreen}
      options={{
        title: 'My Order',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons
            name="cart-arrow-down"
            size={30}
            color={color}
          />
        ),
      }}
    />

    <Drawer.Screen
      name="adminData"
      component={Admin}
      options={{
        title: 'Admin',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <Feather name="grid" size={30} color={color} />
        ),
      }}
    />

    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <MaterialIcons name="person" size={30} color={color} />
        ),
      }}
    />

    <Drawer.Screen
      name="UserList"
      component={UserLists}
      options={{
        title: 'User Lists',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <Entypo name="users" size={30} color={color} />
        ),
      }}
    />

    <Drawer.Screen
      name="DisplayRental"
      component={DisplayRental}
      options={{
        title: 'Display Rental',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <FontAwesome
            name="rupee"
            size={30}
            color={color}
            style={{marginLeft: 8}}
          />
        ),
      }}
    />

    <Drawer.Screen
      name="ShowRentals"
      component={ShowRentals}
      options={{
        title: 'Show Rentals',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <FontAwesome
            name="rupee"
            size={30}
            color={color}
            style={{marginLeft: 8}}
          />
        ),
      }}
    />

    <Drawer.Screen
      name="banner"
      component={CreateBanners}
      options={{
        title: 'Create Banners',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="camera-image" size={30} color={color} />
        ),
      }}
    />

    <Drawer.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={{
        title: 'Privacy policy',
        headerTitle: () => <HeaderImage />,
        drawerIcon: ({color}) => (
          <MaterialIcons name="policy" size={30} color={color} />
        ),
      }}
    />
    {/* Header locked */}
    <Drawer.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        drawerLockMode: 'locked-closed',
        headerTitle: () => <HeaderImage />,
        hidden: true,
        drawerItemStyle: {display: 'none'},
      }}
    />
    <Drawer.Screen
      name="CartProceed"
      component={CartProceedScreen}
      options={{
        drawerLockMode: 'locked-closed',
        headerTitle: () => <HeaderImage />,
        hidden: true,
        drawerItemStyle: {display: 'none'},
      }}
    />
  </Drawer.Navigator>
);

const Navigation = () => {
  const {isSigned} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSigned ? (
          <Stack.Screen
            name="Home"
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Startup"
              component={StartupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={SingupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OtpScreen"
              component={GetOtpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateAcc"
              component={CreateAccount}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoogleMap"
              component={GMapScreen}
              options={{headerShown: false}}
              // initialParams={{onSignupComplete: handleSignupComplete}}
            />
            <Stack.Screen
              name="ThanksSignup"
              component={ThanksSignup}
              options={{headerShown: false}}
              // initialParams={{setIsSignedUp}}
              // initialParams={{onSignupComplete: handleSignupComplete}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
