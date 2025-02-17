import { StyleSheet, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressPopup from "@/components/Home/Header";
import PromoBanner from "@/components/Home/BannerSection";
import CategoryGrid from "@/components/Category/CategoryGrid";
import useListFetch from "@/hooks/useListFetch";
import Loading from "@/components/Loading";
import { TCategory } from "@/types/category";
import ErrorComponent from "@/components/Error";
import useFetch from "@/hooks/useFetch";
import { TOrder } from "@/types/cart";
import PendingOrderTracking from "@/components/Order/PendingOrderTracking";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: category,
    loading,
    error,
  } = useListFetch<TCategory>("/products/categories/");

  const { data: pendingOrder } = useFetch<TOrder>("/orders/recent/");

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorComponent message="Oops! Something went wrong while fetching categories" />
    );

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
        {pendingOrder && <PendingOrderTracking order={pendingOrder} />}
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
