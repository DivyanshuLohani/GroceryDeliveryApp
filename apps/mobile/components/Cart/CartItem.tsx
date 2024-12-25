import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartPrice}>₹{item.price}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            // onPress={() => decreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{item.quantity}</Text>
          <TouchableOpacity
            // onPress={() => increaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Text style={[styles.quantityText, { color: Colors.light.tint }]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartPrice: {
    fontSize: 14,
    color: "#888",
  },
  quantityControls: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityNumber: {
    marginHorizontal: 12,
    fontSize: 16,
  },
});

export default CartItem;
