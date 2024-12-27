import React, { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "@/types/cart";
import { ASYNCSTORAGE_CART_KEY } from "@/constants/asycnStorage";
import { addItemToCart, getCart, removeItemFromCart } from "@/api";
import useAuth from "@/hooks/useAuth";

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType extends CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  increaseQuantity: (itemId: string) => Promise<void>;
  decreaseQuantity: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_STORAGE_KEY = ASYNCSTORAGE_CART_KEY;

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function calculateTotals(items: CartItem[]): {
  total: number;
  itemCount: number;
} {
  return items.reduce(
    (acc, item) => ({
      total: acc.total + Number(item.product.price) * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { total: 0, itemCount: 0 }
  );
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case "INCREASE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.product.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case "DECREASE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.product.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case "CLEAR_CART":
      return initialState;

    case "LOAD_CART": {
      const { total, itemCount } = calculateTotals(action.payload);
      return { items: action.payload, total, itemCount };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { auth } = useAuth();

  React.useEffect(() => {
    const loadCartFromServer = async () => {
      try {
        const data = await getCart();
        dispatch({ type: "LOAD_CART", payload: data });
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    if (!auth) return;
    loadCartFromServer();
  }, [auth]);

  async function saveCartToStorage(items: CartItem[]) {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }

  const addItem = async (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    await saveCartToStorage([...state.items, item]);
    await addItemToCart(item.product.id, item.quantity);
  };

  const removeItem = async (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    await removeItemFromCart(itemId);
  };

  const increaseQuantity = async (itemId: string) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: itemId });
    await addItemToCart(itemId, 1);
  };

  const decreaseQuantity = async (itemId: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: itemId });
    await addItemToCart(itemId, -1);
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
