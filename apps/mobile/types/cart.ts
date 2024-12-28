import { TAddress } from ".";
import { TProduct } from "./product";

export interface CartItem {
  product: TProduct;
  quantity: number;
}

export type TOrderItem = {
  product: TProduct;
  quantity: number;
};

export type TOrder = {
  id: string;
  address: TAddress | null;
  created_at: string;
  total_amount: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  order_items: TOrderItem[];
  payment: any | null; // Define this properly if the payment structure is known
  discount: number;
};
