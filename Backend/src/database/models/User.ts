//TODO: refer to https://www.npmjs.com/package/sequelize-typescript#model-definition to create user model

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
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import Order from "./Order";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare is_admin: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  //One-to-Many Relationship
  @HasMany(() => Order) orders: Order[];
}
export default User;

/*example
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import Travel from "./Travel";

@Table({
  timestamps: true,
  tableName: "tours",
  modelName: "Tour",
})
class Tour extends Model<TourAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Travel)
  @Column({
    type: DataType.UUID,
  })
  declare travel_id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.DATEONLY,
  })
  declare starting_date: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  declare ending_date: Date;

  @Column({
    type: DataType.DECIMAL(10, 4),
  })
  declare price: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
*/
