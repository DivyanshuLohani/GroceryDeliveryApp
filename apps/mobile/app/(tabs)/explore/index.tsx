import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import SearchBar from "@/components/Home/SearchBar";
import { useRouter } from "expo-router";
import useListFetch from "@/hooks/useListFetch";
import { TCategory } from "@/types/category";
import Loading from "@/components/Loading";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CategoryItem from "@/components/Category/CategoryItem";

const ProductCategories = () => {
  const router = useRouter();
  const {
    data: categories,
    loading,
    error,
  } = useListFetch<TCategory>("/products/categories/");

  const subCategories = useMemo(() => {
    if (!categories) return [];
    return categories.flatMap((parent) => parent.subcategories);
  }, [categories]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Find Products</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 10, backgroundColor: "white" }}>
        <SearchBar
          redirect={false}
          onSearch={(q) => {
            router.push(`/explore/${q}`);
          }}
        />
      </View>
      {loading && <Loading />}
      {/* Categories Grid */}
      <View
        style={{
          marginBottom: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={subCategories}
          renderItem={({ item }) => <CategoryItem {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginLeft: 16,
    marginBottom: 16,
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryImage: {
    width: "100%",
    height: "60%",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

export default ProductCategories;
