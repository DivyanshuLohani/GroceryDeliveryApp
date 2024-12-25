import CartItem from "@/components/Cart/CartItem";
import { Colors } from "@/constants/Colors";
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

const CartPage = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 500,
      quantity: 1,
      image: require("@/assets/images/item.png"),
    },
    {
      id: 2,
      name: "Product 2",
      price: 800,
      quantity: 1,
      image: require("@/assets/images/item.png"),
    },
  ]);
  const router = useRouter();

  // Function to increase quantity
  const increaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to handle checkout
  const handleCheckout = () => {
    router.push("/checkout");
    // Implement checkout logic here
  };

  // Render individual cart item
  const renderCartItem = ({ item }: { item: any }) => <CartItem item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
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
          <Text style={styles.totalText}>₹{calculateTotal()}</Text>
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
