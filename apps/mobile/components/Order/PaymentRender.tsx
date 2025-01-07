import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { TPaymentMethod } from "@/types/order";

export const renderIcon = (type: TPaymentMethod["method"]) => {
  switch (type) {
    case "Card":
      return <FontAwesome5 name="cc-visa" size={24} color="#1A1F71" />;
    case "Cash on Delivery":
      return <MaterialCommunityIcons name="cash" size={24} color="#2E7D32" />;
    case "UPI":
      return <MaterialCommunityIcons name="wallet" size={24} color="#1976D2" />;
    case "Net Banking":
      return <MaterialCommunityIcons name="bank" size={24} color="#424242" />;
    default:
      return null;
  }
};
