import { StyleSheet, Platform, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressPopup from "@/components/Home/addressPopup";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/Home/SearchBar";
import PromoBanner from "@/components/Home/BannerSection";
import CategoryGrid from "@/components/Category/CategoryGrid";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <ScrollView>
      {/* <PromoBanner /> */}
      <CategoryGrid
        title={"Grocery Categories"}
        seeAllText={"See All"}
        seeAllLink={"/categories"}
      />

      {/* 
      <TouchableOpacity onPress={() => AsyncStorage.clear()}>
        <ThemedView>
          <ThemedText>Logout</ThemedText>
        </ThemedView>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
