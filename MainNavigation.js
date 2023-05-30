/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './src/styles/header';
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CustomDrawer from './src/components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PaymentScreen from './src/screens/PaymentScreen';
import DisplayRental from './src/screens/DisplayRental';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import ProductPostScreen from './src/screens/ProductPostScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Home</Text>,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={30}
              color={focused ? '#551E18' : '#000'}
            />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Cart</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const HeaderImage = () => (
  <Image
    source={require('./assets/logo.jpg')}
    style={{width: 120, height: 30}}
    resizeMode="contain"
  />
);

const DrawerNavigationList = ({route}) => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: 'gray',
          height: 60,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Icon name="bell" size={20} color="#fff" />
          </View>
        ),
        drawerLabelStyle: {
          marginLeft: -10,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: 'blue',
        drawerActiveTintColor: '#fff',
        // drawerInactiveTintColor: '#333',
      })}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        // initialParams={{params: route.params}}
        component={BottomTabNavigator}
        options={{
          title: 'Home',

          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          // headerRight: () => (
          //   <View style={styles.headerRight}>
          //     <Icon
          //       name="bell"
          //       size={20}
          //       color="#fff"
          //       onPress={() => Alert.alert('Icon Pressed')}
          //     />
          //   </View>
          // ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          title: 'SignUp',
          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <FontAwesome name="user-plus" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          title: 'Privacy Policy',
          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <MaterialIcons name="policy" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          drawerLockMode: 'locked-closed',
          headerTitle: () => <HeaderImage />,
          // drawerItemStyle: {height: 0},
          // headerShown: false,
          hidden: true,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          drawerLockMode: 'locked-closed',
          headerTitle: () => <HeaderImage />,
          // drawerItemStyle: {height: 0},
          // headerShown: false,
          hidden: true,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="DisplayRental"
        component={DisplayRental}
        options={{
          drawerLockMode: 'locked-closed',
          headerTitle: () => <HeaderImage />,
          hidden: true,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="ProductPost"
        component={ProductPostScreen}
        options={{
          title: 'Create Product',
          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <FontAwesome name="product-hunt" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={DrawerNavigationList}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
