import React from "react";
import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useCart } from "@/hooks/useCart";
import { TProduct } from "@/types/product";
import { formatCurrency } from "@/utils/currency";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2;

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { id, name, images, price } = product;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${id}`)}
    >
      <Image
        source={{ uri: images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.price}>{formatCurrency(price)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addItem({ product, quantity: 1 })}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: COLUMN_WIDTH,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: COLUMN_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.tint,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProductCard;
