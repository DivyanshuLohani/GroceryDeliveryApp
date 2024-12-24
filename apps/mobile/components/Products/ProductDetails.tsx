import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

const ProductDetails = () => {
  return (
    <ScrollView style={styles.detailsContainer}>
      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Maggie</Text>
        <Text style={styles.productDescription}>
          MAGGI 2-minute Instant Noodles {"\n"}4.5 (325 Reviews)
        </Text>
        <Text style={styles.productPrice}>₹15</Text>
        {/* <Text style={styles.productInfo}>
                🌟 30+ people ordered this in the last 30 days!
              </Text> */}
        <Button title="Add to Cart" color="#FFA500" />
      </View>

      {/* Extra Info Section */}
      <View style={styles.extraInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="cart-outline" size={20} />
          <Text>Free Delivery on Orders Over ₹120</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="home-outline" size={20} />
          <Text>Fresh Groceries Delivered to Your Doorstep</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="lock-closed-outline" size={20} />
          <Text>Safe and Secure Payment Options</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 16,
    flex: 1,
  },
  productDetails: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productInfo: {
    fontSize: 14,
    color: "#FF6347",
    marginBottom: 10,
  },
  extraInfo: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ProductDetails;