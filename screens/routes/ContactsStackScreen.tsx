import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ContactsScreen } from '../ContactsScreen/ContactsScreen';

const ContactsStack = createNativeStackNavigator();

export const ContactsStackScreen = () => (
  <ContactsStack.Navigator
    initialRouteName='Contacts'
    screenOptions={{ headerShown: false }}
  >
    <ContactsStack.Screen name='Contacts' component={ContactsScreen} />
  </ContactsStack.Navigator>
);
