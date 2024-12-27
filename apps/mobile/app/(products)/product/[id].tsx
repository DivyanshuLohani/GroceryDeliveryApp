import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Loading from "@/components/Loading";
import useFetch from "@/hooks/useFetch";
import { TProduct } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: product,
    loading,
    error,
  } = useFetch<TProduct>(`/products/${id}/`);
  const navigation = useNavigation();

  useEffect(() => {
    if (loading || !product) return;
    navigation.setOptions({ headerShown: true, title: product.name });
  }, [navigation, loading, product]);

  if (loading || !product) {
    return <Loading />;
  }

  return (
    <>
      <ThemedView style={styles.container}>
        {/* Header Section */}
        <ProductImageCarousel images={product.images} />
        <ProductDetails product={product} />
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
