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
import useListFetch from "@/hooks/useListFetch";
import Loading from "@/components/Loading";
import { TCategory } from "@/types/category";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });
  const {
    data: category,
    loading,
    error,
    hasMore,
  } = useListFetch<TCategory>("/products/categories/");
  if (loading) return <Loading />;

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
          {!loading &&
            category &&
            category.map(
              (c) =>
                c.subcategories.length > 0 && (
                  <CategoryGrid
                    key={c.id}
                    title={c.name}
                    categories={c.subcategories}
                    seeAllText={null}
                    seeAllLink={null}
                  />
                )
            )}
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
