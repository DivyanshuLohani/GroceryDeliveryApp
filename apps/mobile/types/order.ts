import { TAddress } from ".";
import { EOrderStatus } from "./cart";

export interface AssignedPartner {
  name: string;
  contact_no: string;
  city: string;
}

export interface TOrderStatus {
  order_id: string;
  address: TAddress;
  assigned_partner: AssignedPartner | null;
  status: EOrderStatus;
  longitude: number;
  latitude: number;
}

export enum EPaymentMethod {
  Card = "Card",
  UPI = "UPI",
  NetBanking = "Net Banking",
  CashOnDelivery = "Cash on Delivery",
}

export type TPaymentMethod =
  | {
      method: EPaymentMethod.Card;
      last4: string; // Required for Card
      upiId?: never;
      bankName?: never;
    }
  | {
      method: EPaymentMethod.UPI;
      upiId: string; // Required for UPI
      last4?: never;
      bankName?: never;
    }
  | {
      method: EPaymentMethod.NetBanking;
      bankName: string; // Required for Net Banking
      last4?: never;
      upiId?: never;
    }
  | {
      method: EPaymentMethod.CashOnDelivery;
      last4?: never;
      upiId?: never;
      bankName?: never;
    };
