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
