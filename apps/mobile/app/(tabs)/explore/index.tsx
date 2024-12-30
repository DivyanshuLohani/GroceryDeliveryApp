import React from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductCategories = () => {
  const router = useRouter();
  const {
    data: categories,
    loading,
    error,
  } = useListFetch<TCategory>("/products/categories/");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Find Products</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 10 }}>
        <SearchBar
          redirect={false}
          onSearch={(q) => {
            router.push(`/explore/${q}`);
          }}
        />
      </View>
      {loading && <Loading />}
      {/* Categories Grid */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((parent) =>
          parent.subcategories.map((category) => (
            <TouchableOpacity
              onPress={() => router.push(`/category/${category.id}`)}
              key={category.id}
              style={[styles.categoryCard, category.colors]}
            >
              <Image
                source={{ uri: category.image, height: 100, width: 100 }}
                style={styles.categoryImage}
                resizeMode="contain"
              />
              <Text style={styles.categoryTitle}>{category.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    marginTop: 12,
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
