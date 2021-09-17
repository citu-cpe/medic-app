import React, { useCallback, useEffect, useState } from 'react';
import { Box, NativeBaseProvider, StatusBar } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { Screens } from './screens/Screens';

// TODO: add expo fonts
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
        <Screens />
      </Box>
    </NativeBaseProvider>
  );
}
