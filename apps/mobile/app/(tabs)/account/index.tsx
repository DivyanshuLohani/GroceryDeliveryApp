import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import ProfileView from "@/components/Account/ProfileView";
import { Colors } from "@/constants/Colors";
import AccountLinks from "@/components/Account/AccountLinks";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <ProfileView />

      {/* Menu Items */}
      <AccountLinks />
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={Colors.light.tint} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },

  menuContainer: {
    marginTop: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
