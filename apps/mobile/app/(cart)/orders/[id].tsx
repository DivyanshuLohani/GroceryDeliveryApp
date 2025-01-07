import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { TOrder } from "@/types/cart";
import { formatCurrency } from "@/utils/currency";
import { getStatusColor } from "@/utils/color";
import PaymentDetails from "@/components/Order/PaymentDetails";
import DeliveryAddress from "@/components/Order/DeliveryAddress";
import PriceDetails from "@/components/Order/PriceDetails";
import ErrorPage from "@/components/Error";
import LoadingScreen from "@/components/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: order,
    loading,
    error,
  } = useFetch<TOrder>(`/orders/order/${id}`);
  const formater = useMemo(
    () =>
      Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    []
  );

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorPage />;
  if (!order) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Stack.Screen options={{ headerShown: true, title: "Order Summary" }} />
        {/* Order Status Header */}
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Order Summary</Text>
            <Text style={styles.orderDate}>
              {formater.format(new Date(order.created_at))}
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
              style={[
                styles.statusText,
                { color: getStatusColor(order.status) },
              ]}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.order_items.map((item) => (
            <View key={item.product.id} style={styles.itemCard}>
              <Image
                source={{ uri: item.product.images[0] }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                {formatCurrency(Number(item.product.price) * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <PriceDetails
            subTotal={order.total_amount}
            total={order.total_amount}
            tax={order.total_amount}
            discount={order.discount ?? 100}
          />
        </View>

        {/* Delivery Info */}
        {order.address && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <DeliveryAddress address={order.address} />
          </View>
        )}

        {/* Payment Method */}
        {order.payment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <PaymentDetails payment={order.payment} />
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          {order.status === "Delivered" ? (
            <TouchableOpacity style={styles.reorderButton}>
              <Ionicons name="reload-outline" size={20} color="#4CAF50" />
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => router.push(`/orders/${id}/track`)}
            >
              <Ionicons name="location-outline" size={20} color="#4CAF50" />
              <Text style={styles.reorderText}>Track Order</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#1A1A1A" />
            <Text style={styles.supportText}>Need Help?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  orderInfo: {
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
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
    alignSelf: "flex-start",
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  actions: {
    padding: 16,
    gap: 12,
  },
  reorderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  reorderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  supportText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
