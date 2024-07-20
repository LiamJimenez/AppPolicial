import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import AddEventScreen from '../screens/AddEventScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;