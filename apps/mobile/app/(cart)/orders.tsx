import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useListFetch from "@/hooks/useListFetch";
import { TOrder } from "@/types/cart";
import OrderCard from "@/components/Cart/OrderCard";
import Loading from "@/components/Loading";
import { Stack } from "expo-router";

export default function OrdersScreen() {
  const {
    data: orders,
    loading,
    error,
  } = useListFetch<TOrder>("/orders/order");
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Your Orders" }} />
      <View style={styles.container}>
        {/* Tab Selector */}

        <ScrollView
          style={styles.ordersContainer}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  ordersContainer: {
    flex: 1,
    padding: 16,
  },
});
