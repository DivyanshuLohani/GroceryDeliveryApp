import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { useCart } from "@/hooks/useCart";
import { TProduct } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.card}
    >
      <Image
        source={{ uri: product.images[0], width: 80, height: 80 }}
        style={styles.image}
      />
      <ThemedText style={styles.name} numberOfLines={1}>
        {product.name}
      </ThemedText>
      <ThemedText style={styles.price}>
        {formatCurrency(Number(product.price))}
      </ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addItem({
            product,
            quantity: 1,
          });
        }}
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
