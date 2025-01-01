import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import useFetch from "@/hooks/useFetch";
import { AddressForm, AddressFormSchema, TAddress } from "@/types";
import { z } from "zod";
import { api } from "@/api";
import AddressDetailsForm from "@/components/Address/AddressDetails";
import LoadingScreen from "@/components/Loading";

interface Errors {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  area?: string;
  zipCode?: string;
}

const EditAddressScreen = () => {
  // If address is passed through route.params, it's edit mode
  const { id } = useLocalSearchParams();
  const {
    data: existingAddress,
    loading,
    error,
  } = useFetch<TAddress>(`/users/address/${id}`);
  const navigation = useNavigation();

  const handleSubmit = async (formData: AddressForm) => {
    try {
      await api.patch(`/users/address/${id}/`, formData);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save address. Please try again.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  console.log(existingAddress);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, title: "Edit Address" }} />
      <AddressDetailsForm
        latitude={Number(existingAddress?.latitude)}
        longitude={Number(existingAddress?.longitude)}
        subAddress={existingAddress?.area ?? ""}
        onSubmit={handleSubmit}
        city={existingAddress?.city ?? ""}
        state={existingAddress?.state ?? ""}
        country={existingAddress?.country ?? ""}
        name={existingAddress?.name ?? ""}
        phone_number={existingAddress?.phone_number ?? ""}
        zip_code={existingAddress?.zip_code ?? ""}
        street_address={existingAddress?.street_address ?? ""}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  typeContainer: {
    marginBottom: 20,
  },
  typeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  typeButtonActive: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },
  typeButtonText: {
    marginLeft: 8,
    color: "#666",
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: "#FFF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
    marginTop: -20,
    backgroundColor: "#F5F5F5",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 100,
  },
});

export default EditAddressScreen;
