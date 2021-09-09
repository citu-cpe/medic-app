import React, { useCallback, useEffect, useState } from 'react';
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
import { Box, NativeBaseProvider } from 'native-base';
import { StaggerButtons } from './components/StaggerButtons/StaggerButtons';
import * as SplashScreen from 'expo-splash-screen';

export type RootStackParamList = {
  Home: HomeProps;
  Emergencies: EmergenciesProps;
  GoogleMaps: GoogleMapsProps;
};

const Stack = createNativeStackNavigator();

// TODO: add expo fonts
// TODO: add call functionality (with contacts)
// TODO: add emergency info screen
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
          </Stack.Navigator>
        </NavigationContainer>
        <StaggerButtons />
      </Box>
    </NativeBaseProvider>
  );
}
