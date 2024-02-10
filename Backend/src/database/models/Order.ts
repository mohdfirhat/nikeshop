import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
} from "sequelize-typescript";
import User from "./User";
import Product from "./Product";
import OrderProduct from "./OrderProduct";
import { NonAttribute } from "sequelize";

export type OrderCreationAttributes = {
  userId: number;
  totalCost: number;
  cartQuantity: number;
};

export type OrderAttributes = OrderCreationAttributes & {
  id: number;
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
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @Column({ type: DataType.DECIMAL })
  declare totalCost: number;

  @Column({ type: DataType.INTEGER })
  declare cartQuantity: number;

  //Many-to-One Relationship - user
  @BelongsTo(() => User) user?: NonAttribute<User>;
  //Many-to-Many Relationship - product
  @BelongsToMany(() => Product, {
    through: { model: () => OrderProduct, unique: false },
  })
  products?: NonAttribute<Product[]>;
}
export default Order;
