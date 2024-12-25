import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/Home/SearchBar";
import ProductScreen, { products } from "@/app/(products)/category/[id]";
import ProductList from "@/components/Products/ProductList";

const SearchPage = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const [search, setSearch] = useState<string>(query);

  return (
    <>
      <SafeAreaView>
        <SearchBar
          search={query}
          onSearch={(query) => router.push(`/explore/${query}`)}
          filterEnabled={true}
          onFilterPress={() => {}}
        />
      </SafeAreaView>
      <ProductList products={products} />
    </>
  );
};

export default SearchPage;
