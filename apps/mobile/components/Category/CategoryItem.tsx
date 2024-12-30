import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { TCategory } from "@/types/category";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 64) / 2; // 2 columns with 16px padding on sides and between

interface CategoryItemProps extends TCategory {
  width?: number;
}

export default function CategoryItem({
  name,
  image,
  id,
  width = COLUMN_WIDTH,
}: CategoryItemProps) {
  const router = useRouter();
  const onPress = () => {
    router.push(`/category/${id}`);
  };
  return (
    <TouchableOpacity style={[styles.card, { width }]} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { height: width }]}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    objectFit: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    padding: 12,
    textAlign: "center",
    lineHeight: 20,
  },
});
