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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const existingAddress = {
  id: 3,
  type: "Other",
  name: "John Doe",
  address: "789 Park Road",
  area: "Central Park",
  city: "New York",
  zipCode: "10022",
  phone: "+1 234-567-8902",
};
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
  const isEditMode = !!existingAddress;
  const navigation = useNavigation();

  const [addressType, setAddressType] = useState(
    existingAddress?.type || "Home"
  );
  const [formData, setFormData] = useState({
    name: existingAddress?.name || "",
    phone: existingAddress?.phone || "",
    address: existingAddress?.address || "",
    area: existingAddress?.area || "",
    city: existingAddress?.city || "",
    zipCode: existingAddress?.zipCode || "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const addressTypes = ["Home", "Work", "Other"];

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically save to API/database
      console.log("Saving address:", {
        type: addressType,
        ...formData,
      });

      Alert.alert(
        "Success",
        `Address ${isEditMode ? "updated" : "added"} successfully`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    error,
    keyboardType = "default",
    multiline = false,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    keyboardType?: string;
    multiline?: boolean;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? "Edit Address" : "Add New Address"}
          </Text>
        </View>

        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Address Type Selection */}
          <View style={styles.typeContainer}>
            <Text style={styles.label}>Address Type</Text>
            <View style={styles.typeButtonsContainer}>
              {addressTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    addressType === type && styles.typeButtonActive,
                  ]}
                  onPress={() => setAddressType(type)}
                >
                  <Ionicons
                    name={
                      type === "Home"
                        ? "home"
                        : type === "Work"
                        ? "business"
                        : "location"
                    }
                    size={20}
                    color={addressType === type ? "#FFF" : "#666"}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      addressType === type && styles.typeButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Form Fields */}
          <InputField
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
          />

          <InputField
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            error={errors.phone}
            keyboardType="phone-pad"
          />

          <InputField
            label="Street Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            error={errors.address}
            multiline
          />

          <InputField
            label="Area/Neighborhood"
            value={formData.area}
            onChangeText={(text) => setFormData({ ...formData, area: text })}
            error={errors.area}
          />

          <InputField
            label="City"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
            error={errors.city}
          />

          <InputField
            label="ZIP Code"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
            error={errors.zipCode}
            keyboardType="numeric"
          />

          {/* Add padding at bottom for button visibility */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>
              {isEditMode ? "Update Address" : "Save Address"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
