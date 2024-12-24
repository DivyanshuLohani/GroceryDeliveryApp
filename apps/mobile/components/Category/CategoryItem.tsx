import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function CategoryItem({
  name,
  image,
}: {
  name: string;
  image: any;
}) {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <ThemedView style={styles.imageContainer}>
        <Image source={image} style={styles.categoryImage} />
      </ThemedView>
      <ThemedText style={styles.categoryName}>{name}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
    width: 120,
    height: 150,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    // backgroundColor: "#E8F5E9",
    // borderRadius: 50,
    justifyContent: "center",

    marginBottom: 8,

    width: 80,
    height: 80,
  },
  categoryImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
    alignSelf: "center",
    justifyContent: "center",
  },
});
