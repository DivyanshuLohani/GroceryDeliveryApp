import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel"; // Add proper carousel library
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";

const ProductScreen = () => {
  const images = [
    require("@/assets/images/item.png"),
    require("@/assets/images/item.png"),
    require("@/assets/images/Banner.png"),
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <ProductImageCarousel images={images} />
      <ProductDetails />
    </ThemedView>
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
