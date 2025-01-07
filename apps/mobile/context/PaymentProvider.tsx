import { TPaymentMethod } from "@/types/order";
import React, { createContext, useContext, useState } from "react";

interface PaymentMethodContextProps {
  paymentMethod: TPaymentMethod | null;
  setPaymentMethod: (method: TPaymentMethod) => void;
}

const PaymentMethodContext = createContext<
  PaymentMethodContextProps | undefined
>(undefined);

export const PaymentMethodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod | null>(
    null
  );

  return (
    <PaymentMethodContext.Provider value={{ paymentMethod, setPaymentMethod }}>
      {children}
    </PaymentMethodContext.Provider>
  );
};

export const usePaymentMethod = (): PaymentMethodContextProps => {
  const context = useContext(PaymentMethodContext);
  if (!context) {
    throw new Error(
      "usePaymentMethod must be used within a PaymentMethodProvider"
    );
  }
  return context;
};
