import { ProductModel } from "../model/model";

export const ProductData: ProductModel[] = [
  {
    id: 1,
    name: "Nike Dri-FIT Team (MLB Minnesota Twins)",
    shortDesc: "Men's Long-Sleeve T-Shirt",
    description: "description1",
    sizes: ["S", "M", "L"],
    colors: ["Dark Blue"],
    categories: ["men", "t-shirt"],
    urls: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0116e668-a77e-402d-b89f-04647db0f0ad/dri-fit-team-minnesota-twins-mens-long-sleeve-t-shirt-6Wdjql.png",
    ],
    rating: 3.5,
    price: 40,
    stock: 100,
  },
  {
    id: 3,
    name: "NFL Miami Dolphins (Mike Gesicki)",
    shortDesc: "Men's Game Football Jersey",
    description: "",
    sizes: ["S", "M", "L"],
    colors: ["Dark Blue"],
    categories: ["men", "t-shirt"],
    urls: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/113bb00a-97ba-4120-b2f8-d2e0ec4db7f8/miami-dolphins-mike-gesicki-mens-game-football-jersey-dspWwb.png",
    ],
    rating: 3.6,
    price: 130,
    stock: 100,
  },
];
