import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Animated, Image, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAddress } from "@/hooks/useAddress";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const SEARCH_MAX_TOP = 70;
const SEARCH_MIN_TOP = 10;

interface HeaderProps {
  scrollY: Animated.Value;
}

const AnimatedHeader: React.FC<HeaderProps> = ({ scrollY }) => {
  const router = useRouter();
  const { selectedAddress } = useAddress();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const searchBarTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [SEARCH_MAX_TOP, SEARCH_MIN_TOP],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[styles.headerContent, { opacity: headerOpacity }]}
        >
          <Image
            source={require("@/assets/images/logo.png")} // Add your logo
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => router.push("/address")}
          >
            <Ionicons name="location-outline" size={20} color="#666" />
            <View style={styles.addressTextContainer}>
              <Text style={styles.deliverTo}>Deliver to</Text>
              <Text style={styles.address} numberOfLines={1}>
                {selectedAddress?.label === "home"
                  ? "Home"
                  : selectedAddress?.label === "work"
                  ? "Work"
                  : "Other"}{" "}
                — {selectedAddress?.area}, {selectedAddress?.city}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.searchContainer, { top: searchBarTop }]}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push("/explore")}
          >
            <Ionicons name="search-outline" size={20} color="#666" />
            <Text style={styles.searchPlaceholder}>Search for items...</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: 10,
    // left: 0,
    // right: 0,
    zIndex: 1000,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  addressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  addressTextContainer: {
    width: "65%",
    marginHorizontal: 8,
  },
  deliverTo: {
    fontSize: 12,
    color: "#666",
  },
  address: {
    fontSize: 14,
    fontWeight: "500",
  },
  searchContainer: {
    position: "absolute",
    left: 16,
    right: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#666",
    fontSize: 16,
  },
});

export default AnimatedHeader;
