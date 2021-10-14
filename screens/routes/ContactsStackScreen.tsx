import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AddContactScreen } from '../AddContactScreen/AddContactScreen';
import { ContactsScreen } from '../ContactsScreen/ContactsScreen';
import { RootStackParamList } from '../Screens';
import { TextScreen } from '../TextScreen/TextScreen';

const ContactsStack = createNativeStackNavigator<RootStackParamList>();

export const ContactsStackScreen = () => (
  <ContactsStack.Navigator
    initialRouteName='Contacts'
    screenOptions={{ headerShown: false }}
  >
    <ContactsStack.Screen name='Contacts' component={ContactsScreen} />
    <ContactsStack.Screen name='AddContact' component={AddContactScreen} />
    <ContactsStack.Screen name='Text' component={TextScreen} />
  </ContactsStack.Navigator>
);
