import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, HomeScreenProps } from './screens/HomeScreen/HomeScreen';
import {
  EmergenciesScreen,
  EmergenciesScreenProps,
} from './screens/EmergenciesScreen/EmergenciesScreen';
import {
  GoogleMaps,
  GoogleMapsScreenProps,
} from './components/GoogleMaps/GoogleMaps';
import { Box, NativeBaseProvider, StatusBar } from 'native-base';
import { StaggerButtons } from './components/StaggerButtons/StaggerButtons';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import {
  FirstAidScreen,
  FirstAidScreenProps,
} from './screens/FirstAidScreen/FirstAidScreen';

export type RootStackParamList = {
  Home: HomeScreenProps;
  Emergencies: EmergenciesScreenProps;
  GoogleMaps: GoogleMapsScreenProps;
  FirstAid: FirstAidScreenProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// TODO: add expo fonts
// TODO: add emergency info screen
// TODO: call emergency contacts
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <Box style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar
          barStyle={Platform.OS === 'android' ? 'default' : 'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen
              name='Emergencies'
              component={EmergenciesScreen}
            ></Stack.Screen>
            <Stack.Screen name='GoogleMaps' component={GoogleMaps} />
            <Stack.Screen name='FirstAid' component={FirstAidScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StaggerButtons />
      </Box>
    </NativeBaseProvider>
  );
}
