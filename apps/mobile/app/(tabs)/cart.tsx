import CartItem from "@/components/Cart/CartItem";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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
import { CartItem as TCartItem } from "@/types/cart";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CheckoutSheet from "@/components/Cart/CheckoutSheet";

const CartPage = () => {
  // Mock cart items
  const { items, itemCount, total } = useCart();

  if (itemCount === 0) return <EmptyCartPage />;

  // Render individual cart item
  const renderCartItem = ({ item }: { item: TCartItem }) => (
    <CartItem
      id={item.product.id}
      name={item.product.name}
      price={item.product.price}
      image={item.product.images[0]}
      quantity={item.quantity}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id}
          contentContainerStyle={styles.cartList}
        />
      </View>
      <CheckoutSheet />
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
});

export default CartPage;
