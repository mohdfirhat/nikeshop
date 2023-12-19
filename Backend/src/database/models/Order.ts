import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Product from "./Product";
import OrderProduct from "./OrderProduct";
import { NonAttribute } from "sequelize";

export type OrderCreationAttributes = {
  userId: string;
  totalCost: number;
  cartQuantity: number;
};

export type OrderAttributes = OrderCreationAttributes & {
  id: string;
  user?: User;
  products?: Product[];
};

@Table({
  timestamps: false,
  tableName: "orders",
  modelName: "Order",
})
class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @Column({ type: DataType.DECIMAL })
  declare totalCost: number;

  @Column({ type: DataType.INTEGER })
  declare cartQuantity: number;

  //Many-to-One Relationship - user
  @BelongsTo(() => User) user?: NonAttribute<User>;
  //Many-to-Many Relationship - product
  @BelongsToMany(() => Product, { through: () => OrderProduct })
  products?: NonAttribute<Product[]>;
}
export default Order;
