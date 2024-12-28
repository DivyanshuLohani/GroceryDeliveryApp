import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Payment =
  | {
      method: "Card";
      last4: string; // Required for Card
      upiId?: never;
      bankName?: never;
    }
  | {
      method: "UPI";
      upiId: string; // Required for UPI
      last4?: never;
      bankName?: never;
    }
  | {
      method: "Net Banking";
      bankName: string; // Required for Net Banking
      last4?: never;
      upiId?: never;
    }
  | {
      method: "Cash on Delivery";
      last4?: never;
      upiId?: never;
      bankName?: never;
    };

interface PaymentDetailsProps {
  payment: Payment;
}

const PaymentDetails = ({ payment }: PaymentDetailsProps) => {
  const getIcon = () => {
    switch (payment.method) {
      case "Card":
        return "card-outline";
      case "UPI":
        return "logo-usd";
      case "Net Banking":
        return "cash-outline";
      case "Cash on Delivery":
        return "wallet-outline";
      default:
        return "card-outline";
    }
  };

  return (
    <View style={styles.paymentCard}>
      <Ionicons name={getIcon()} size={24} color="#666" />
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentMethod}>{payment.method}</Text>
        {payment.method === "Card" && (
          <Text style={styles.paymentDetail}>**** {payment.last4}</Text>
        )}
        {payment.method === "UPI" && (
          <Text style={styles.paymentDetail}>{payment.upiId}</Text>
        )}
        {payment.method === "Net Banking" && (
          <Text style={styles.paymentDetail}>{payment.bankName}</Text>
        )}
        {payment.method === "Cash on Delivery" && (
          <Text style={styles.paymentDetail}>Cash on Delivery</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
  },
  paymentInfo: {
    marginLeft: 12,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  paymentDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default PaymentDetails;
