import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { Colors } from "@/constants/Colors";

interface CategoryItemProps {
  item: any;
  selectedCategory: number;
  setSelectedCategory: (n: number) => void;
}

const ListCategoryItem = ({
  item,
  selectedCategory,
  setSelectedCategory,
}: CategoryItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        item.id === selectedCategory && styles.activeCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
  },
  categoryList: {
    width: "25%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  categoryContainer: {
    alignItems: "center",
    width: "100%",
    padding: 0,
  },
  categoryItem: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    width: 80,
    alignItems: "center",
  },
  activeCategory: {
    backgroundColor: Colors.light.tint,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default ListCategoryItem;
