import { NonAttribute } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsToMany,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Order from "./Order";
import OrderProduct from "./OrderProduct";
import ProductDescription from "./ProductDescription";

export type ProductCreationAttributes = {
  productDescriptionId: number;
  stock: number;
  size: string;
  color: string;
};

export type ProductAttributes = ProductCreationAttributes & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  orders?: Order[];
};

@Table({
  timestamps: true,
  tableName: "products",
  modelName: "Product",
})
class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => ProductDescription)
  @Column({ type: DataType.INTEGER })
  declare productDescriptionId: number;

  @Column({ type: DataType.INTEGER })
  declare stock: number;

  @Column({ type: DataType.STRING })
  declare size: string;

  @Column({ type: DataType.STRING })
  declare color: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  //Many-to-Many Relationship - order
  @BelongsToMany(() => Order, {
    through: { model: () => OrderProduct },
  })
  orders?: NonAttribute<Order[]>;

  @BelongsTo(() => ProductDescription, "productDescriptionId")
  productDescription: ProductDescription;
}

export const bulkCreateProducts = () =>
  Product.bulkCreate([
    {
      productDescriptionId: 1,
      stock: 10,
      size: "S",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 1,
      stock: 20,
      size: "M",
      color: "Black",
    },
    {
      productDescriptionId: 1,
      stock: 30,
      size: "L",
      color: "Black",
    },
    {
      productDescriptionId: 1,
      stock: 10,
      size: "S",
      color: "Black",
    },
    {
      productDescriptionId: 1,
      stock: 20,
      size: "M",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 1,
      stock: 30,
      size: "L",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 2,
      stock: 15,
      size: "S",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 2,
      stock: 25,
      size: "M",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 2,
      stock: 35,
      size: "L",
      color: "Dark Blue",
    },
    {
      productDescriptionId: 3,
      stock: 15,
      size: "S",
      color: "white",
    },
    {
      productDescriptionId: 3,
      stock: 25,
      size: "M",
      color: "white",
    },
    {
      productDescriptionId: 3,
      stock: 35,
      size: "L",
      color: "white",
    },
    {
      productDescriptionId: 3,
      stock: 35,
      size: "XL",
      color: "white",
    },
    {
      productDescriptionId: 3,
      stock: 35,
      size: "2XL",
      color: "white",
    },
    {
      productDescriptionId: 4,
      stock: 15,
      size: "S",
      color: "black",
    },
    {
      productDescriptionId: 4,
      stock: 25,
      size: "M",
      color: "black",
    },
    {
      productDescriptionId: 4,
      stock: 35,
      size: "L",
      color: "black",
    },
    {
      productDescriptionId: 4,
      stock: 35,
      size: "XL",
      color: "black",
    },
    {
      productDescriptionId: 4,
      stock: 35,
      size: "2XL",
      color: "black",
    },
  ]);

export default Product;
