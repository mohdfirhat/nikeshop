import { NonAttribute } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  BelongsToMany,
} from "sequelize-typescript";
import Order from "./Order";
import OrderProduct from "./OrderProduct";

export type ProductCreationAttributes = {
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

export type ProductAttributes = ProductCreationAttributes & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
};

@Table({
  timestamps: true,
  tableName: "products",
  modelName: "Product",
})
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare shortDesc: string;

  @Column({ type: DataType.STRING(1000) })
  declare description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare sizes: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare colors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare categories: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare urls: string[];

  @Column({ type: DataType.DECIMAL })
  declare rating: number;

  @Column({ type: DataType.DECIMAL })
  declare price: number;

  @Column({ type: DataType.INTEGER })
  declare stock: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  //Many-to-Many Relationship - order
  @BelongsToMany(() => Order, { through: () => OrderProduct })
  orders?: NonAttribute<Order[]>;
}
export const bulkCreateProducts = () =>
  Product.bulkCreate([
    {
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
      stock: 20,
    },
    {
      name: "NFL Miami Dolphins (Mike Gesicki)",
      shortDesc: "Men's Game Football Jersey",
      description: "description2",
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
    {
      name: "Nike College (Oregon)",
      shortDesc: "Men's Max 90 T-Shirt",
      description: "description3",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["white"],
      categories: ["men", "t-shirt"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6aa5cc48-7a3f-483c-9aaf-4500c91f71e2/oregon-mens-max-90-t-shirt-S2Lq7n.png",
      ],
      rating: 3.5,
      price: 18.97,
      stock: 100,
    },
    {
      name: "Nike Therma Crucial Catch (NFL Miami Dolphins)",
      shortDesc: "Men's Pullover Hoodie",
      description: "description4",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["black"],
      categories: ["men", "jacket"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f0ebd9f7-c14c-495c-8933-c51520683c1c/therma-crucial-catch-miami-dolphins-mens-pullover-hoodie-n2VZrQ.png",
      ],
      rating: 4.1,
      price: 85.0,
      stock: 80,
    },
    {
      name: "Nike Dri-FIT Primetime Logo (MLB San Francisco Giants)",
      shortDesc: "Men's Shorts",
      description: "description5",
      sizes: ["S", "M", "L"],
      colors: ["black"],
      categories: ["men", "shoes"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2606c354-8040-4ca8-aacb-ec5629fd3baf/dri-fit-primetime-logo-san-francisco-giants-mens-shorts-z0DGWC.png",
      ],
      rating: 3.2,
      price: 45.0,
      stock: 50,
    },
  ]);
export default Product;
