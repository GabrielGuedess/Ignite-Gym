import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Roboto_400Regular, Roboto_700Bold });
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
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202024',
      }}
    >
      <Text>Hello world</Text>
      <StatusBar style='light' backgroundColor='transparent' />
    </View>
  );
}
