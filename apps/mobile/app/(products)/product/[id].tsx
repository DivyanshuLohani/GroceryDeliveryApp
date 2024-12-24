import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";
import { Stack, useNavigation } from "expo-router";
import Loading from "@/components/Loading";

const ProductScreen = () => {
  const [loading, setLoading] = useState(true);
  const images = [
    require("@/assets/images/item.png"),
    require("@/assets/images/item.png"),
    require("@/assets/images/Banner.png"),
  ];
  const navigation = useNavigation();

  // TODO: ADD DATA
  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({ headerShown: true, title: "Product Details" });
      setLoading(false);
    }, 1000);
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ThemedView style={styles.container}>
        {/* Header Section */}
        <ProductImageCarousel images={images} />
        <ProductDetails />
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
  },
  productImage: {
    width: 300,
    height: 300,
  },
});

export default ProductScreen;
