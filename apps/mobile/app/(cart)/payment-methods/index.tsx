import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { usePaymentMethod } from "@/context/PaymentProvider";
import { renderIcon } from "@/components/Order/PaymentRender";
import { EPaymentMethod, TPaymentMethod } from "@/types/order";
import { TouchableOpacity } from "react-native-gesture-handler";

const PaymentMethodSelector = () => {
  const { paymentMethod: selectedMethod, setPaymentMethod: setSelectedMethod } =
    usePaymentMethod();
  const router = useRouter();

  // const paymentMethods: PaymentMethod[] = [
  //   {
  //     id: "cash",
  //     title: "Cash on Delivery",
  //     iconType: "cash",
  //     subtitle: "Pay when you receive",
  //   },
  //   {
  //     id: "card1",
  //     title: "**** **** **** 4242",
  //     iconType: "mastercard",
  //     subtitle: "Expires 12/25",
  //   },
  //   {
  //     id: "card2",
  //     title: "**** **** **** 5555",
  //     iconType: "visa",
  //     subtitle: "Expires 10/24",
  //   },
  //   {
  //     id: "wallet",
  //     title: "Digital Wallet",
  //     iconType: "wallet",
  //     subtitle: "Balance: $245.50",
  //   },
  //   {
  //     id: "bank",
  //     title: "Direct Bank Transfer",
  //     iconType: "bank",
  //     subtitle: "Standard Transfer",
  //   },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Payment Method" }} />

      <ScrollView style={styles.methodsContainer}>
        {/* Cash on delivery */}
        <View style={styles.methodSection}>
          <Text style={styles.methodSectionText}>Cash</Text>
          <TouchableOpacity
            style={[
              styles.methodItem,
              selectedMethod?.method === EPaymentMethod.CashOnDelivery &&
                styles.selectedMethod,
            ]}
            onPress={() =>
              setSelectedMethod({ method: EPaymentMethod.CashOnDelivery })
            }
          >
            <View style={styles.methodIcon}>
              {renderIcon(EPaymentMethod.CashOnDelivery)}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Cash on Delivery</Text>
            </View>
            <View style={styles.radioButton}>
              {selectedMethod?.method === EPaymentMethod.CashOnDelivery && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Cards */}
        {/*         
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              selectedMethod === method.id && styles.selectedMethod,
            ]}
            onPress={() => handlePaymentSelect(method.id)}
          >
            <View style={styles.methodIcon}>{renderIcon(method.iconType)}</View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              {method.subtitle && (
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              )}
            </View>
            <View style={styles.radioButton}>
              {selectedMethod === method.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))} */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedMethod && styles.confirmButtonDisabled,
          ]}
          onPress={() => router.back()}
          disabled={!selectedMethod}
        >
          <Text
            style={[
              styles.confirmButtonText,
              !selectedMethod && styles.confirmButtonTextDisabled,
            ]}
          >
            Confirm Payment Method
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  methodsContainer: {
    flex: 1,
    padding: 16,
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
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
  selectedMethod: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  methodSection: {
    marginBottom: 16,
  },
  methodSectionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  methodSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  footer: {
    position: "fixed",
    bottom: 100,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonTextDisabled: {
    color: "#999999",
  },
});

export default PaymentMethodSelector;
