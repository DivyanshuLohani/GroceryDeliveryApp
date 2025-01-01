import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import useListFetch from "@/hooks/useListFetch";
import { TAddress } from "@/types";
import { Colors } from "@/constants/Colors";
import { capitalize } from "@/utils/text";
import AddressCard from "@/components/Address/AddressCard";

const DeliveryAddressesScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const {
    data: addresses,
    loading,
    error,
  } = useListFetch<TAddress>("/users/address/");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Your Addresses" }} />
      <ScrollView
        style={styles.addressList}
        showsVerticalScrollIndicator={false}
      >
        {addresses.map((address, index) => (
          <AddressCard
            key={address.id}
            address={address}
            index={index}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/address/new")}
        >
          <Ionicons name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    flexDirection: "column",
  },

  addressList: {
    flex: 1,
    padding: 16,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default DeliveryAddressesScreen;
