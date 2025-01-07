import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { EPaymentMethod, TPaymentMethod } from "@/types/order";
import { renderIcon } from "./PaymentRender";

interface PaymentDetailsProps {
  payment: TPaymentMethod;
}

const PaymentDetails = ({ payment }: PaymentDetailsProps) => {
  return (
    <View style={styles.paymentCard}>
      {renderIcon(payment.method)}
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentMethod}>{payment.method}</Text>
        {payment.method === EPaymentMethod.Card && (
          <Text style={styles.paymentDetail}>**** {payment.last4}</Text>
        )}
        {payment.method === EPaymentMethod.UPI && (
          <Text style={styles.paymentDetail}>{payment.upiId}</Text>
        )}
        {payment.method === EPaymentMethod.NetBanking && (
          <Text style={styles.paymentDetail}>{payment.bankName}</Text>
        )}
        {payment.method === EPaymentMethod.CashOnDelivery && (
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
