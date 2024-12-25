import ProductCard from "@/components/Products/ProductCard";
import ProductList from "@/components/Products/ProductList";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";

export const products = [
  {
    id: 1,
    name: "Rice 5kg",
    price: "₹200",
    image: require("@/assets/images/item.png"),
    categoryId: 1,
  },
  {
    id: 2,
    name: "Wheat Flour 10kg",
    price: "₹300",
    image: require("@/assets/images/item.png"),
    categoryId: 1,
  },
  {
    id: 3,
    name: "Sugar 2kg",
    price: "₹50",
    image: require("@/assets/images/item.png"),
    categoryId: 1,
  },
  {
    id: 4,
    name: "Salt 1kg",
    price: "₹20",
    image: require("@/assets/images/item.png"),
    categoryId: 1,
  },
  {
    id: 5,
    name: "Tea Leaves 500g",
    price: "₹150",
    image: require("@/assets/images/item.png"),
    categoryId: 1,
  },
  // Category 2: Frozen Food
  {
    id: 6,
    name: "Frozen Peas 1kg",
    price: "₹80",
    image: require("@/assets/images/item.png"),
    categoryId: 2,
  },
  {
    id: 7,
    name: "Frozen Pizza",
    price: "₹120",
    image: require("@/assets/images/item.png"),
    categoryId: 2,
  },
  {
    id: 8,
    name: "Frozen Chicken Nuggets",
    price: "₹200",
    image: require("@/assets/images/item.png"),
    categoryId: 2,
  },
  {
    id: 9,
    name: "Frozen Fish Fillet",
    price: "₹250",
    image: require("@/assets/images/item.png"),
    categoryId: 2,
  },
  {
    id: 10,
    name: "Frozen French Fries",
    price: "₹100",
    image: require("@/assets/images/item.png"),
    categoryId: 2,
  },
  // Category 3: Fruits & Vegetables
  {
    id: 11,
    name: "Bananas - 1 Dozen",
    price: "₹60",
    image: require("@/assets/images/item.png"),
    categoryId: 3,
  },
  {
    id: 12,
    name: "Apples - 1kg",
    price: "₹150",
    image: require("@/assets/images/item.png"),
    categoryId: 3,
  },
  {
    id: 13,
    name: "Tomatoes - 1kg",
    price: "₹40",
    image: require("@/assets/images/item.png"),
    categoryId: 3,
  },
  {
    id: 14,
    name: "Potatoes - 2kg",
    price: "₹35",
    image: require("@/assets/images/item.png"),
    categoryId: 3,
  },
  {
    id: 15,
    name: "Onions - 1kg",
    price: "₹30",
    image: require("@/assets/images/item.png"),
    categoryId: 3,
  },
  // Category 4: Personal Care
  {
    id: 16,
    name: "Shampoo 500ml",
    price: "₹120",
    image: require("@/assets/images/item.png"),
    categoryId: 4,
  },
  {
    id: 17,
    name: "Conditioner 500ml",
    price: "₹130",
    image: require("@/assets/images/item.png"),
    categoryId: 4,
  },
  {
    id: 18,
    name: "Body Lotion 250ml",
    price: "₹80",
    image: require("@/assets/images/item.png"),
    categoryId: 4,
  },
  {
    id: 19,
    name: "Toothpaste 100g",
    price: "₹40",
    image: require("@/assets/images/item.png"),
    categoryId: 4,
  },
  {
    id: 20,
    name: "Soap Pack",
    price: "₹30",
    image: require("@/assets/images/item.png"),
    categoryId: 4,
  },
  // Category 5: Beverages
  {
    id: 21,
    name: "Orange Juice 1L",
    price: "₹90",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 22,
    name: "Apple Juice 1L",
    price: "₹100",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 23,
    name: "Coca Cola 500ml",
    price: "₹50",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 24,
    name: "Pepsi 500ml",
    price: "₹50",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 25,
    name: "Green Tea 20 Bags",
    price: "₹60",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 26,
    name: "Black Tea 20 Bags",
    price: "₹55",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 27,
    name: "Mineral Water 1.5L",
    price: "₹20",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 28,
    name: "Energy Drink 250ml",
    price: "₹70",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 29,
    name: "Soy Milk 1L",
    price: "₹110",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
  {
    id: 30,
    name: "Almond Milk 1L",
    price: "₹120",
    image: require("@/assets/images/item.png"),
    categoryId: 5,
  },
];

export default function ProductScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Products",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return <ProductList products={products} />;
}
