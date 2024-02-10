import { NonAttribute } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import Product from "./Product";

export type ProductDescriptionCreationAttributes = {
  name: string;
  shortDesc: string;
  description: string;
  categories: string[];
  urls: string[];
  rating: number;
  price: number;
};

export type ProductDescriptionAttributes =
  ProductDescriptionCreationAttributes & {
    id: number;
    products?: Product[];
  };

@Table({
  timestamps: false,
  tableName: "product_descriptions",
  modelName: "ProductDescription",
})
class ProductDescription extends Model<
  ProductDescriptionAttributes,
  ProductDescriptionCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare shortDesc: string;

  @Column({ type: DataType.STRING(1000) })
  declare description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare categories: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare urls: string[];

  @Column({
    type: DataType.DECIMAL,
    get() {
      return parseFloat(this.getDataValue("rating"));
    },
  })
  declare rating: number;

  @Column({
    type: DataType.DECIMAL,
    get() {
      return parseFloat(this.getDataValue("price"));
    },
  })
  declare price: number;

  //One-to-Many Relationship - order
  @HasMany(() => Product, {})
  products?: NonAttribute<Product[]>;
}

export const bulkCreateProductDescriptions = () =>
  ProductDescription.bulkCreate([
    {
      name: "Nike Dri-FIT Team (MLB Minnesota Twins)",
      shortDesc: "Men's Long-Sleeve T-Shirt",
      description: "description1",
      categories: ["men", "t-shirt"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0116e668-a77e-402d-b89f-04647db0f0ad/dri-fit-team-minnesota-twins-mens-long-sleeve-t-shirt-6Wdjql.png",
      ],
      rating: 3.5,
      price: 40,
    },
    {
      name: "NFL Miami Dolphins (Mike Gesicki)",
      shortDesc: "Men's Game Football Jersey",
      description: "description2",
      categories: ["women", "t-shirt"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/113bb00a-97ba-4120-b2f8-d2e0ec4db7f8/miami-dolphins-mike-gesicki-mens-game-football-jersey-dspWwb.png",
      ],
      rating: 3.6,
      price: 130,
    },
    {
      name: "Nike College (Oregon)",
      shortDesc: "Men's Max 90 T-Shirt",
      description: "description3",
      categories: ["men", "t-shirt"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6aa5cc48-7a3f-483c-9aaf-4500c91f71e2/oregon-mens-max-90-t-shirt-S2Lq7n.png",
      ],
      rating: 3.5,
      price: 18.97,
    },
    {
      name: "Nike Therma Crucial Catch (NFL Miami Dolphins)",
      shortDesc: "Men's Pullover Hoodie",
      description: "description4",
      categories: ["men", "jacket"],
      urls: [
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f0ebd9f7-c14c-495c-8933-c51520683c1c/therma-crucial-catch-miami-dolphins-mens-pullover-hoodie-n2VZrQ.png",
      ],
      rating: 4.1,
      price: 85.0,
    },
  ]);

export default ProductDescription;
