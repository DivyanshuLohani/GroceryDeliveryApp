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

const DeliveryAddressesScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const router = useRouter();

  // Sample addresses data - in a real app, this would come from an API or storage
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      area: "Downtown",
      city: "New York",
      zipCode: "10001",
      phone: "+1 234-567-8900",
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Floor 12",
      area: "Financial District",
      city: "New York",
      zipCode: "10005",
      phone: "+1 234-567-8901",
    },
    {
      id: 3,
      type: "Other",
      name: "John Doe",
      address: "789 Park Road",
      area: "Central Park",
      city: "New York",
      zipCode: "10022",
      phone: "+1 234-567-8902",
    },
    {
      id: 4,
      type: "Other",
      name: "John Doe",
      address: "789 Park Road",
      area: "Central Park",
      city: "New York",
      zipCode: "10022",
      phone: "+1 234-567-8902",
    },
    {
      id: 5,
      type: "Other",
      name: "John Doe",
      address: "789 Park Road",
      area: "Central Park",
      city: "New York",
      zipCode: "10022",
      phone: "+1 234-567-8902",
    },
  ];

  const AddressCard = ({ address, index }: { address: any; index: number }) => {
    const isSelected = selectedAddress === index;
    const router = useRouter();

    return (
      <TouchableOpacity
        style={[styles.addressCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedAddress(index)}
      >
        <View style={styles.addressHeader}>
          <View style={styles.typeContainer}>
            <Ionicons
              name={
                address.type === "Home"
                  ? "home"
                  : address.type === "Work"
                  ? "business"
                  : "location"
              }
              size={20}
              color={isSelected ? "#FF6B6B" : "#666"}
            />
            <Text
              style={[styles.addressType, isSelected && styles.selectedText]}
            >
              {address.type}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/address/edit/${address.id}`)}
          >
            <Ionicons name="pencil" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressContent}>
          <Text style={styles.name}>{address.name}</Text>
          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.addressText}>{address.area}</Text>
          <Text style={styles.addressText}>
            {address.city}, {address.zipCode}
          </Text>
          <Text style={styles.phone}>{address.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Your Addresses" }} />
      <ScrollView
        style={styles.addressList}
        showsVerticalScrollIndicator={false}
      >
        {addresses.map((address, index) => (
          <AddressCard key={address.id} address={address} index={index} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push("/address/new");
            console.log("Redirect");
          }}
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
  addressCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressType: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#666",
  },
  selectedText: {
    color: "#FF6B6B",
  },
  addressContent: {
    marginLeft: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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
    backgroundColor: "#FF6B6B",
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
