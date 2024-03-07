import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    field: 'id',
  })
  public id: string;

  @Column({ type: DataType.STRING(100), allowNull: false, field: 'name' })
  public name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'price' })
  public price: number;

  @Column({ type: DataType.STRING, allowNull: false, field: 'model' })
  public model: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'brand' })
  public brand: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'color' })
  public color: string;
}
