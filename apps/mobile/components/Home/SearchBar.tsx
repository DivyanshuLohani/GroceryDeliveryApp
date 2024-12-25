import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SearchBarProps {
  redirect?: boolean;
  search?: string;
  onSearch?: (query: string) => void;
  filterEnabled?: boolean;
  onFilterPress?: () => void;
}

const SearchBar = ({
  search: s,
  onSearch,
  onFilterPress,
  redirect = false,
  filterEnabled = false,
}: SearchBarProps) => {
  const [search, setSearch] = useState(s ?? "");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search here for anything you want..."
          placeholderTextColor="#aaa"
          autoFocus={!!!redirect}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onPress={() => (redirect ? router.push("/explore") : null)}
          onSubmitEditing={() => onSearch && onSearch(search)}
        />
      </View>
      {filterEnabled && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: "#EEEEEE",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
