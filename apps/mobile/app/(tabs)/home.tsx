import { StyleSheet, Platform, TouchableOpacity, Animated } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressPopup from "@/components/Home/addressPopup";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/Home/SearchBar";
import PromoBanner from "@/components/Home/BannerSection";
import CategoryGrid from "@/components/Category/CategoryGrid";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
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
      <SearchBar redirect={true} />

      <ScrollView style={{ marginBottom: 100 }}>
        <PromoBanner />
        <ScrollView>
          <CategoryGrid
            title={"Dairy and Bakery"}
            seeAllText={null}
            seeAllLink={null}
          />
          <CategoryGrid title={"Snacks"} seeAllText={null} seeAllLink={null} />
          <CategoryGrid
            title={"Fruits and Vegetables"}
            seeAllText={null}
            seeAllLink={null}
          />
          <CategoryGrid
            title={"Beverages"}
            seeAllText={null}
            seeAllLink={null}
          />
          <CategoryGrid
            title={"Meat and Seafood"}
            seeAllText={null}
            seeAllLink={null}
          />
          <CategoryGrid
            title={"Household"}
            seeAllText={null}
            seeAllLink={null}
          />
        </ScrollView>

        <TouchableOpacity onPress={() => AsyncStorage.clear()}>
          <ThemedView>
            <ThemedText>Logout</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
