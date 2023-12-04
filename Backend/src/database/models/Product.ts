import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import Order from "./Order";
import OrderProduct from "./OrderProduct";

@Table({
  timestamps: true,
  tableName: "products",
  modelName: "Product",
})
class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare short_desc: string;

  @Column({ type: DataType.STRING(1000) })
  declare description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare sizes: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare colors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare categories: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare images: string[];

  @Column({ type: DataType.DECIMAL })
  declare rating: number;

  @Column({ type: DataType.DECIMAL })
  declare price: number;

  @Column({ type: DataType.INTEGER })
  declare quantity: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  //Many-to-Many Relationship - order
  @BelongsToMany(() => Order, { through: () => OrderProduct })
  orders: Order[];
}
export default Product;
