import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNCSTORAGE_TOKEN } from "@/constants/asycnStorage";
import AuthProvider from "@/context/AuthProvider";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "@/context/CartProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const onAuthChanged = (auth: boolean) => {
    setLoggedIn(auth);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem(ASYNCSTORAGE_TOKEN);
      setLoggedIn(!!token); // Set true if token exists, false otherwise
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (loaded && loggedIn !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loggedIn]);

  if (!loaded || loggedIn === null) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView>
      <AuthProvider onAuthChanged={onAuthChanged}>
        <CartProvider>
          <LayoutMain />
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
