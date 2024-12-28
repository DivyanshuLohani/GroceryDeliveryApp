import { TOrder } from "@/types/cart";

export const getStatusColor = (status: TOrder["status"]) => {
  switch (status) {
    case "Delivered":
      return "#4CAF50";
    case "Pending":
      return "#FF9800";
    case "Cancelled":
      return "#F44336";
    default:
      return "#999";
  }
};
