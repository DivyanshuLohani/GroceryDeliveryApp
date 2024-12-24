import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useAuth from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import AddressPopup from "@/components/Home/addressPopup";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/Home/SearchBar";

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
    <>
      <SafeAreaView>
        <Animated.View
          style={[
            styles.headerContainer,
            { transform: [{ translateY: headerTranslateY }] },
          ]}
        >
          <AddressPopup />
          <Ionicons
            name="people-circle-outline"
            size={30}
            color="white"
            style={{
              paddingRight: 20,
              paddingTop: 20,
            }}
          />
        </Animated.View>
        <SearchBar />
      </SafeAreaView>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="grid-outline" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },

  // headerContainer: {
  //   flexDirection: "row",
  //   alignContent: "center",
  //   justifyContent: "space-between",
  // },
});
