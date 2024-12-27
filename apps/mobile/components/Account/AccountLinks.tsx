import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  href: string;
}

const menuItems: MenuItem[] = [
  //   { icon: "ticket-outline", title: "Promo Card", onPress: () => {} },
  //   { icon: "settings-outline", title: "Settings", href: "/settings" },
  { icon: "receipt-outline", title: "Orders", href: "/orders" },
  { icon: "person-outline", title: "My Details", href: "/profile" },
  { icon: "location-outline", title: "Delivery Address", href: "/address" },
  { icon: "card-outline", title: "Payment Methods", href: "/payment-methods" },
  {
    icon: "notifications-outline",
    title: "Notifecations",
    href: "/notifications",
  },
  { icon: "help-circle-outline", title: "Help", href: "/help" },
  { icon: "information-circle-outline", title: "About", href: "/about" },
  {
    icon: "document-outline",
    title: "Terms And Conditions",
    href: "/terms",
  },
];

const AccountLinks = () => {
  const router = useRouter();
  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            index === menuItems.length - 1 && styles.lastMenuItem,
          ]}
          onPress={() => router.push(item.href as any)}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon} size={24} color="#1A1A1A" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AccountLinks;
