import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import CategoryGrid from "@/components/Category/CategoryGrid";
import { SafeAreaView } from "react-native-safe-area-context";

const AllCategories = () => {
  return (
    <ScrollView>
      <CategoryGrid
        title={"Dairy and Bakery"}
        seeAllText={null}
        seeAllLink={null}
      />
      <CategoryGrid title={"Snacks"} seeAllText={null} seeAllLink={null} />
      <CategoryGrid
        title={"Fruits and Vegetables"}
        seeAllText={null}
        seeAllLink={null}
      />
      <CategoryGrid title={"Beverages"} seeAllText={null} seeAllLink={null} />
      <CategoryGrid
        title={"Meat and Seafood"}
        seeAllText={null}
        seeAllLink={null}
      />
      <CategoryGrid title={"Household"} seeAllText={null} seeAllLink={null} />
    </ScrollView>
  );
};

export default AllCategories;
