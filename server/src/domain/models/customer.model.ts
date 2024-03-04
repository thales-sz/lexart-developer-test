import {
  Table,
  Column,
  Model,
  IsEmail,
  PrimaryKey,
  DataType,
  IsUUID,
} from 'sequelize-typescript';

@Table
export class Customer extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column(DataType.STRING(100))
  @IsEmail
  public email: string;

  @Column(DataType.STRING(100))
  public name: string;

  @Column(DataType.STRING(32))
  public password: string;
}
