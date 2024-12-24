import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
  return (
    <View style={[styles.container]}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        placeholder="Search here for anything you want..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
