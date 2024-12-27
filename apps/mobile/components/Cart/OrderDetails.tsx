import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatCurrency } from "@/utils/currency";
import { useCart } from "@/hooks/useCart";
import { Colors } from "@/constants/Colors";
import { api } from "@/api";

interface OrderDetailsProps {
  onClose: () => void;
}

const OrderDetails = ({ onClose }: OrderDetailsProps) => {
  const { total, items, clearCart } = useCart();

  const handleOrder = async () => {
    try {
      console.log("placing order");
      await api.post("/orders/order/", {
        order_items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });
      Alert.alert("Order placed successfully");
      await clearCart();
    } catch {
      console.log("error placing order");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Checkout</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Payment Method</Text>
        <TouchableOpacity style={styles.contentAction}>
          <Text style={styles.contentText}>Method</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Promo Code</Text>
        <TouchableOpacity style={styles.contentAction}>
          <Text style={styles.contentText}>Select</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Total Cost</Text>
        <Text style={styles.contentText}>{formatCurrency(total)}</Text>
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.light.tint,
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          width: 380,
        }}
        onPress={handleOrder}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Place Order
        </Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By placing order you agree to our{" "}
        <Text style={{ fontWeight: "bold" }}>Terms and Conditions</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  contentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentAction: { flexDirection: "row", alignItems: "center" },
  termsText: { fontSize: 12, color: "grey", marginTop: 20 },
});

export default OrderDetails;
