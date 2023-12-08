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
  orders?: NonAttribute<Order[]>;
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
      name: "productname1",
      shortDesc: "shortDesc1",
      description: "description1",
      sizes: ["S", "M", "L"],
      colors: ["white", "black"],
      categories: ["men", "shoes"],
      urls: ["url1", "url2", "url3"],
      rating: 3.5,
      price: 100.0,
      stock: 100,
    },
    {
      name: "productname2",
      shortDesc: "shortDesc2",
      description: "description2",
      sizes: ["S", "M", "L"],
      colors: ["white", "black"],
      categories: ["men", "shoes"],
      urls: ["url1", "url2", "url3"],
      rating: 3.5,
      price: 100.0,
      stock: 100,
    },
    {
      name: "productname3",
      shortDesc: "shortDesc3",
      description: "description3",
      sizes: ["S", "M", "L"],
      colors: ["white", "black"],
      categories: ["men", "shoes"],
      urls: ["url1", "url2", "url3"],
      rating: 3.5,
      price: 100.0,
      stock: 100,
    },
    {
      name: "productname4",
      shortDesc: "shortDesc4",
      description: "description4",
      sizes: ["S", "M", "L"],
      colors: ["white", "black"],
      categories: ["men", "shoes"],
      urls: ["url1", "url2", "url3"],
      rating: 3.5,
      price: 100.0,
      stock: 100,
    },
    {
      name: "productname5",
      shortDesc: "shortDesc5",
      description: "description5",
      sizes: ["S", "M", "L"],
      colors: ["white", "black"],
      categories: ["men", "shoes"],
      urls: ["url1", "url2", "url3"],
      rating: 3.5,
      price: 100.0,
      stock: 100,
    },
  ]);
export default Product;
