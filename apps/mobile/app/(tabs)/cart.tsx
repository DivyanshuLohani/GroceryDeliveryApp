import CartItem from "@/components/Cart/CartItem";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import EmptyCartPage from "../(cart)/checkout";

const CartPage = () => {
  // Mock cart items
  const { items, itemCount, total } = useCart();

  const router = useRouter();

  // Function to handle checkout
  const handleCheckout = () => {
    router.push("/checkout");
    // Implement checkout logic here
  };

  if (itemCount === 0) return <EmptyCartPage />;

  // Render individual cart item
  const renderCartItem = ({ item }: { item: any }) => (
    <CartItem
      id={item.id}
      name={item.name}
      weight={"500g"}
      price={item.price}
      image={item.image}
      quantity={item.quantity}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
          <Text style={styles.totalText}>₹{total}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartList: {
    paddingBottom: 80,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  totalText: {
    right: 16,
    fontSize: 16,
    backgroundColor: Colors.light.accent,
    padding: 6,
    borderRadius: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default CartPage;
