import {
  Table,
  Column,
  Model,
  IsEmail,
  PrimaryKey,
  DataType,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'customers' })
export class Customer extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    field: 'id',
  })
  public id: string;

  @IsEmail
  @Column({ type: DataType.STRING(100), allowNull: false, field: 'email' })
  public email: string;

  @Column({ type: DataType.STRING(100), allowNull: false, field: 'name' })
  public name: string;

  @Column({ type: DataType.STRING(100), allowNull: false, field: 'password' })
  public password: string;
}
