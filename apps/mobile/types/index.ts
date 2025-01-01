import { z } from "zod";

export const AddressFormSchema = z.object({
  label: z.enum(["home", "work", "other"]),
  name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  street_address: z.string().min(1, "Street address is required"),
  area: z.string().min(1, "Area is required"),
  city: z.string().min(1, "City is required"),
  zip_code: z.string().regex(/^\d{4,10}$/, "Invalid zip code format"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  latitude: z.number(),
  longitude: z.number(),
});

export type AddressForm = z.infer<typeof AddressFormSchema>;

export type TUser = {
  id: string;
  last_login: string | null;
  first_name: string;
  last_name: string;
  date_joined: string; // ISO 8601 date string
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  email: string;
  user_type: "customer" | "admin" | "vendor"; // Example user types, expand as needed
  phone_number: string;
  auth_provider: "email" | "google" | "facebook" | "apple"; // Example auth providers, expand as needed
  is_active: boolean;
};

export type TAddress = {
  id: string;
  label: "home" | "work" | "other";
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
  name: string;
  phone_number: string;
  area: string;
  created_at: string;
  updated_at: string;
};
