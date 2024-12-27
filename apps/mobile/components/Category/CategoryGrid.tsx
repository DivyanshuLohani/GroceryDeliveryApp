import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CategoryItem from "./CategoryItem";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { TCategory } from "@/types/category";

interface CategoryGridProps {
  title: string;
  seeAllText: string | null;
  seeAllLink: any | null;
  categories: TCategory[];
}

const CategoryGrid = ({
  title,
  seeAllText = null,
  seeAllLink = null,
  categories,
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
          <CategoryItem key={category.id} {...category} />
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
    gap: 5,
  },
});

export default CategoryGrid;
