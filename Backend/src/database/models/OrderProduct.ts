import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

export type OrderProductCreationAttributes = {
  orderId: number;
  productId: number;
  quantity: number;
};

//may not need id for OrderProduct ajunct table
export type OrderProductAttributes = OrderProductCreationAttributes;

@Table({
  timestamps: false,
  tableName: "order_product",
  modelName: "OrderProduct",
})
export class OrderProduct extends Model<OrderProductCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  declare orderId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @Column({ type: DataType.INTEGER })
  declare quantity: number;
}
export default OrderProduct;
