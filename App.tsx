import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, HomeProps } from './screens/HomeScreen/HomeScreen';
import {
  EmergenciesScreen,
  EmergenciesProps,
} from './screens/EmergenciesScreen/EmergenciesScreen';
import {
  GoogleMaps,
  GoogleMapsProps,
} from './components/GoogleMaps/GoogleMaps';
import { NativeBaseProvider } from 'native-base';

export type RootStackParamList = {
  Home: HomeProps;
  Emergencies: EmergenciesProps;
  GoogleMaps: GoogleMapsProps;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
          <Stack.Screen
            name='Emergencies'
            component={EmergenciesScreen}
          ></Stack.Screen>
          <Stack.Screen name='GoogleMaps' component={GoogleMaps}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
