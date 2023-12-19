export type categoryItemModel = {
  id: number;
  desc: string;
  url: string;
  cat: string;
};

export type ProductModel = {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  sizes: string[];
  colors: string[];
  categories: string[];
  urls: string[];
  rating: number;
  price: number;
  stock: number;
};
