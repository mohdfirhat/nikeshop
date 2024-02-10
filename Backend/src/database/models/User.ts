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
  Unique,
  AutoIncrement,
} from "sequelize-typescript";
import Order from "./Order";
import { NonAttribute } from "sequelize";

export type UserCreationAttributes = {
  name: string;
  email: string;
  password: string;
};

export type UserAttributes = UserCreationAttributes & {
  id: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
};

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Unique
  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isAdmin: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  //One-to-Many Relationship
  @HasMany(() => Order) orders?: NonAttribute<Order[]>;
}

export const bulkCreateUsers = () =>
  User.bulkCreate([
    {
      email: "hello@gmail.com",
      name: "hello1",
      password: "world",
    },
    {
      email: "hello2@gmail.com",
      name: "hello2",
      password: "world2",
    },
  ]);
export default User;
