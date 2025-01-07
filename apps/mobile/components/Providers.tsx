import { AddressProvider } from "@/context/AddressProvider";
import AuthProvider from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import { PaymentMethodProvider } from "@/context/PaymentProvider";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider onAuthChanged={() => {}}>
      <CartProvider>
        <AddressProvider>
          <PaymentMethodProvider>{children}</PaymentMethodProvider>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default Providers;
