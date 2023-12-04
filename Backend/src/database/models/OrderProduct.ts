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
import Order from "./Order";

@Table({
  timestamps: false,
  tableName: "order_product",
  modelName: "OrderProduct",
})
class OrderProduct extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  declare order_id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  declare product_id: string;

  @Column({ type: DataType.STRING })
  declare size: string;

  @Column({ type: DataType.INTEGER })
  declare amount: number;
}
export default OrderProduct;
