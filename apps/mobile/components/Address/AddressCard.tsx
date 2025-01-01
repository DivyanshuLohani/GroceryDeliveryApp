import { TAddress } from "@/types";
import { capitalize } from "@/utils/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAddress } from "@/hooks/useAddress";
import { useEffect } from "react";

export default function AddressCard({
  address,
  onSelected,
}: {
  address: TAddress;
  onSelected?: (address: TAddress) => void;
}) {
  const { selectedAddress, setSelectedAddress } = useAddress();
  const router = useRouter();
  const isSelected = selectedAddress?.id === address.id;

  return (
    <TouchableOpacity
      style={[styles.addressCard, isSelected && styles.selectedCard]}
      onPress={() => {
        setSelectedAddress(address);
        onSelected && onSelected(address);
      }}
    >
      <View style={styles.addressHeader}>
        <View style={styles.typeContainer}>
          <Ionicons
            name={
              address.label === "home"
                ? "home"
                : address.label === "work"
                ? "business"
                : "location"
            }
            size={20}
            color={isSelected ? Colors.light.tint : "#666"}
          />
          <Text style={[styles.addressType, isSelected && styles.selectedText]}>
            {capitalize(address.label)}
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
        <Text style={styles.addressText}>{address.street_address}</Text>
        <Text style={styles.addressText}>{address.area}</Text>
        <Text style={styles.addressText}>
          {address.city}, {address.zip_code}
        </Text>
        <Text style={styles.phone}>{address.phone_number}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    borderColor: Colors.light.tint,
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
    color: Colors.light.tint,
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
});
