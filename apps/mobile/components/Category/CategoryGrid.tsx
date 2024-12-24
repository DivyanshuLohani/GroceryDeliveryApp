import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import CategoryItem from "./CategoryItem";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const categories = [
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
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 6,
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 7,
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 8,
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
  {
    id: 9,
    name: "Personal Care",
    image: require("@/assets/images/item.png"),
  },
];

interface CategoryGridProps {
  title: string;
  seeAllText: string | null;
  seeAllLink: any | null;
}

const CategoryGrid = ({
  title,
  seeAllText = null,
  seeAllLink = null,
}: CategoryGridProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {seeAllText && (
          <TouchableOpacity onPress={() => router.push(seeAllLink)}>
            <Text style={styles.seeAll}>{seeAllText}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.grid}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
  },
  seeAll: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CategoryGrid;
