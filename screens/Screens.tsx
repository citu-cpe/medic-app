import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStackScreen } from './routes/HomeStackScreen';
import { HomeScreenProps } from './HomeScreen/HomeScreen';
import { EmergenciesScreenProps } from './EmergenciesScreen/EmergenciesScreen';
import { GoogleMapsScreenProps } from '../components/GoogleMaps/GoogleMaps';
import { FirstAidScreenProps } from './FirstAidScreen/FirstAidScreen';
import { colors } from '../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContactsStackScreen } from './routes/ContactsStackScreen';
import { Host } from 'react-native-portalize';
import { ContactsScreenProps } from './ContactsScreen/ContactsScreen';
import { TextScreenProps } from './TextScreen/TextScreen';
import { AddContactScreenProps } from './AddContactScreen/AddContactScreen';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Home: HomeScreenProps;
  Emergencies: EmergenciesScreenProps;
  GoogleMaps: GoogleMapsScreenProps;
  FirstAid: FirstAidScreenProps;
  Contacts: ContactsScreenProps;
  Text: TextScreenProps;
  AddContact: AddContactScreenProps;
};

export const Screens = () => (
  <NavigationContainer>
    <Host>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: colors.beige,
          tabBarInactiveBackgroundColor: colors.beige,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.red,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name='HomeStack'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <MaterialCommunityIcons name='home' size={size} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name='home-outline'
                  size={size}
                  color={color}
                />
              ),
          }}
        />
        <Tab.Screen
          name='ContactsStack'
          component={ContactsStackScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name='account-alert'
                  size={size}
                  color={color}
                />
              ) : (
                <MaterialCommunityIcons
                  name='account-alert-outline'
                  size={size}
                  color={color}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </Host>
  </NavigationContainer>
);
