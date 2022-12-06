import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Account } from 'src/account/account.model';

interface ClientsCreationAttrs {
  name: string;
  document: string;
  birthDate: string;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, ClientsCreationAttrs> {
  @ApiProperty({ example: '7f965900-7487-11ed-8f9e-a7d4c5b81f2b' })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  })
  id: string;

  @ApiProperty({ example: 'Nikita' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 'document example' })
  @Column({
    type: DataType.TEXT,
  })
  document: string;

  @ApiProperty({ example: '2022-02-02 00:00:00.000 +0300' })
  @Column({
    type: DataType.DATE,
  })
  birthDate: string;

  @HasMany(() => Account)
  accounts: Account[];
}
