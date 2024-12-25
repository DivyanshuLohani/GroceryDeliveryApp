import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: any[];
}

const ProductList = ({ products }: ProductListProps) => {
  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard name={item.name} price={item.price} image={item.image} />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.productList}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ProductList;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
  },
  categoryList: {
    width: "25%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  categoryContainer: {
    alignItems: "center",
    width: "100%",
    padding: 0,
  },

  productList: {
    // padding: 10,
    width: "100%",
    marginHorizontal: "auto",
  },
});