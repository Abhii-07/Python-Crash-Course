import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Import your screens here
import MenuScreen from '../screens/MenuScreen';
import ShowOrderScreen from '../screens/OrderScreen';
import OrderFormScreen from '../screens/OrderFormScreen';

import React from 'react';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="ShowOrders" component={ShowOrderScreen} />
      <Stack.Screen name="OrderForm" component={OrderFormScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

