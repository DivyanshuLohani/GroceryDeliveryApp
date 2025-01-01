import { StyleSheet, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressPopup from "@/components/Home/Header";
import PromoBanner from "@/components/Home/BannerSection";
import CategoryGrid from "@/components/Category/CategoryGrid";
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

  return (
    <SafeAreaView>
      <AddressPopup scrollY={scrollY} />

      <Animated.ScrollView
        style={{ marginBottom: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <PromoBanner />

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
