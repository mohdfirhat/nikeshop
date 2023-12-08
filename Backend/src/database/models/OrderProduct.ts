import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Product from "./Product";
import Order from "./Order";

export type OrderProductCreationAttributes = {
  orderId: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

//may not need id for OrderProduct ajunct table
export type OrderProductAttributes = OrderProductCreationAttributes;

@Table({
  timestamps: false,
  tableName: "order_product",
  modelName: "OrderProduct",
})
class OrderProduct extends Model<OrderProductCreationAttributes> {
  // @PrimaryKey
  // @Default(DataType.UUIDV4)
  // @Column({ type: DataType.UUID })
  // declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  declare orderId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  declare productId: string;

  @Column({ type: DataType.STRING })
  declare size: string;

  @Column({ type: DataType.STRING })
  declare color: string;

  @Column({ type: DataType.INTEGER })
  declare quantity: number;
}
export default OrderProduct;
