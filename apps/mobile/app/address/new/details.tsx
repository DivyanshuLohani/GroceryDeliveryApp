import { View, Text, Alert } from "react-native";
import React from "react";
import AddressDetailsForm from "@/components/Address/AddressDetails";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { AddressForm } from "@/types";
import { api } from "@/api";
import { useAddress } from "@/hooks/useAddress";

const AddressDetailsScreen = () => {
  const { long, lat, subAddress, city, state, country } = useLocalSearchParams<{
    lat: string;
    long: string;
    subAddress: string;
    city: string;
    state: string;
    country: string;
  }>();
  const router = useRouter();
  const { loadAddresses } = useAddress();
  const handleFormSubmit = async (formData: AddressForm) => {
    // setLoading(true);
    try {
      await api.post("/users/address/create/", formData);
      router.dismissTo("/address");
      await loadAddresses();
    } catch (error) {
      Alert.alert("Error", "Failed to save address. Please try again.");
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Address Details" }} />
      <AddressDetailsForm
        latitude={Number(lat)}
        longitude={Number(long)}
        subAddress={subAddress}
        // onSubmitSuccess={() => router.replace("/address")}
        onSubmit={handleFormSubmit}
        city={city}
        state={state}
        country={country}
      />
    </>
  );
};

export default AddressDetailsScreen;
