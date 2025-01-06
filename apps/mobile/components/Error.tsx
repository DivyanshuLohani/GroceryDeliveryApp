import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ErrorComponentProps {
  message?: string;
  subMessage?: string;
  onRetry?: () => void;
  retryButtonText?: string;
  retryIcon?: string;
  mainIcon?: string;
}

const ErrorComponent = ({
  message = "We couldn't fetch your grocery items",
  subMessage = "Please check your internet connection and try again",
  retryButtonText = "Try again",
  retryIcon = "refresh",
  mainIcon = "basket-outline",
  onRetry,
}: ErrorComponentProps) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const moveAnim = new Animated.Value(50);
  const basketAnim = new Animated.Value(0);

  const router = useRouter();

  useEffect(() => {
    // Run main animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous basket animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(basketAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(basketAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: moveAnim }],
          },
        ]}
      >
        {/* Animated basket icon */}
        <Animated.View style={{ transform: [{ translateY: basketAnim }] }}>
          <Ionicons name={mainIcon as any} size={100} color="#007AFF" />
        </Animated.View>

        {/* Error icon */}
        <View style={styles.errorIconContainer}>
          <Ionicons name="alert-circle" size={32} color="#FF3B30" />
        </View>

        <Text style={styles.errorText}>{message}</Text>
        <Text style={styles.subText}>{subMessage}</Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => (onRetry ? onRetry() : router.reload())}
          activeOpacity={0.8}
        >
          <Ionicons name={retryIcon as any} size={20} color="#FFFFFF" />
          <Text style={styles.retryText}>{retryButtonText}</Text>
        </TouchableOpacity>

        {/* Decorative elements */}
        <Animated.View style={[styles.decorativeIcon, styles.icon1]}>
          <Ionicons
            name="nutrition-outline"
            size={24}
            color="rgba(0, 122, 255, 0.1)"
          />
        </Animated.View>
        <Animated.View style={[styles.decorativeIcon, styles.icon2]}>
          <Ionicons
            name="cart-outline"
            size={24}
            color="rgba(0, 122, 255, 0.1)"
          />
        </Animated.View>
        <Animated.View style={[styles.decorativeIcon, styles.icon3]}>
          <Ionicons
            name="pizza-outline"
            size={24}
            color="rgba(0, 122, 255, 0.1)"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    width: "100%",
    maxWidth: 400,
  },
  errorIconContainer: {
    position: "absolute",
    top: 90,
    right: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 4,
  },
  errorText: {
    marginTop: 30,
    fontSize: 18,
    color: "#1D1D1D",
    textAlign: "center",
    fontWeight: "600",
  },
  subText: {
    marginTop: 12,
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 30,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  decorativeIcon: {
    position: "absolute",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 122, 255, 0.05)",
  },
  icon1: {
    top: "10%",
    left: "10%",
  },
  icon2: {
    bottom: "20%",
    right: "15%",
  },
  icon3: {
    bottom: "10%",
    left: "20%",
  },
});

export default ErrorComponent;
