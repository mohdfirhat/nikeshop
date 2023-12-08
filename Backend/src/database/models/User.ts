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
} from "sequelize-typescript";
import Order from "./Order";
import { NonAttribute } from "sequelize";

export type UserCreationAttributes = {
  email: string;
  password: string;
};

export type UserAttributes = UserCreationAttributes & {
  id: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  orders?: NonAttribute<Order[]>;
};

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model<UserAttributes, UserCreationAttributes> {
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
      password: "world",
    },
    {
      email: "hello2@gmail.com",
      password: "world2",
    },
  ]);
export default User;
