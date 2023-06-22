/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './src/styles/header';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CustomDrawer from './src/components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import PaymentScreen from './src/screens/PaymentScreen';
import DisplayRental from './src/screens/DisplayRental';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import ProductPostScreen from './src/screens/ProductPostScreen';
import OrderListScreen from './src/screens/OrderListScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpScreen from './src/screens/SignUpScreen';
import MapScreen from './src/screens/Map';
import PostProductCategory from './src/screens/PostProductCategory';
import UserRoleUpdateScreen from './src/screens/UserRoleUpdateScreen';
import {FetchUtilityOptions} from './src/fetchUtility/FetchRequestOption';
import {hostName} from './App';
import UserLists from './src/screens/UserLists';

const Stack = createStackNavigator();
// const AuthStackNavigator = ({route}) => {
//   const {isSignedIn} = route.params;
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen
//         name="SignUp"
//         options={{headerShown: false}}
//         component={SignUpScreen}
//       />

//       <AuthStack.Screen
//         name="GoogleMap"
//         options={{headerShown: false}}
//         component={MapScreen}
//       />
//       <AuthStack.Screen name="LogIn">
//         {props => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />}
//       </AuthStack.Screen>
//     </AuthStack.Navigator>
//   );
// };

{
  /* <AuthStack.Screen
      name="LogIn"
      options={{headerShown: false}}
      component={LoginScreen}
    > {(props) => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} </AuthStack.Screen> */
}

{
  /* <AuthStack.Screen name="LogIn">
      {props => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />}
    </AuthStack.Screen>
  </AuthStack.Navigator>
); */
}

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={HomeBottomTabNavigator} />
  </MainStack.Navigator>
);

const Tab = createBottomTabNavigator();

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
            <Icon name="home" size={30} color={focused ? '#FECE00' : 'black'} />
          ),
          tabBarLabel: ({focused}) => (
            <Text style={styles.tabBarLabel}>Home</Text>
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
              size={30}
              color={focused ? '#FECE00' : 'black'}
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
    style={{width: 60, height: 24}}
    resizeMode="stretch"
  />
);

const HomeBottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState();

  const DrawerNavigationList = () => (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: 'black',
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
        drawerActiveBackgroundColor: 'black',
        drawerActiveTintColor: '#fff',
      })}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={BottomTabNavigator}
        options={{
          title: 'Home',

          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      {(role === 'super_admin' || role === 'admin') && (
        <>
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
          <Drawer.Screen
            name="ProductCategory"
            component={PostProductCategory}
            options={{
              title: 'Post Category',
              headerTitle: () => <HeaderImage />,
              drawerIcon: ({color}) => (
                <MaterialIcons name="category" size={22} color={color} />
              ),
            }}
          />
        </>
      )}

      <Drawer.Screen
        name="OrderList"
        component={OrderListScreen}
        options={{
          title: 'My Order',
          headerTitle: () => <HeaderImage />,
          drawerIcon: ({color}) => (
            <MaterialIcons name="shopping-cart" size={22} color={color} />
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
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      {role === 'super_admin' && (
        <Drawer.Screen
          name="UpdateRole"
          component={UserRoleUpdateScreen}
          options={{
            title: 'User Role',
            headerTitle: () => <HeaderImage />,
            drawerIcon: ({color}) => (
              <MaterialIcons name="edit" size={22} color={color} />
            ),
          }}
        />
      )}

      {role === 'super_admin' && (
        <Drawer.Screen
          name="UserList"
          component={UserLists}
          options={{
            title: 'User Lists',
            headerTitle: () => <HeaderImage />,
            drawerIcon: ({color}) => (
              <Entypo name="users" size={22} color={color} />
            ),
          }}
        />
      )}

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
        name="Payment"
        component={PaymentScreen}
        options={{
          drawerLockMode: 'locked-closed',
          headerTitle: () => <HeaderImage />,
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
    </Drawer.Navigator>
  );

  useEffect(() => {
    // Check if user is already logged in
    getUserLoggedIn();
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserLoggedIn = async () => {
    const signedInStatus = await AsyncStorage.getItem('userLoggedIn');
    setIsSignedIn(signedInStatus === 'true');
  };

  console.warn(' istgvfhbcvbfhbbf ', isSignedIn);

  const fetchUser = async id => {
    // setLoading(true);
    await fetch(hostName + '/user/' + id, {
      method: 'GET',
      FetchUtilityOptions,
    })
      .then(response => response.json())
      .then(response => {
        console.warn('User response ', response);
        setRole(response.role);
        // setLoading(false);
      })
      .catch(error => console.warn('Error while fetch user ', error));
  };

  console.warn(' data ===> ', role);

  const getUserId = async () => {
    await AsyncStorage.getItem('userId')
      .then(id => {
        if (id !== null) {
          // Value found in AsyncStorage
          console.log(id);
          fetchUser(id);
        } else {
          // Value not found in AsyncStorage
          console.log('No value found for key "userId"');
        }
      })
      .catch(error => {
        // Handle any errors that occur during AsyncStorage retrieval
        console.log('Error retrieving value:', error);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              haeder
              name="SignUp"
              options={{headerShown: false}}
              component={SignUpScreen}
            />
            <Stack.Screen
              name="LogIn"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            initialParams={{role: role}}
            component={DrawerNavigationList}
          />
        )}
        <Stack.Screen
          name="ProfileLogIn"
          options={{headerShown: false}}
          component={LoginScreen}
        />

        <Stack.Screen
          name="MainScreen"
          initialParams={{role: role}}
          options={{headerShown: false}}
          component={DrawerNavigationList}
        />
        <Stack.Screen
          name="GoogleMap"
          options={{headerShown: false}}
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
