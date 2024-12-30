import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNCSTORAGE_USER_INFO } from "@/constants/asycnStorage";
import { TUser } from "@/types";
import Loading from "../Loading";

const ProfileView = () => {
  const [userInfo, setUserInfo] = useState<TUser | null>(null);
  useEffect(() => {
    const getKey = async () => {
      const data = await AsyncStorage.getItem(ASYNCSTORAGE_USER_INFO);
      setUserInfo(data ? JSON.parse(data) : null);
    };
    getKey();
  }, []);

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <View style={styles.profileHeader}>
      <Ionicons name="person-circle-outline" size={60} color="#1A1A1A" />
      <View style={styles.profileInfo}>
        <Text style={styles.name}>
          {userInfo.first_name} {userInfo.last_name}
        </Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{userInfo.email}</Text>
          <TouchableOpacity>
            <Ionicons name="pencil" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProfileView;
