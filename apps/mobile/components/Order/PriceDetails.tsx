import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { formatCurrency } from "@/utils/currency";

const PriceDetails = ({
  subTotal,
  total,
  tax,
  discount,
}: {
  subTotal: number;
  total: number;
  tax: number;
  discount: number;
}) => {
  return (
    <>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Subtotal</Text>
        <Text style={styles.priceValue}>{formatCurrency(subTotal)}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Tax</Text>
        <Text style={styles.priceValue}>{formatCurrency(tax)}</Text>
      </View>
      {discount && (
        <View style={[styles.priceRow]}>
          <Text style={styles.priceLabel}>Discount</Text>
          <Text style={[styles.priceValue, { color: "#FF3B30" }]}>
            - {formatCurrency(total)}
          </Text>
        </View>
      )}
      <View style={[styles.priceRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
});

export default PriceDetails;
