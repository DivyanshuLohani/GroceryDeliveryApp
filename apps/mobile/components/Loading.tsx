import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tips } from "@/constants/tips";

const icons: { name: any; color: string }[] = [
  { name: "pizza", color: "#FF6B6B" },
  { name: "ice-cream", color: "#FF9F9F" },
  { name: "cafe", color: "#8B4513" },
  { name: "restaurant", color: "#FFB347" },
  { name: "fast-food", color: "#FED049" },
  // { name: "fruit", color: "#77DD77" },
  { name: "water", color: "#87CEEB" },
];

const LoadingScreen = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(
    Math.floor(Math.random() * icons.length)
  );
  const randomTipIndex = useMemo(
    () => Math.floor(Math.random() * tips.length),
    []
  );

  const spinValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(1)).current;

  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const startFadeAnimation = () => {
    fadeValue.setValue(1);
    Animated.sequence([
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
      startSpinAnimation();
      startFadeAnimation();
    }, 2000);

    return () => {
      clearInterval(iconInterval);
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const combinedTransform = [{ rotate: spin }];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: combinedTransform, opacity: fadeValue },
          ]}
        >
          <Ionicons
            name={icons[currentIconIndex].name}
            size={48}
            color={icons[currentIconIndex].color}
          />
        </Animated.View>
        <Animated.View style={[styles.tipContainer]}>
          <Text style={styles.tipText}>{tips[randomTipIndex]}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 30,
  },
  tipContainer: {
    maxWidth: Dimensions.get("window").width * 0.8,
  },
  tipText: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default LoadingScreen;
