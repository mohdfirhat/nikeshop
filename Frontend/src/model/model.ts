export type categoryItemModel = {
  id: number;
  desc: string;
  url: string;
  cat: string;
};

export type ProductDescriptionModel = {
  id: number;
  name: string;
  shortDesc: string;
  description: string;
  categories: string[];
  urls: string[];
  rating: number;
  price: number;
};

export type ProductModel = {
  id: number;
  productDescriptionId: number;
  stock: number;
  size: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsWithDescriptionModel = ProductDescriptionModel & {
  products: ProductModel[];
};
export type ProductWithDescriptionModel = ProductDescriptionModel & {
  products: ProductModel;
};
