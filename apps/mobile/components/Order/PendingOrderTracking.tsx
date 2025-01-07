import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { TOrder } from "@/types/cart";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/currency";
import { getStatusColor } from "@/utils/color";
import { useRouter } from "expo-router";

const PendingOrderTracking = ({ order }: { order: TOrder }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => router.push(`/orders/${order.id}/track`)}
    >
      {/* Top left icon */}
      <View style={styles.topLeftIcon}>
        <MaterialCommunityIcons
          name="package-variant"
          size={24}
          color="#666666"
        />
      </View>

      {/* Order information */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.orderId}>Order #{order.id.slice(-6)}</Text>
          <Text style={styles.date}>{formatDate(order.created_at)}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.itemCount}>
            {order.order_items.length}{" "}
            {order.order_items.length === 1 ? "item" : "items"}
          </Text>
          <Text style={styles.amount}>
            {formatCurrency(order.total_amount)}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status}
          </Text>
        </View>
      </View>

      {/* Bottom right icon */}
      <View style={styles.bottomRightIcon}>
        <Feather name="chevron-right" size={24} color="#666666" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  topLeftIcon: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomRightIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    marginLeft: 32,
    marginRight: 32,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 14,
    color: "#666666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  statusContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    color: "#666666",
    textTransform: "capitalize",
  },
});

export default PendingOrderTracking;
