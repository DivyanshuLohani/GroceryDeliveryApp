import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const NoProductsFound = () => {
  return (
    <ThemedView
      style={{
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Ionicons name="search-outline" size={50} color="gray" />

      <ThemedText style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>
        No products found
      </ThemedText>
      <Text
      // style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}
      >
        Try sarching something else or
      </Text>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text style={{ marginTop: 10 }}>Go back</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default NoProductsFound;
