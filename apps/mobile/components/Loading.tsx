import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoadingScreen = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(1);

  const icons: {
    name: any;
    color: string;
  }[] = [
    { name: "reload-circle", color: "#3B82F6" },
    { name: "time", color: "#10B981" },
    { name: "sync-circle", color: "#6366F1" },
    { name: "hourglass", color: "#F59E0B" },
    { name: "compass", color: "#EC4899" },
    { name: "sparkles", color: "#8B5CF6" },
    { name: "brain", color: "#EF4444" },
  ];

  const tips = [
    "Did you know? Taking regular breaks improves productivity.",
    "Stay hydrated! Drink water regularly throughout the day.",
    "Deep breathing can help reduce stress and anxiety.",
    "Try the 20-20-20 rule: Look 20 feet away every 20 minutes for 20 seconds.",
    "Regular exercise boosts both physical and mental health.",
    "A good night's sleep is crucial for memory consolidation.",
    "Practice mindfulness to stay focused and reduce stress.",
    "Organize your workspace for better productivity.",
    "Take short walks to boost creativity and energy.",
    "Use the Pomodoro Technique for better time management.",
    "Stretch regularly to prevent muscle tension.",
    "Practice gratitude daily for better mental well-being.",
    "Learn something new every day to keep your mind sharp.",
    "Good posture helps prevent back pain and fatigue.",
    "Take time to disconnect from digital devices.",
    "Healthy snacks can help maintain energy levels.",
    "Listen to calming music to reduce stress.",
    "Set clear goals to stay motivated and focused.",
    "Remember to blink often when using screens.",
    "Stay connected with friends and family.",
    "Natural light can improve mood and productivity.",
    "Regular breaks help prevent decision fatigue.",
    "Practice active listening in conversations.",
    "Celebrate small wins throughout the day.",
    "Write down your thoughts to clear your mind.",
    "Try new perspectives when solving problems.",
    "Maintain a consistent daily routine.",
    "Small progress is still progress.",
    "Your best is always good enough.",
    "Remember to smile - it boosts your mood!",
  ];

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
    fadeValue.setValue(0);
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
      startSpinAnimation();
    }, 1000);

    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
      startFadeAnimation();
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}
        >
          <Ionicons
            name={icons[currentIconIndex].name}
            size={48}
            color={icons[currentIconIndex].color}
          />
        </Animated.View>
        <Animated.View style={[styles.tipContainer, { opacity: fadeValue }]}>
          <Text style={styles.tipText}>{tips[currentTipIndex]}</Text>
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
