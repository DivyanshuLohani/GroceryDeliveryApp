import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useMemo } from "react";
import { TOrder, TOrderItem } from "@/types/cart";
import { formatCurrency } from "@/utils/currency";
import { useRouter } from "expo-router";
import { getStatusColor } from "@/utils/color";

const OrderItem = ({ item }: { item: TOrderItem }) => {
  return (
    <View key={item.product.id} style={styles.itemRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.product.images[0], width: 60, height: 60 }}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
        <Text style={styles.itemName} numberOfLines={1}>
          {item.product.name}
        </Text>
      </View>
      <Text style={styles.itemQuantity}>x{item.quantity}</Text>
    </View>
  );
};

const OrderCard = ({ order }: { order: TOrder }) => {
  const router = useRouter();
  const dateFormater = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        // year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    []
  );
  return (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      onPress={() => router.push(`/orders/${order.id}`)}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>Order</Text>
          <Text style={styles.orderDate}>
            {dateFormater.format(new Date(order.created_at))}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(order.status)}15` },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(order.status) },
            ]}
          />
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {order.order_items.slice(0, 3).map((item) => (
          <OrderItem item={item} key={item.product.id} />
        ))}
        {order.order_items.length > 3 && (
          <Text style={{ color: "#007bff", fontWeight: "bold" }}>More</Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>
          {formatCurrency(order.total_amount)}
        </Text>
      </View>

      {/* {order.status === "Completed" && (
        <TouchableOpacity style={styles.reorderButton}>
          <Ionicons name="reload-outline" size={20} color="#4CAF50" />
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
    maxWidth: "80%",
    minWidth: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  totalText: {
    fontSize: 14,
    color: "#666",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});

export default OrderCard;
