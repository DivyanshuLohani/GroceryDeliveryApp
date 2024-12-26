import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/hooks/useCart";

interface CartTabIconProps {
  color: string;
  focused: boolean;
}

const CartTabIcon = ({ color, focused }: CartTabIconProps) => {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <Ionicons
        size={28}
        name={focused ? "cart" : "cart-outline"}
        color={color}
      />
      {items.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {items.length > 99 ? "99+" : items.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CartTabIcon;
