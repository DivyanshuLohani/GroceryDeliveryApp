import { TProduct } from "./product";

export interface CartItem {
  product: TProduct;
  quantity: number;
}
