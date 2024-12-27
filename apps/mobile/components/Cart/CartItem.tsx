import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/currency";

interface CartItemProps {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default function CartItem({
  id,
  name,

  price,
  image,
  quantity,
}: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    increaseQuantity(id);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      decreaseQuantity(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.productInfo}>
          <Image
            source={{ uri: image, width: 60, height: 60 }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              onPress={handleIncrement}
              style={[styles.quantityButton, styles.incrementButton]}
            >
              <Text style={[styles.quantityButtonText, styles.greenText]}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>
            {formatCurrency(Number(price) * quantity)}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => {
          removeItem(id);
        }}
        style={styles.removeButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={24} color="#999" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  weight: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  incrementButton: {
    backgroundColor: "#e8f5e9",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#666",
  },
  greenText: {
    color: "#4CAF50",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
    color: "#000",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  removeButton: {
    padding: 8,
    marginLeft: 12,
  },
});
