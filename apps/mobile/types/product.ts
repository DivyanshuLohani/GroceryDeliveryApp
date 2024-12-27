import { TCategory } from "./category";

export type TProduct = {
  id: string;
  name: string;
  category: TCategory;
  description: string;
  mrp: string;
  price: string;
  stock: number;
  is_available: boolean;
  images: string[];
};
