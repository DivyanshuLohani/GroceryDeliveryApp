import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TAddress } from "@/types";

interface DeliveryAddressProps {
  address: TAddress;
}

const DeliveryAddress = ({ address }: DeliveryAddressProps) => {
  return (
    <View style={styles.addressCard}>
      <Ionicons name="location-outline" size={24} color="#666" />
      <View style={styles.addressInfo}>
        {/* <Text style={styles.addressName}>{address.user.name}</Text> */}
        <Text style={styles.addressText}>{address.street_address}</Text>
        <Text style={styles.addressText}>{address.city}</Text>
        {/* <Text style={styles.addressPhone}>{address}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressCard: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
  },
  addressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default DeliveryAddress;
