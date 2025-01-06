import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/Home/SearchBar";
import ProductList from "@/components/Products/ProductList";
import useListFetch from "@/hooks/useListFetch";
import { TProduct } from "@/types/product";
import Loading from "@/components/Loading";
import NoProductsFound from "@/components/Products/NoProductsFound";
import ErrorComponent from "@/components/Error";

const SearchPage = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const router = useRouter();
  const [search, setSearch] = useState<string>(query);
  const {
    data: products,
    loading,
    error,
  } = useListFetch<TProduct>(`/products/search/${query}`);

  if (loading) return <Loading />;

  if (error) return <ErrorComponent />;

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
      {products.length === 0 && <NoProductsFound />}
      <ProductList products={products} />
    </>
  );
};

export default SearchPage;
