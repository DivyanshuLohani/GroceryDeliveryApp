import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

type PromoCode = {
  id: string;
  code: string;
  description: string;
  discount: string;
  expiryDate: string;
  isApplied?: boolean;
};

const PromoCodePage = () => {
  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const promoCodes: PromoCode[] = [
    {
      id: "1",
      code: "WELCOME20",
      description: "Welcome discount for new users",
      discount: "20% off",
      expiryDate: "2024-12-31",
    },
    {
      id: "2",
      code: "SUMMER50",
      description: "Summer season special discount",
      discount: "50% off up to $30",
      expiryDate: "2024-08-31",
    },
    {
      id: "3",
      code: "FREESHIP",
      description: "Free shipping on all orders",
      discount: "Free Delivery",
      expiryDate: "2024-06-30",
    },
  ];

  const handleApplyCode = (code: string) => {
    if (appliedCode === code) {
      setAppliedCode(null);
    } else {
      setAppliedCode(code);
    }
  };

  const handleSubmitPromo = () => {
    if (promoInput.trim()) {
      // Here you would typically validate the promo code with your backend
      console.log("Submitting promo code:", promoInput);
      setPromoInput("");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Promo Codes</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="ticket-percent-outline"
            size={24}
            color="#666666"
          />
          <TextInput
            style={styles.input}
            value={promoInput}
            onChangeText={setPromoInput}
            placeholder="Enter promo code"
            autoCapitalize="characters"
            placeholderTextColor="#999999"
          />
          {promoInput.length > 0 && (
            <TouchableOpacity onPress={() => setPromoInput("")}>
              <Ionicons name="close-circle" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.applyButton,
            !promoInput && styles.applyButtonDisabled,
          ]}
          onPress={handleSubmitPromo}
          disabled={!promoInput}
        >
          <Text
            style={[
              styles.applyButtonText,
              !promoInput && styles.applyButtonTextDisabled,
            ]}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Available Promotions</Text>

      <ScrollView style={styles.promoList}>
        {promoCodes.map((promo) => (
          <View key={promo.id} style={styles.promoItem}>
            <View style={styles.promoHeader}>
              <View style={styles.promoIconContainer}>
                <FontAwesome name="ticket" size={20} color="#007AFF" />
              </View>
              <View style={styles.promoInfo}>
                <Text style={styles.promoCode}>{promo.code}</Text>
                <Text style={styles.promoDescription}>{promo.description}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.promoApplyButton,
                  appliedCode === promo.code && styles.promoRemoveButton,
                ]}
                onPress={() => handleApplyCode(promo.code)}
              >
                <Text
                  style={[
                    styles.promoApplyButtonText,
                    appliedCode === promo.code && styles.promoRemoveButtonText,
                  ]}
                >
                  {appliedCode === promo.code ? "Remove" : "Apply"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoDetails}>
              <View style={styles.promoDetailItem}>
                <MaterialCommunityIcons name="sale" size={16} color="#666666" />
                <Text style={styles.promoDetailText}>{promo.discount}</Text>
              </View>
              <View style={styles.promoDetailItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="#666666"
                />
                <Text style={styles.promoDetailText}>
                  Expires {formatDate(promo.expiryDate)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  inputSection: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  applyButtonTextDisabled: {
    color: "#999999",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    margin: 16,
  },
  promoList: {
    flex: 1,
    padding: 16,
  },
  promoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  promoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
  },
  promoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  promoCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  promoDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  promoApplyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  promoRemoveButton: {
    backgroundColor: "#ff3b30",
  },
  promoApplyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  promoRemoveButtonText: {
    color: "#ffffff",
  },
  promoDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promoDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666666",
  },
});

export default PromoCodePage;
