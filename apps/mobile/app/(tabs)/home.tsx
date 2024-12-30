import { StyleSheet, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressPopup from "@/components/Home/addressPopup";
import SearchBar from "@/components/Home/SearchBar";
import PromoBanner from "@/components/Home/BannerSection";
import CategoryGrid from "@/components/Category/CategoryGrid";
import { ScrollView } from "react-native-gesture-handler";
import useListFetch from "@/hooks/useListFetch";
import Loading from "@/components/Loading";
import { TCategory } from "@/types/category";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: category,
    loading,
    error,
    hasMore,
  } = useListFetch<TCategory>("/products/categories/");
  if (loading) return <Loading />;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -500],
    extrapolate: "clamp",
  });
  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });
  const height = scrollY.interpolate({
    inputRange: [0, 100, 200, 300],
    outputRange: [100, 100, 100, 100],
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
      </Animated.View>
      <Animated.View
        style={[{ transform: [{ translateY: searchTranslateY }] }]}
      >
        <SearchBar redirect={true} />
      </Animated.View>

      <Animated.ScrollView
        style={{ marginBottom: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
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
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    // paddingBottom: 20,
  },
});
