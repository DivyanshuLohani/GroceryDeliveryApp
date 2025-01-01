import { View, Text } from "react-native";
import React from "react";
import AddressDetailsForm from "@/components/Address/AddressDetails";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

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
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Address Details" }} />
      <AddressDetailsForm
        latitude={Number(lat)}
        longitude={Number(long)}
        subAddress={subAddress}
        onSubmitSuccess={() => router.replace("/address")}
        city={city}
        state={state}
        country={country}
      />
    </>
  );
};

export default AddressDetailsScreen;
