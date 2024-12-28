import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";

const AddressPopup = () => {
  return (
    <ThemedView
      style={{
        marginHorizontal: 10,
      }}
    >
      <ThemedText
        // type="subtitle"
        style={{
          paddingVertical: 20,
          textAlign: "center",
        }}
      >
        <Ionicons
          name="pizza"
          size={40}
          color="gray"
          style={{ marginRight: 10 }}
        />
      </ThemedText>

      <ThemedView
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="location"
          size={20}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <ThemedText type="subtitle" style={{ fontSize: 16 }}>
          Home - Tongratoli Ranchi
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default AddressPopup;
