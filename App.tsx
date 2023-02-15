import { useCallback, useEffect, useState } from "react";

import { NativeBaseProvider } from "native-base";

import { StatusBar } from "expo-status-bar";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Routes } from "routes";

import { AuthContextProvider } from "contexts/AuthContext";

import { theme } from "theme";

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
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" backgroundColor="transparent" />

      <AuthContextProvider>
        <Routes onReady={onLayoutRootView} />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
