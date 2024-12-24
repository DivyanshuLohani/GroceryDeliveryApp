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
