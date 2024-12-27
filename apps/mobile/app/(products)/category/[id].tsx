import Loading from "@/components/Loading";
import ProductList from "@/components/Products/ProductList";
import useListFetch from "@/hooks/useListFetch";
import { TProduct } from "@/types/product";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";

export default function ProductScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: products,
    loading,
    error,
  } = useListFetch<TProduct>(`/products/categories/${id}`);

  useEffect(() => {
    if (loading) return;
    navigation.setOptions({
      headerShown: true,
      title: products[0]?.category.name ?? "Products",
      headerTitleAlign: "center",
    });
  }, [navigation, loading]);

  if (loading) return <Loading />;

  return <ProductList products={products} />;
}
