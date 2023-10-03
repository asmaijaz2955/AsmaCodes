import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import ChatScreen from './Screens/ChatScreen';
import CustomerDashboard from './Screens/CustomerDashboard';

import Chat from './Screens/Chat';

import Payment from './Screens/Payment';


import ProductDetail from './Screens/ProductDetail';
import Product from './Screens/Product';
import Profile from './Screens/Profile';
import Cart from './Screens/Cart';
import Faq from './Screens/Faq';
import Event from './Screens/Event';
import Info from './Screens/Info';
import Welcome from './Screens/Welcome';
import Order from './Screens/Order';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => {
          props.navigation.navigate('Profile');
        }}
      />
      <DrawerItem
        label="Home Page"
        onPress={() => {
          props.navigation.navigate('CustomerDashboard');
        }}
      />
      <DrawerItem
        label="Products"
        onPress={() => {
          props.navigation.navigate('Product');
        }}
      />
      <DrawerItem
        label="New"
        onPress={() => {
          props.navigation.navigate('Info');
        }}
      />
      <DrawerItem
        label="Order"
        onPress={() => {
          props.navigation.navigate('Order');
        }}
      />
      <DrawerItem
        label="FAQs"
        onPress={() => {
          props.navigation.navigate('Faq');
        }}
      />
      <DrawerItem
        label="Events"
        onPress={() => {
          props.navigation.navigate('Event');
        }}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          // Handle logout here
        }}
      />
    </DrawerContentScrollView>
  );
};

const screenOptionsWithoutHeader = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptionsWithoutHeader}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />

      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen name="Payment" component={Payment} />

      {/* <Stack.Screen name="Welc" component={Welcomenavigator} /> */}
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      {/* Add more screens */}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#112D4E',
        tabBarInactiveTintColor: '#3F72AF',
        headerShown: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Front"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={CustomerDashboard} // Replace with the appropriate component
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Chat} // Replace with the appropriate component
        options={{
          tabBarIcon: ({ color, size }) => (
            <IoniconsIcon name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart} // Replace with the appropriate component
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcon name="shoppingcart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Payment} // Replace with the appropriate component
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  // Set this to true/false based on user login status

  return (
    <NavigationContainer style={{ backgroundColor: '#112D4E' }} >
      {/* <Stack.Navigator >
        <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator> */}
      <Drawer.Navigator drawerContent={CustomDrawerContent} drawerStyle={{ backgroundColor: '#F9F7F7' }} >

        <Drawer.Screen name="Home" component={TabNavigator} />

      </Drawer.Navigator>
      {/* Add more screens if needed */}


    </NavigationContainer>
  );
};

export default App;
////////
