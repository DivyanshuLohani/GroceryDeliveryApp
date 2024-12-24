import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";

const AddressPopup = () => {
  return (
    <ThemedView style={{ marginHorizontal: 10 }}>
      <ThemedText type="subtitle">Welcome</ThemedText>
      <ThemedText type="title">10 minutes</ThemedText>
      <ThemedText type="subtitle" style={{ fontSize: 16, marginTop: -3 }}>
        Home - Tongratoli Ranchi
      </ThemedText>
    </ThemedView>
  );
};

export default AddressPopup;
