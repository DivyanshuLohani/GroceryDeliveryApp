import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AuthProvider from "@/context/AuthProvider";
import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "@/context/CartProvider";
import { AddressProvider } from "@/context/AddressProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView>
      <AuthProvider onAuthChanged={() => {}}>
        <CartProvider>
          <AddressProvider>
            <LayoutMain />
          </AddressProvider>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}

function LayoutMain() {
  const { ready } = useAuth();
  if (!ready) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
