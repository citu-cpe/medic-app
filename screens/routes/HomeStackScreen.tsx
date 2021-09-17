import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleMaps } from '../../components/GoogleMaps/GoogleMaps';
import { EmergenciesScreen } from '../EmergenciesScreen/EmergenciesScreen';
import { FirstAidScreen } from '../FirstAidScreen/FirstAidScreen';
import { HomeScreen } from '../HomeScreen/HomeScreen';
import { RootStackParamList } from '../screens';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName='Home'
    screenOptions={{ headerShown: false }}
  >
    <HomeStack.Screen name='Home' component={HomeScreen} />
    <HomeStack.Screen
      name='Emergencies'
      component={EmergenciesScreen}
    ></HomeStack.Screen>
    <HomeStack.Screen name='GoogleMaps' component={GoogleMaps} />
    <HomeStack.Screen name='FirstAid' component={FirstAidScreen} />
  </HomeStack.Navigator>
);
