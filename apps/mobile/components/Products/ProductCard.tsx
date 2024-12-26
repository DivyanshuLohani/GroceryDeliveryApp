import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  name: string;
  price: number;
  image: any; // Replace `any` with the type for your images if using a stricter type system
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  const router = useRouter();
  const { addItem } = useCart();
  return (
    <TouchableOpacity
      onPress={() => router.push("/product/1")}
      style={styles.card}
    >
      <Image source={image} style={styles.image} />
      <ThemedText style={styles.name}>{name}</ThemedText>
      <ThemedText style={styles.price}>{price}</ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addItem({ id: "1", name, price, quantity: 1, image })}
      >
        <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",

    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff9800",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductCard;
