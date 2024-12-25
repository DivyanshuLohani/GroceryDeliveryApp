import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  redirect?: boolean;
}

export default function SearchBar({ redirect }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.container]}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        placeholder="Search here for anything you want..."
        placeholderTextColor="#aaa"
        ref={inputRef}
        autoFocus={!!!redirect}
        style={styles.input}
        onPress={() => (redirect ? router.push("/explore") : null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
