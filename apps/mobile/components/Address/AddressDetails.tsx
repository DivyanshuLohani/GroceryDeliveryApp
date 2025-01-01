import { api } from "@/api";
import { AddressForm } from "@/types";
import { capitalize } from "@/utils/text";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface AddressDetailsProps {
  latitude: number;
  longitude: number;
  subAddress: string;
  city: string;
  state: string;
  country: string;
  onSubmit: (fromData: AddressForm) => void;
  name?: string;
  zip_code?: string;
  phone_number?: string;
  street_address?: string;
}

const AddressDetailsForm: React.FC<AddressDetailsProps> = ({
  latitude,
  longitude,
  subAddress,
  city,
  state,
  country,
  onSubmit,
  name,
  zip_code,
  phone_number,
  street_address,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddressForm>({
    label: "home",
    street_address: street_address ?? "",
    city: city,
    state: state,
    zip_code: zip_code ?? "",
    country: country,
    name: name ?? "",
    phone_number: phone_number ?? "",
    area: subAddress ?? "",
    latitude: latitude,
    longitude: longitude,
  });

  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const addressTypes: ("home" | "work" | "other")[] = ["home", "work", "other"];

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Invalid phone number";
    }

    if (!formData.street_address.trim()) {
      newErrors.street_address = "Street address is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zip_code.trim()) {
      newErrors.zip_code = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.zip_code)) {
      newErrors.zip_code = "Invalid PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fill all required fields correctly");
      return;
    }

    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Address Type</Text>
      <View style={styles.addressTypeContainer}>
        {addressTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.addressTypeButton,
              formData.label === type && styles.selectedAddressType,
            ]}
            onPress={() => setFormData({ ...formData, label: type })}
          >
            <Ionicons
              name={
                type === "home"
                  ? "home"
                  : type === "work"
                  ? "business"
                  : "location"
              }
              size={20}
              color={formData.label === type ? "#FFF" : "#666"}
            />

            <Text
              style={[
                styles.addressTypeText,
                formData.label === type && styles.selectedAddressTypeText,
              ]}
            >
              {capitalize(type)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Full Name*</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Enter your full name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        style={[styles.input, errors.phone_number && styles.errorInput]}
        value={formData.phone_number}
        onChangeText={(text) =>
          setFormData({ ...formData, phone_number: text })
        }
        placeholder="Enter 10-digit phone number"
        keyboardType="phone-pad"
        maxLength={10}
      />
      {errors.phone_number && (
        <Text style={styles.errorText}>{errors.phone_number}</Text>
      )}

      <Text style={styles.label}>Street Address*</Text>
      <TextInput
        style={[styles.input, errors.street_address && styles.errorInput]}
        value={formData.street_address}
        onChangeText={(text) =>
          setFormData({ ...formData, street_address: text })
        }
        placeholder="Enter street address"
      />
      {errors.street_address && (
        <Text style={styles.errorText}>{errors.street_address}</Text>
      )}

      <Text style={styles.label}>Area*</Text>
      <TextInput
        style={[styles.input, errors.area && styles.errorInput]}
        value={formData.area}
        onChangeText={(text) => setFormData({ ...formData, area: text })}
        placeholder="Enter area"
      />
      {errors.area && <Text style={styles.errorText}>{errors.area}</Text>}

      <Text style={styles.label}>City*</Text>
      <TextInput
        style={[styles.input, errors.city && styles.errorInput]}
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
        placeholder="Enter city"
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      <Text style={styles.label}>PIN Code*</Text>
      <TextInput
        style={[styles.input, errors.zip_code && styles.errorInput]}
        value={formData.zip_code}
        onChangeText={(text) => setFormData({ ...formData, zip_code: text })}
        placeholder="Enter 6-digit PIN code"
        keyboardType="numeric"
        maxLength={6}
      />
      {errors.zip_code && (
        <Text style={styles.errorText}>{errors.zip_code}</Text>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Save Address</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addressTypeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  selectedAddressType: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  addressTypeText: {
    color: "#666",
  },
  selectedAddressTypeText: {
    color: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddressDetailsForm;
