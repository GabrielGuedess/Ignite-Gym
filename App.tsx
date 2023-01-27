import { useCallback, useEffect, useState } from "react";

import { NativeBaseProvider } from "native-base";

import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { SignIn } from "screens/SignIn";
import { SignUp } from "screens/SignUp";
import { Loading } from "components/Loading";

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
      <SignUp />
      <StatusBar style="light" backgroundColor="transparent" />
    </NativeBaseProvider>
  );
}
