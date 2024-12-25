import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import CategoryGrid from "@/components/Category/CategoryGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/Home/SearchBar";

const AllCategories = () => {
  return (
    <SafeAreaView>
      <SearchBar />
    </SafeAreaView>
  );
};

export default AllCategories;
