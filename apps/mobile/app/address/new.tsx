import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { MapMarker, Overlay } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const DeliveryLocationPicker: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const getAddressFromCoords = async (coords: any) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (address[0]) {
        setSelectedLocation({
          ...coords,
          ...address[0],
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onRegionChangeComplete = async (region: any) => {
    const coords = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    await getAddressFromCoords(coords);
  };

  const onMapReady = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      getAddressFromCoords(location.coords);
    }
  };

  useEffect(() => {
    onMapReady();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Select Location" }} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}
          onMapReady={onMapReady}
        ></MapView>

        {/* Static pin in the center of the map */}
        <View style={styles.markerFixed}>
          <Ionicons name="location-sharp" size={32} color="#007AFF" />
        </View>

        <View style={styles.bottomSheetContent}>
          <Text style={styles.deliveryText}>Delivering your order to</Text>
          {selectedLocation ? (
            <>
              <Text style={styles.addressText}>
                {selectedLocation.district}, {selectedLocation.city}
              </Text>
              <Text style={styles.subAddressText}>
                {selectedLocation.formattedAddress}
              </Text>
            </>
          ) : (
            <Text style={styles.selectLocationText}>
              Move the map to select a location
            </Text>
          )}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              if (selectedLocation) {
                router.replace(
                  `/address/new/details?lat=${selectedLocation.latitude}&long=${selectedLocation.longitude}&subAddress=${selectedLocation.district}&city=${selectedLocation.city}&state=${selectedLocation.region}&country=${selectedLocation.isoCountryCode}`
                );
              }
            }}
            disabled={!selectedLocation}
          >
            <Text style={styles.buttonText}>Add Address Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -16,
    marginTop: -32,
  },
  bottomSheetContent: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 100,
    zIndex: 1,
  },
  deliveryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subAddressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  selectLocationText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DeliveryLocationPicker;
