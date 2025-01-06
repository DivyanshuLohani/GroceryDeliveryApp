import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";
import { Stack, useLocalSearchParams } from "expo-router";
import LoadingScreen from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import { EOrderStatus } from "@/types/cart";
import { TOrderStatus } from "@/types/order";
import TrackingStep from "@/components/Order/TrackingStep";
import { ScrollView } from "react-native-gesture-handler";

const FETCH_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

const OrderTrackingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: order,
    loading,
    error,
    fetchData,
  } = useFetch<TOrderStatus>(`/delivery/${id}/status/`);

  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    if (order && order.assigned_partner && order.assigned_partner) {
      const { latitude, longitude } = order.address;
      setRegion({
        latitude: Number(latitude),
        longitude: Number(longitude),
        // Set delta to cover both the points in the view
        // Point a order.address has the latitude and longitude
        // Point b is the latilude and longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      if (order.longitude && order.latitude)
        setDriverLocation({
          latitude: Number(order.latitude),
          longitude: Number(order.longitude),
        });
    }
  }, [order]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion(region, 1000);
  }, [region]);

  // Animation value for heartbeat overlay
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const isFirstRender = useRef(true);
  const mapRef = useRef<MapView>(null);

  // Function to start pulse animation
  const startPulseAnimation = () => {
    pulseAnim.setValue(0); // Reset to initial value
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.3,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      fetchData(false);
      if (!isFirstRender.current) {
        startPulseAnimation();
      }
      isFirstRender.current = false;
    }, FETCH_INTERVAL);
    return () => clearInterval(timeInterval);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorComponent message="Something went wrong" />;
  }

  if (!order) {
    return <ErrorComponent message="Order not found" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: true, title: "Track your order" }}
      />
      <ScrollView bounces={false}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={false}
            ref={mapRef}
          >
            {/* Driver Marker */}
            <Marker coordinate={driverLocation}>
              <View style={styles.driverMarker}>
                <Ionicons name="car" size={20} color="#007AFF" />
              </View>
            </Marker>

            {/* Delivery Location Marker */}
            <Marker coordinate={region}>
              <View style={styles.destinationMarker}>
                <Ionicons name="location" size={20} color="#FF3B30" />
              </View>
            </Marker>
          </MapView>

          {/* Heartbeat Overlay */}
          <Animated.View
            style={[
              styles.heartbeatOverlay,
              {
                opacity: pulseAnim,
              },
            ]}
            pointerEvents={"none"}
          />

          {/* Driver Info Overlay */}
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={24} color="#007AFF" />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>
                {order.assigned_partner?.name}
              </Text>
              <Text style={styles.vehicleInfo}>
                {order.assigned_partner?.contact_no}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order {id}</Text>
            <Text style={styles.eta}></Text>
          </View>

          <View style={styles.trackingContainer}>
            <TrackingStep
              title="Order Confirmed"
              completed={order.status === EOrderStatus.Pending}
            />
            <TrackingStep
              title="Order Picked"
              completed={order.status === EOrderStatus.Processing}
            />
            <TrackingStep
              title="On the Way"
              completed={order.status === EOrderStatus.OnTheWay}
            />
            <TrackingStep
              title="Delivered"
              completed={order.status === EOrderStatus.Delivered}
              last
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
    marginTop: 0,
  },
  mapContainer: {
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#f8f8f8",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  heartbeatOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
  },
  driverInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  driverDetails: {
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1D",
  },
  vehicleInfo: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  detailsContainer: {
    padding: 20,
  },
  orderHeader: {
    marginBottom: 24,
  },
  orderId: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1D",
  },
  eta: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  trackingContainer: {
    marginTop: 10,
  },

  driverMarker: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  destinationMarker: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
});

export default OrderTrackingScreen;
