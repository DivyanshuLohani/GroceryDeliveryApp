export type TCategory = {
  id: string;
  name: string;
  description: string;
  parent_category: string;
  subcategories: TCategory[];
  image: string;
  colors?: {
    backgroundColor: string;
    borderColor: string;
  };
};
