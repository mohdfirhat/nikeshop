export type categoryItemModel = {
  id: number;
  desc: string;
  url: string;
  cat: string;
};

export type ProductModel = {
  id: number;
  name: string;
  url: string;
  shortDesc: string;
  price: number;
  sizes: string[];
  colors: string[];
  cat: string[];
};
