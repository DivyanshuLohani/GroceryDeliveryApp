import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyCartPage = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="cart-outline"
        size={80}
        color="#ccc"
        style={styles.icon}
      />
      <Text style={styles.text}>Your cart is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
});

export default EmptyCartPage;
