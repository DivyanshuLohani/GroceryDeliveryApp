import a from "axios";

// TODO: Set this to true when building
const PRODUCTION = false;

export const BASE_URL = "http://192.168.29.63:8000";

export const api = a.create({
  baseURL: BASE_URL,
});

export async function addItemToCart(id: string, quantity: number) {
  const response = await api.post("/orders/cart/", {
    product: id,
    quantity,
  });
  return response.data;
}

export async function getCart() {
  const response = await api.get("/orders/cart/");
  return response.data.results;
}

export async function clearCart() {
  const response = await api.delete("/orders/cart/");
  return response.data;
}

export async function removeItemFromCart(id: string) {
  const response = await api.delete(`/orders/cart/${id}/`);
  return response.data;
}
