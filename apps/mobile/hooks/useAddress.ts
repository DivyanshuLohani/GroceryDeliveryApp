import { AddressContext } from "@/context/AddressProvider";
import { useContext } from "react";

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within a AddressProvider");
  }
  return context;
};
