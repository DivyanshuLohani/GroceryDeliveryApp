import { TAddress } from ".";
import { TPaymentMethod } from "./order";
import { TProduct } from "./product";

export enum EOrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  OnTheWay = "On the Way",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

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
  status: EOrderStatus;
  order_items: TOrderItem[];
  payment: TPaymentMethod | null; // Define this properly if the payment structure is known
  discount: number;
};
