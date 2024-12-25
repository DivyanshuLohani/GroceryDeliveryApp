import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchBar from "@/components/Home/SearchBar";
import { useRouter } from "expo-router";

export const categories = [
  {
    id: 1,
    name: "Grocery & Staples",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 2,
    name: "Frozen Food",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 3,
    name: "Fruits & Vegetables",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 4,
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 5,
    name: "Beverages",
    image: require("@/assets/images/item.png"),
  },
];

const ProductCategories = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Find Products</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 10 }}>
        <SearchBar />
      </View>

      {/* Categories Grid */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            onPress={() => router.push(`/category/${category.id}`)}
            key={category.id}
            style={[
              styles.categoryCard,
              // {
              //   backgroundColor: category.backgroundColor,
              //   borderColor: category.borderColor,
              // },
            ]}
          >
            <Image
              source={category.image}
              style={styles.categoryImage}
              resizeMode="contain"
            />
            <Text style={styles.categoryTitle}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
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
