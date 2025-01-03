import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TAddress } from "@/types";
import useAuth from "@/hooks/useAuth";
import { api } from "@/api";
import { ASYNCSTORAGE_ADDRESS_KEY } from "@/constants/asycnStorage";

interface AddressState {
  addresses: TAddress[];
  selectedAddress: TAddress | null;
}

type AddressAction =
  | { type: "LOAD_ADDRESSES"; payload: TAddress[] }
  | { type: "SET_SELECTED_ADDRESS"; payload: TAddress }
  | { type: "CLEAR_ADDRESSES" };

interface AddressContextType extends AddressState {
  selectedAddress: TAddress | null;
  setSelectedAddress: (address: TAddress) => Promise<void>;
  loadAddresses: () => Promise<void>;
  clearAddresses: () => void;
}

export const AddressContext = createContext<AddressContextType | undefined>(
  undefined
);

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null,
};

function addressReducer(
  state: AddressState,
  action: AddressAction
): AddressState {
  switch (action.type) {
    case "LOAD_ADDRESSES":
      return { addresses: action.payload, selectedAddress: action.payload[0] };
    case "CLEAR_ADDRESSES":
      return initialState;
    case "SET_SELECTED_ADDRESS":
      return {
        ...state,
        selectedAddress: action.payload,
      };
    default:
      return state;
  }
}

async function getAddresses() {
  const addresses = await api.get("/users/address/");
  return addresses.data.results;
}

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(addressReducer, initialState);
  const { auth } = useAuth();

  const loadAddresses = async () => {
    try {
      const data = await getAddresses(); // Fetch the list of addresses
      dispatch({ type: "LOAD_ADDRESSES", payload: data });
      if (data.length > 0) {
        await AsyncStorage.setItem(
          ASYNCSTORAGE_ADDRESS_KEY,
          JSON.stringify(data[0])
        );
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const setSelectedAddress = async (address: TAddress) => {
    try {
      await AsyncStorage.setItem(
        ASYNCSTORAGE_ADDRESS_KEY,
        JSON.stringify(address)
      );
      dispatch({ type: "SET_SELECTED_ADDRESS", payload: address });
    } catch (error) {
      console.error("Error setting selected address:", error);
    }
  };

  const clearAddresses = () => {
    dispatch({ type: "CLEAR_ADDRESSES" });
    AsyncStorage.removeItem(ASYNCSTORAGE_ADDRESS_KEY).catch((error) =>
      console.error("Error clearing selected address:", error)
    );
  };

  useEffect(() => {
    if (!auth) {
      clearAddresses();
      return;
    }
    loadAddresses();
  }, [auth]);

  return (
    <AddressContext.Provider
      value={{
        addresses: state.addresses,
        selectedAddress: state.selectedAddress,
        loadAddresses,
        setSelectedAddress,
        clearAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
