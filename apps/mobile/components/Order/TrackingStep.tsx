import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

const TrackingStep = ({
  title,
  completed,
  last,
}: {
  title: string;
  completed: boolean;
  last?: boolean;
}) => (
  <View style={styles.trackingStep}>
    <View style={styles.stepIndicator}>
      <View style={[styles.stepDot, completed && styles.completedDot]}>
        {completed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </View>
      {!last && (
        <View style={[styles.stepLine, completed && styles.completedLine]} />
      )}
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  trackingStep: {
    flexDirection: "row",
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 12,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  completedDot: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: "#E5E5EA",
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: "#007AFF",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1D1D",
  },
  stepTime: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
});

export default TrackingStep;
