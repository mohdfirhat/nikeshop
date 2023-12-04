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
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import User from "./User";
import Product from "./Product";
import OrderProduct from "./OrderProduct";

@Table({
  timestamps: false,
  tableName: "orders",
  modelName: "Order",
})
class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare user_id: string;

  @Column({ type: DataType.DECIMAL })
  declare amount: number;

  //Many-to-One Relationship - user
  @BelongsTo(() => User, "user_id") user: User;
  //Many-to-Many Relationship - product
  @BelongsToMany(() => Product, { through: () => OrderProduct })
  products: Product[];
}
export default Order;
